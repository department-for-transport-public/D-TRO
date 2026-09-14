# About Conditions and Exclusions

Being able to specify conditions that apply to regulations is a key element of D-TRO modelling. Conditions let a regulation's properties describe, for example, width restrictions, access restrictions by vehicle type, or restrictions that only apply under certain weather conditions.

The D-TRO condition model is used to specify the conditions or constraints that determine when and to whom a regulation's effect applies. These include time period, vehicle type, weather conditions, driver characteristics, permits, and more.

## How a conditionSet relates to its regulation

**A `conditionSet` (or a single `condition`) attached to a `regulation` evaluates to `true` exactly for the population of road users to whom that regulation's stated effect (restriction, prohibition, permission, etc.) applies.** Where a `conditionSet` evaluates to `false` for the subject of the evaluation (e.g. typically a given type of road user), the regulation's effect does not apply to them.

This rule is fixed and does not vary by `regulationType`. A consuming application must not infer polarity from the description or common real-world knowledge of a regulation type (e.g. assuming that a `miscBusGate` regulation's condition set describes who is *let through* rather than who is *restricted*). The condition tree always describes the affected population, and any road user or vehicle that should be let through, exempted, or otherwise unaffected must be represented by negating the relevant condition(s) — see [Expressing an exception](#expressing-an-exception) below.

Consequently, when authoring a `conditionSet` for a regulation that is a prohibition or access restriction, the conditions should describe the vehicles/users that are restricted, not the vehicles/users that are allowed through. Where a scheme is more naturally described as "everyone except X, Y and Z", the negated form of X, Y and Z should be used, combined with the correct operator (see below) — the schema does not provide a separate mechanism for tagging a `conditionSet` as describing an "exemption" as opposed to a "restriction"; The same rule applies where a regulation grants a permission rather than imposing a restriction.

For example, where a permission applies only to buses, the conditionSet describes buses because the permission applies to them:

```json
{
  "conditionSet": {
    "operator": "and",
    "conditions": [
      {
        "vehicleCharacteristics": {
          "vehicleType": "bus"
        }
      }
    ]
  }
}
```

A bus satisfies the condition set and the permission applies. A non-bus does not satisfy the condition set and the permission does not apply.

## Changes in v4.0.0

Condition-modelling logic was changed substantially with the introduction of v4.0.0 of the data model.

The schema for the conditions model has been updated to require that all nested conditions, including nested `conditionSet` objects, appear inside the `conditions` array of their parent `conditionSet`. This does not remove the ability to nest `conditionSet`s; rather, it enforces a single, unambiguous structure for representing Boolean logic. The previous model allowed `conditionSet`, `conditions`, and `condition` to appear as sibling properties, which led to ambiguous and inconsistent evaluation.

As part of this change, `conditionSet` is now represented as an object rather than an array.

This revised structure ensures every logical operator has a clearly defined list of operands, improves validation, and gives a clean recursive representation of logical expressions.

[Figure 51](https://d-tro.dft.gov.uk/data-model-user-guide/release/v4.0.0/_images/condition-related-objects.png) provides the UML class representation of the condition-related objects.

In any instance where more than one condition is to be included in the definition of a provision, the `conditionSet` concept shall be used.

A `conditionSet` object may be specified using a sequence of conditions with logical operators specifying the relationship of the conditions. An example is as follows:

```xml
<conditionSet operator="OR">
   <conditionSet operator="AND">
      <timeValidity />
      <vehicleCharacteristics />
   </conditionSet>
   <conditionSet operator="AND">
      <timeValidity />
      <vehicleCharacteristics />
   </conditionSet>
</conditionSet>
```

Or, the same example in an alternate notation:

```
((timeValidity and vehicleCharacteristics) or (timeValidity and vehicleCharacteristics))
```

A condition stating `vehicleType` = `emergencyVehicle` with `negate` = `true` describes all vehicles *except* those of type `emergencyVehicle`. An unset `negate` value is equivalent to `false`, i.e. no negation is applied — the condition describes exactly the stated case.

[Figure 52](https://d-tro.dft.gov.uk/data-model-user-guide/release/v4.0.0/_images/condition-sets-and-conditions.png) shows an illustrative example of the use of `conditionSet` and `condition` objects, with sample code.

**Listing 1** shows an extract of the JSON coding of the same conditions shown in Figure 52.

```json
{
  "conditionSet": {
     "operator": "and",
     "conditions": [
        {
           "conditionSet": {
              "operator": "or",
              "conditions": [
                 {
                    "negate": false,
                    "vehicleCharacteristics": {
                       "maximumHeightCharacteristic": {
                          "vehicleHeight": 2.5
                       }
                    }
                 },
                 {
                    "negate": true,
                    "vehicleCharacteristics": {
                       "vehicleType": "bus"
                    }
                 },
                 {
                    "conditionSet": {
                       "operator": "and",
                       "conditions": [
                          {
                             "negate": false,
                             "vehicleCharacteristics": {
                                "vehicleType": "taxi"
                             }
                          },
                          {
                             "negate": false,
                             "vehicleCharacteristics": {
                                "vehicleUsage": "access"
                             }
                          }
                       ]
                    }
                 },
                 {
                    "timeValidity": {
                       "start": "2024-08-22T08:00:00",
                       "end": "2024-08-22T20:00:00"
                    }
                 }
              ]
           }
        }
     ]
  }
}
```

[Figure 53](https://d-tro.dft.gov.uk/data-model-user-guide/release/v4.0.0/_images/condition.png) provides the UML class representation of the `condition` object. The `condition` object has only the `negate` attribute, as explained above.

[Figure 54](https://d-tro.dft.gov.uk/data-model-user-guide/release/v4.0.0/_images/condition-set.png) provides the UML class representation of the `conditionSet` object. The `conditionSet` object has only the `operator` attribute. The `conditionSet` object has only the `operator` attribute. The `operator` attribute supports the permissible values `and`, `or` and `xor`.

The operators have the following meanings:

- `and` — evaluates to `true` only when all child conditions evaluate to `true`.
- `or` — evaluates to `true` when one or more child conditions evaluate to `true`.
- `xor` — evaluates to `true` when exactly one child condition evaluates to `true`.

Where `xor` is used, model authors should take care that the represented conditions are genuinely mutually exclusive, or that the intended meaning is explicitly "exactly one of these conditions applies".

## Expressing an exception

Because a `true` `conditionSet` always denotes the affected population (see [How a conditionSet relates to its regulation](#how-a-conditionset-relates-to-its-regulation)), an exception — "this restriction applies to everyone *except* road users of type A or type B" — must be built by negating the excluded conditions and combining them with the correct operator. This is a common source of error, so the correct and incorrect patterns are set out explicitly below.

**Correct pattern:** negate each excluded condition individually, and combine the negated conditions with `and`.

```json
{
  "conditionSet": {
    "operator": "and",
    "conditions": [
      {
        "negate": true,
        "vehicleCharacteristics": {
          "vehicleType": "pedalCycle"
        }
      },
      {
        "negate": true,
        "accessCondition": {
          "accessConditionType": ["loadingAndUnloading"]
        }
      }
    ]
  },
  "generalRegulation": {
    "regulationType": "miscPedestrianZone"
  }
}
```

This evaluates as `(NOT pedalCycle) AND (NOT loadingAndUnloading)`, which is logically equivalent (by De Morgan's law) to `NOT (pedalCycle OR loadingAndUnloading)` — i.e. "restricted unless the vehicle is a pedal cycle or is loading/unloading":

| Pedal cycle | Loading | `(NOT A) AND (NOT B)` | Restriction applies? |
|---|---|---|---|
| No | No | True | Yes |
| Yes | No | False | No |
| No | Yes | False | No |
| Yes | Yes | False | No |

**Incorrect pattern — do not use `or` to combine negated conditions when the intent is "except A or B":**

```json
{
  "conditionSet": {
    "operator": "or",
    "conditions": [
      {
        "negate": true,
        "vehicleCharacteristics": {
          "vehicleType": "pedalCycle"
        }
      },
      {
        "negate": true,
        "accessCondition": {
          "accessConditionType": ["loadingAndUnloading"]
        }
      }
    ]
  }
}
```

This evaluates as `(NOT A) OR (NOT B)`, which by De Morgan's law is equivalent to `NOT (A AND B)` — a materially different (and narrower) exception, restricting everyone except a vehicle that is *simultaneously* a pedal cycle *and* loading/unloading:

| Pedal cycle | Loading | `(NOT A) OR (NOT B)` | Restriction applies? |
|---|---|---|---|
| No | No | True | Yes |
| Yes | No | True | Yes |
| No | Yes | True | Yes |
| Yes | Yes | False | No |

Under this incorrect pattern, a cyclist who is not loading is still restricted, and a loading vehicle that is not a cycle is still restricted — which contradicts an intended "except cycles or loading" exemption. The rule of thumb: **to express "except A or B", negate A and B and join them with `and`; do not join negated conditions with `or`.**

The same principle applies however many conditions are being excluded, and regardless of the type of condition (vehicle type, access condition, permit, driver characteristic, etc.) — negate each excluded case individually and combine the negated set with `and`.

Note

When authoring or reviewing example D-TROs, a `conditionSet` combining negated conditions with `or` should be treated as a signal to check whether the intended meaning was in fact an exception for any of several cases, in which case `and` is very likely the operator that was intended.

## Other condition objects

[Figure 55](https://d-tro.dft.gov.uk/data-model-user-guide/release/v4.0.0/_images/road-condition.png) provides the UML class representation of the `roadCondition` object. The `roadCondition` object contains only the mandatory `roadType` attribute. Permissible values include, but are not limited to, `motorway`, `trunkRoad`, and `other`.

The `occupantCondition` object contains only the `disabledWithPermit` attribute, defined as a `boolean`. Figure 64 later in this section provides the UML class representation referred to above for the `occupantCondition` object.

[Figure 56](https://d-tro.dft.gov.uk/data-model-user-guide/release/v4.0.0/_images/number-of-occupants.png) provides the UML class representation of the `numberOfOccupants` object. It has two mandatory attributes:

- `operator` — the comparison operator to use. Permissible values are `equalTo`, `greaterThan`, `greaterThanOrEqualTo`, `lessThan`, and `lessThanOrEqualTo`.
- `value` — the integer boundary value.

Up to two instances of `numberOfOccupants` may be used to define both an upper and lower boundary. For example, the following permits vehicles with between 2 and 8 occupants inclusive:

```json
{
   "numberOfOccupants": [
      { "operator": "greaterThanOrEqualTo", "value": 2 },
      { "operator": "lessThanOrEqualTo", "value": 8 }
   ]
}
```

[Figure 57](https://d-tro.dft.gov.uk/data-model-user-guide/release/v4.0.0/_images/driver-condition.png) provides the UML class representation of the `driverCondition` object, which has one attribute: `driverCharacteristicsType`, indicating a specific type of driver characteristic. Permissible values include, but are not limited to, `disabledWithPermit`, `learnerDriver`, and `localResident`.

[Figure 58](https://d-tro.dft.gov.uk/data-model-user-guide/release/v4.0.0/_images/access-condition.png) provides the UML class representation of the `accessCondition` object, which has two attributes:

- `accessConditionType` — an access restriction type. Permissible values include, but are not limited to, `accessOnly`, `loadingAndUnloading`, and `throughTraffic`.
- `otherAccessRestriction` — a condition controlling access, for cases outside the enumerated list.

[Figure 59](https://d-tro.dft.gov.uk/data-model-user-guide/release/v4.0.0/_images/permit-condition.png) provides the UML class representation of the `permitCondition` object, which has the following attributes:

- `type` (mandatory) — the type of permit referenced. Permissible values include `doctor`, `business`, `resident`, `residentPlusBadgeHolders`, `residentNotBlueBadgeHolders`, and `other`. This list is under review and may change in future releases.
- `schemeIdentifier` (optional) — free text name for the referenced permit scheme.
- `permitIdentifier` (optional, repeatable) — an identifier for the referenced permit scheme (e.g. resident parking zone A).
- `whereToApplyForPermit` (optional) — a URL for the competent authority where a permit application can be made.
- `whereToCallForPermit` (optional) — a contact telephone number for the competent authority.
- `locationRelatedPermit` (optional, boolean) — whether the referenced permit relates to a specified geography.
- `maxDurationOfPermit` (optional) — the maximum validity duration of a permit, in minutes.
- `maximumAccessDuration` (optional) — the maximum duration permitted under use of this permit, in minutes.
- `minimumTimeToNextEntry` (optional) — the minimum duration between last use of the permit and the next permitted use ("no return time"), in minutes.

[Figure 60](https://d-tro.dft.gov.uk/data-model-user-guide/release/v4.0.0/_images/authority.png) provides the UML class representation of the `authority` object, linked to `permitCondition`. It has one attribute, `name`, indicating the governing authority that applied the relevant permit condition.

[Figure 61](https://d-tro.dft.gov.uk/data-model-user-guide/release/v4.0.0/_images/permitSubjectToFee.png) provides the UML class representation of the `permitSubjectToFee` object, linked to `permitCondition`. It has these optional attributes:

- `amountDue` — the monetary amount relating to use or purchase of the permit, in pounds sterling with two decimal points (e.g. `8.50` for £8.50).
- `paymentInformation` — a URL for further information on the permit and related payment.

[Figure 62](https://d-tro.dft.gov.uk/data-model-user-guide/release/v4.0.0/_images/nonVehicularRoadUserCondition.png) provides the UML class representation of the `nonVehicularRoadUserCondition` object, which has one attribute, `nonVehicularRoadUser`, indicating restrictions or permissions relating to non-vehicular road users. Permissible values include, but are not limited to, `pedestrians` and `herdedAnimals`.

[Figure 63](https://d-tro.dft.gov.uk/data-model-user-guide/release/v4.0.0/_images/other-condition-object.png) provides the UML class representation of the `otherCondition` object, used for an exceptional condition not covered elsewhere. Its `otherConditionDescription` attribute is optional and holds a free-text description.

[Figure 64](https://d-tro.dft.gov.uk/data-model-user-guide/release/v4.0.0/_images/occupant-condition.png) provides the UML class representation of the `occupantCondition` object.

---


