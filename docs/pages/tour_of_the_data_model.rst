.. _a-tour-of-the-data-model:

A Tour of the Data Model
========================

This section provides a tour of the main features of the Data Model. The Data Model can be viewed at https://department-for-transport-public.github.io/D-TRO/Data_Model%20v3.4.0.9/index.htm.

:numref:`fig3` shows a summarised simplified view of the main structures of the Data Model. These structures often contain more detailed sub-models, which are detailed later in this section.

One way to think of the organisation of the information is that each Digital TRO record (D-TRO record) contains the information contained in one TRO. Each D-TRO record needs to contain information on the 'what', 'where', 'when', and 'who' concepts. The 'who' concept is covered by what conditions apply, and what exemptions or exclusions exist. For TROs that incur a form of payment or charging, the 'how much' concept can also be expressed.

As denoted in :numref:`fig3`, these concepts are held within different structures.

.. _fig3:

.. figure:: /_static/images/fig3.png
   :alt: Summarised view of the Data Model
   :width: 80%
   :align: center

   Summarised view of the Data Model

Each of these structures are explained in turn.

The tour addresses parts of the Data Model as follows:

* About the TRO and its Provisions
* Defining Regulations (what?)
* Specifying Locations for TROs (where?)
* Times relating to Condition (when?)
* About Conditions and Exclusions - including Vehicle Characteristics (who and what?)
* About Tariff rates (how much?)

.. _section3.1:

About the TRO and its Provisions
********************************

:numref:`fig4` shows some of the top-level concepts of the model, which address details of the TRO as a whole and the provisions it contains.

.. _fig4:

.. figure:: /_static/images/fig4.png
   :alt: Object view of high-level TRO concepts
   :width: 80%
   :align: center

   Object view of high-level TRO concepts

Each TRO will be characterised by one D-TRO record. In other words, all the informational detail of one TRO should be contained in one D-TRO record.

Note: There is a set of metadata attributes that contain information on when the D-TRO record was published by the TRA or their software service provider, and the identity of the publishing entity. These metadata elements form part of the exchange mechanism itself and sit beyond the contents of the Data Model, forming part of the schema used for exchange. Details of these metadata attributes are provided in the Data Specification's Interface Control Documents.

The source object contains basic information concerning which TRA which created this TRO, the TRA which is the current owner of the TRO, the TRAs that are affected by the TRO. The formal published name of the TRO is also supported.

Additionally, source permits linking to any other digitised TRO that is referenced within this TRO. The cross reference is the unique D-TRO record identifier ID, not a textual name of a TRO.

In each D-TRO record, it is possible to define one or many source objects, with each source object being related to one section or clause in the TRO.

:numref:`fig5` provides the UML class representation of the ``source`` object.

.. _fig5:

.. figure:: /_static/images/fig5.png
   :alt: UML model representation of the source object
   :width: 80%
   :align: center

   UML model representation of the ``source`` object

The ``source`` object defines several mandatory attributes.

* The ``section`` attribute indicates the clause, schedule, or article defined by the TRA where the related provisions can be located. The data type is a (free text) string. This attribute is mandatory and must be provided exactly once.

* The ``actionType`` attribute indicates the action type to be carried out by the source, with a ``reference`` ID provided to link to the current source on which the action is being executed. The data type is ActionType (enumeration). Possible values are shown in Figure 6. This attribute is mandatory and must be provided exactly once.

* The ``reference`` attribute is a unique identifier for each instance of a Source by originating TRA. The precise format of the reference is not prescribed and is left to the discretion of the data supplier. It is, however, mandatory and shall be unique for the originating TRA. The data type is a (free text) String. This attribute is required and must be provided exactly once.

* The ``comingIntoForceDate`` attribute specifies the date on which the TRO comes into legal effect. The data type is a date. This attribute is conditional and must be provided exactly once for Made Orders. For more details, please see section :ref:`user-and-policy-driven-needs`.

* The ``currentTraOwner`` attribute identifies the current Traffic Regulation Authority responsible for maintaining this D-TRO. The value should correspond to a SWA-like authority code. The data type is an integer. This attribute is required and must be provided exactly once.

* The ``madeDate`` attribute indicates the date that the TRO was made, if applicable. The data type is a date. This attribute is conditional and must be provided exactly once for Made Orders. For more details, please see section :ref:`user-and-policy-driven-needs`.

* The ``statementDescription`` attribute provides a description of the overall nature of the prohibition, regulation, or restriction imposed by the TRO. The data type is a (free text) String. This attribute is conditional and must be provided at least once for Made Orders and may appear multiple times if needed. For more details, please see section :ref:`user-and-policy-driven-needs`.

* The ``traAffected`` attribute identifies the Traffic Regulation Authorities whose roads are affected by this D-TRO. The value should correspond to one or more SWA-like codes. The data type is an integer. At least one entry is required. Note: this must include the creating TRA.

* The ``traCreator`` attribute identifies the Highway Regulation Authority that created the D-TRO. The value should be a SWA-like code. The data type is an integer. This attribute is mandatory and must be provided exactly once.

* The ``troName`` attribute is the cited name of the Traffic Regulation Order (TRO) as defined by the Traffic Regulation Authority (TRA). The data type is a (free text) String. This attribute is mandatory and must be provided exactly once. This should be the full legal name of the order.

The SWA-like codes will be defined is a manner similar to the SWA codes used for street works. These attributes allow the tracing of the original creator and current responsible TRA owner and also those TRAs affected - this supports where boundary changes, authority name changes, etc. It will be quite common for all three attributes to identify the same TRA where no significant changes have occurred, and the TRO content relates only to the originating TRA's road network.

Note the SWA-like codes follow the SWA codes published for Street Works, see Geoplace SWA codes. In D-TRO, leading zeros are removed.

.. _fig6:

.. figure:: /_static/images/fig6.png
   :alt: Enumeration values for actionType
   :width: 80%
   :align: center

   Enumeration values for actionType

The ``actionType`` attribute specifies the type of action being taken with respect to a specific version of a D-TRO. It is used to indicate how the current version relates to any earlier version(s) of the same Traffic Regulation Order. The data type is a string constrained to a defined set of controlled vocabulary values. This attribute is mandatory and must be provided exactly once.

Permitted values include:

* ``new`` - Indicates that the supplied D-TRO version is entirely new and not an amendment of any earlier version.
* ``fullAmendment`` - Indicates that the supplied version fully replaces and amends an earlier version of the D-TRO.
* ``partialAmendment`` - Indicates that the supplied version partially amends an earlier version of the D-TRO.
* ``fullRevoke`` - Indicates that the D-TRO is fully revoked in its entirety.
* ``partialRevoke`` - Indicates that the D-TRO is partially revoked, affecting only certain elements of the earlier version.
* ``noChange`` - Indicates that the supplied version does not introduce any changes from the previous D-TRO version.
* ``errorFix`` - Indicates that the current version corrects one or more errors present in an earlier version.
* ``amendment`` - A general indicator that the current version introduces amendments to a prior version, where the specific nature of amendment (full or partial) is not further detailed.

This classification allows systems and users to track the evolution of legal traffic regulations and their current applicability in a structured and machine-readable way.

We then move on to the ``provision`` object. Provisions are an important concept - each instance of ``provision`` represents specifically one type of regulation, subject to one set of homogeneous conditions (conditions, exemptions, and times of applicability, and, if applicable, tariff rates), that are relevant to one or several regulatedPlace(s).

.. admonition:: Example
   :class: example

   A Traffic Regulation Authority defines in a TRO regulation indicating both a changed speed limit, introduction of a new bus lane and kerbside parking and waiting regulations in the same street location. These would be, at least, three distinct provisions.

Within each TRO, multiple sources may be defined; with each source object being related to one section or clause in the TRO.

Related to each source object, multiple provision objects may be defined. Each instance of **provision** shall be related to one instance of regulation.

The relationship between the objects provision, regulatedPlace and regulation is shown in :numref:`fig7`.

.. _fig7:

.. figure:: /_static/images/fig7.png
   :alt: UML representation of relationship of the provision, regulatedPlace and regulation objects
   :width: 80%
   :align: center

   UML representation of relationship of the ``provision``, ``regulatedPlace`` and ``regulation`` objects

By way of illustration, consider one TRO that contains two provisions. The first provision is, say, a kerbside parking place regulation, regulated to be applicable 24 hours, 7 days per week, relevant to locations A, B and C. The second provision is, say, a kerbside loading place regulation, regulated to be useable between 06:00 am and 08:00 on weekdays, limited to commercial vehicles, relevant to locations D and F.

:numref:`fig8` provides the UML class representation of the ``provision`` object.

.. _fig8:

.. figure:: /_static/images/fig8.png
   :alt: UML model representation of the provision object
   :width: 80%
   :align: center

   UML model representation of the ``provision`` object

The ``provision`` object defines several mandatory attributes.

* The ``actionType`` attribute indicates the action to be carried out by the provision, with a ``reference`` ID provided to link to the current provision the action is being carried out on. See section 3.2. The data type is ``actionType`` (enumeration). This attribute is mandatory and must be provided exactly once.

* The ``comingIntoForceDate`` attribute specifies the date on which the provision comes into legal effect. The data type is a string representing a datetime. This attribute is conditional and may be provided exactly once for Made Orders. For more details, please see section :ref:`user-and-policy-driven-needs`.

* The ``expectedOccupancyDuration`` attribute specifies the expected duration (in integer days) of the provision's occupancy. The data type is duration. This attribute is optional but recommended especially for temporary, or special event orders.

* The ``orderReportingPoint`` attribute indicates at which of the recognised reporting points this provision instance rests. Reporting points are described in more detail in section :ref:`user-and-policy-driven-needs`. The data type is OrderReportingPointType (enumeration). This attribute is mandatory and must be provided exactly once.

* The ``provisionDescription`` attribute provides a free text description of the referenced provision. The data type is a string (free text). This attribute is mandatory and must be provided exactly once.

* The ``reference`` attribute is a unique identifier for each instance of a provision by the originating TRA. The precise format of the reference is not prescribed and is left to the discretion of the data supplier. It is, however, mandatory and shall be unique for the originating TRA. The data type is a string (free text). This attribute is required and must be provided exactly once.

The ``provision`` class may also be extended by either an ``experimentalVariation`` object or an ``experimentalCessation`` object.

The ``experimentalVariation`` object can only be applied to ``experimentalAmendment`` orderReportingPoint type, where an experimental order is subject to amendment.

The ``experimentalCessation`` object can only be applied to ``experimentalRevocation.orderReportingPoint`` type, where an experimental order is revoked.

.. _fig9:

.. figure:: /_static/images/fig9.png
   :alt: UML model representation of the extension of the provision object
   :width: 80%
   :align: center

   UML model representation of the extension of the provision object

This model supports both permanent and time-bound experimental regulations, ensuring flexibility in managing regulatory states and their lifecycle within a traffic order.

.. _fig10:

.. figure:: /_static/images/fig10.png
   :alt: UML model representation of the experimentalVariation object
   :width: 80%
   :align: center

   UML model representation of the experimentalVariation object

The ``experimentalVariation`` defines two mandatory attributes.

* The ``effectOfChange`` attribute provides a free-text description of the regulatory effect introduced or modified by the experimental variation. This may include details such as changes to restrictions, permissions, or the introduction of new conditions.

* The ``expectedDuration`` attribute indicates the expected duration of the experimental variation, expressed as integer days. This defines the planned period over which the variation will be active before reassessment or reversion.


This object supports the structured representation of temporary modifications within a D-TRO and allows for clear communication of their intended scope and timeline.

.. _fig11:

.. figure:: /_static/images/fig11.png
   :alt: UML model representation of the experimentalCessation object
   :width: 80%
   :align: center

   UML model representation of the experimentalCessation object

The ``experimentalCessation`` object used to define the characteristics of a cessation applied to an experimental Traffic Regulation Order. This object enables the structured recording of the end of an experimental regulatory provision, including both the cessation date and its rationale.

It is associated with a provision that was enacted under experimental powers and has since been formally ceased, either upon conclusion of its intended trial period or for other operational or legal reasons.

* The ``actualDateOfCessation`` attribute specifies the actual calendar date on which the Experimental Order was ceased. This marks the formal end of the legal effect of the provision under experimental authority.

* The ``natureOfCessation`` attribute provides a free-text explanation of the reason of cessation of Experimental Order. This may include administrative withdrawal, outcome-based termination, policy changes or legal review outcomes.

The ``experimentalCessation`` object allows for clear documentation of the conclusion of temporary or trial-based traffic regulations, supporting auditability and historical tracking within the D-TRO framework.

Defining Regulations
********************

:numref:`fig12` shows some of the objects concerned with the definition of a regulation in the Model.

.. _fig12:

.. figure:: /_static/images/fig12.png
   :alt: Object view for regulation
   :width: 80%
   :align: center

   Object view for regulation

Each instance of ``provision`` shall be related to one instance of regulation.

Each ``regulation`` object defines one and only one form of regulation.

Regulations fall into one of four categories:

* ``speedLimitValueBased`` - which are speed limit regulations based upon a declared speed limit. As the default speed limit for well-lit streets may not be 30 mph, it is necessary to define the value alongside the speedLimitValueType as well as speedLimitNatureType enums.

* ``speedLimitProfileBased`` - which are based on speed limit regulations. For example, one profile is 'nationalSpeedLimitDualCarriageway', others are 'nationalSpeedLimitSingleCarriageway' and 'nationalSpeedLimitMotorway'.

* ``generalRegulation`` - characterising a wider range of regulations - see later for further details.

* ``offListRegulation`` - which characterises an extension mechanism for a TRA to declare a form of regulation that is not otherwise covered by the regulations specified in the first two categories.

.. note::
    In earlier data model versions, the various regulation sub-types (e.g. generalRegulation, offListRegulation, etc.) were specialisations of the abstract regulation object. To improve consistency and reduce complexity, in v3.3.0 and higher, the object regulation is concrete (instantiable) and each sub-type is associated with the regulation object.

    Each instance of regulation **shall be related to one and one only sub-type**.

:numref:`fig13` provides the UML class representation of the ``regulation`` object.

.. _fig13:

.. figure:: /_static/images/fig13.png
   :alt: UML model representation of the regulation object
   :width: 80%
   :align: center

   UML model representation of the ``regulation`` object

The ``regulation`` object defines two mandatory attributes.

* The ``isDynamic`` attribute indicates whether the regulation identified is dynamic in nature (i.e., the regulation is triggered by some condition - for example, changeable speed limits, access regulations, or triggered by environment conditions). The value ``true`` indicates the regulation is dynamic in nature; ``false`` indicates the regulation is static.

* The ``timeZone`` attribute enables the time zone applicable to the regulation to be defined. This is important in supporting the management of the definition of clearly specified times that work appropriately in local time zones. The time zone is specified IANA time zone (see http://www.iana.org/time-zones). For regulations in the UK will be 'Europe/London'.

:numref:`fig14` provides the UML class representation of the ``generalRegulation`` object.

.. _fig14:

.. figure:: /_static/images/fig14.png
   :alt: UML model representation of the generalRegulation object
   :width: 80%
   :align: center

   UML model representation of the ``generalRegulation`` object

The ``generalRegulation`` object has one mandatory attribute.

* The ``regulationType`` attribute holds an indication of the type of regulation. The potential list of regulation types is extensive.

The list of ``regulationType`` given in this release of the Data Model is as follows:

.. raw:: html

   <div class="table">

.. list-table::
   :widths: 100
   :header-rows: 0

   * - ``bannedMovementNoEntry``
   * - ``bannedMovementNoLeftTurn``
   * - ``bannedMovementNoRightTurn``
   * - ``bannedMovementNoUTurn``
   * - ``dimensionMaximumHeightStructural``
   * - ``dimensionMaximumHeightWithTRO``
   * - ``dimensionMaximumLength``
   * - ``dimensionMaximumWeightEnvironmental``
   * - ``dimensionMaximumWeightStructural``
   * - ``dimensionMaximumWidth``
   * - ``kerbsideControlledParkingZone``
   * - ``kerbsideDisabledBadgeHoldersOnly``
   * - ``kerbsideDoubleRedLines``
   * - ``kerbsideFootwayParking``
   * - ``kerbsideFootwayParkingProhibited``
   * - ``kerbsideLimitedWaiting``
   * - ``kerbsideLoadingBay``
   * - ``kerbsideLoadingBayPassengerSetDownPermitted``
   * - ``kerbsideLoadingBayPassengerSetDownProhibited``
   * - ``kerbsideLoadingPlace``
   * - ``kerbsideLoadingPlacePassengerSetDownPermitted``
   * - ``kerbsideLoadingPlacePassengerSetDownProhibited``
   * - ``kerbsideMotorcycleParkingPlace``
   * - ``kerbsideNoLoading``
   * - ``kerbsideNoLoadingPassengerSetDownPermitted``
   * - ``kerbsideNoLoadingPassengerSetDownProhibited``
   * - ``kerbsideNoStopping``
   * - ``kerbsideNoWaiting``
   * - ``kerbsideOtherYellowZigZagMandatory``
   * - ``kerbsideParkingPlace``
   * - ``kerbsidePaymentParkingPlace``
   * - ``kerbsidePermitParkingArea``
   * - ``kerbsidePermitParkingPlace``
   * - ``kerbsideRedRouteClearway``
   * - ``kerbsideRestrictedParkingZone``
   * - ``kerbsideRuralClearway``
   * - ``kerbsideSchoolKeepClearYellowZigZagMandatory``
   * - ``kerbsideSingleRedLines``
   * - ``kerbsideTaxiRank``
   * - ``kerbsideUrbanClearway``
   * - ``mandatoryDirectionAheadOnly``
   * - ``mandatoryDirectionLeftTurnOnly``
   * - ``mandatoryDirectionOneWay``
   * - ``mandatoryDirectionRightTurnOnly``
   * - ``miscBaySuspension``
   * - ``miscBusGate``
   * - ``miscBusLaneWithTrafficFlow``
   * - ``miscBusOnlyStreet``
   * - ``miscCongestionLowEmissionZone``
   * - ``miscContraflow``
   * - ``miscContraflowBusLane``
   * - ``miscCycleLane``
   * - ``miscCycleLaneClosure``
   * - ``miscFootwayClosure``
   * - ``miscLaneClosure``
   * - ``miscPedestrianZone``
   * - ``miscPROWClosure``
   * - ``miscRoadClosure``
   * - ``miscRoadClosureCrossingPoint``
   * - ``miscSuspensionOfBusway``
   * - ``miscSuspensionOfOneWay``
   * - ``miscSuspensionOfParkingRestriction``
   * - ``miscSuspensionOfWeightRestriction``
   * - ``miscTemporaryParkingBay``
   * - ``miscTemporaryParkingRestriction``
   * - ``movementOrderNoOvertaking``
   * - ``movementOrderPriorityOverOncomingTraffic``
   * - ``movementOrderProhibitedAccess``
   * - ``nonOrderKerbsideBusStop``
   * - ``nonOrderKerbsidePedestrianCrossing``
   * - ``nonOrderMovementBoxJunction``
   * - ``publicRightOfWayClosure``

.. raw:: html

   </div>

.. note::
    It is acknowledged that existing practice for defining TROs in different TRAs may use slightly different terms to describe what fundamentally are the same regulatory concept. To improve the interoperability of TRO data coming from different TRAs, mapping of locally adopted terms to the regulation types given in the list above is essential. Genuinely new, distinct regulation concepts can be provided using the ``offListRegulation`` mechanism described below - but this should be rarely used.

.. note::
    The regulationType list is expected to continue and evolve, both as the full spectrum of regulations covered by TROs is established and as regulatory need in the use of TRO changes over time.

    DfT welcomes inputs and additional requirements from Traffic Regulation Authorities. Please refer to GitHub issue #6 for further information: https://github.com/department-for-transport-public/D-TRO/issues/6.

:numref:`fig15` provides the UML class representation of the ``speedLimitValueBased`` object.

.. _fig15:

.. figure:: /_static/images/fig15.png
   :alt: UML model representation of the speedLimitValueBased object
   :width: 80%
   :align: center

   UML model representation of the ``speedLimitValueBased`` object

The ``speedLimitValueBased`` object defines a speed limit value using structured attributes. It includes three mandatory attributes, as described below

* The ``type`` attribute indicates the type of speed limit being defined. The possible values are

* ``maximumSpeedLimit``

* ``minimumSpeedLimit``

* ``nationalSpeedLimitWellLitStreetDefault``

The data type is ``SpeedLimitValueType`` (enumeration). This attribute is mandatory and must be provided exactly once.

:numref:`fig16` provides the UML class representation of the ``speedLimitProfileBased`` object.

.. _fig16:

.. figure:: /_static/images/fig16.png
   :alt: UML model representation of the speedLimitProfileBased object
   :width: 80%
   :align: center

   UML model representation of the ``speedLimitProfileBased`` object

The ``speedLimitProfileBased`` object has one mandatory attribute.

* The ``type`` attribute indicates the type of profile for speed limit being defined for Carriageways and Motorways, with potential values:
    * ``nationalSpeedLimitDualCarriageway``
    * ``nationalSpeedLimitSingleCarriageway``
    * ``nationalSpeedLimitMotorway``

The Data Model is experimental in nature and there is a real-world road network usage and therefore TROs (e.g., consider the relatively recent introduction of e-Scooters). The Data Model supports a couple of different approaches to support extension to new situations and regulations.

If a new form of regulation is required, beyond those already specified in the Data Model, the ``offListRegulation`` object can be used.

:numref:`fig17` provides the UML class representation of the ``offListRegulation`` object.

.. _fig17:

.. figure:: /_static/images/fig17.png
   :alt: UML model representation of the offListRegulation object
   :width: 80%
   :align: center

   UML model representation of the ``offListRegulation`` object

The ``offListRegulation`` object has three attributes:

* The ``regulationShortName`` attribute is mandatory and enables the TRA to give a short name for the new extended regulation type. This typically is less than 30 characters in length. For example, ``kerbsideEScooterParking`` or ``kerbsidePublicMobileRobotParking``.

* The ``regulationFullText`` attribute is mandatory and contains the full descriptive text used in the TRO for the new extended regulation type.

* The ``legislationCrossReference`` attribute, optionally, supports multiple references to the new extended regulation may be provided. This may be a reference to a clause in the TRO or a Uniform Resource Identifier (URI) to supporting published material.

In instances where a temporary regulation temporarily replaces a pre-existing regulation the ``temporaryProvision`` object may be used to indicate references to pre-existing regulation(s).

:numref:`fig18` provides the UML class representation of the ``temporaryProvision`` object that provide a link between the current focus D-TRO provision and its regulation to the existing provision, which is known to the D-TRO Service, that is being temporarily overridden.

The ``temporaryOverriddenProvision`` attribute provides the reference to the overridden existing provision. The data type is a string (free text). This attribute is mandatory and must be provided exactly once.


.. _fig18:

.. figure:: /_static/images/fig18.png
   :alt: UML model representation of the temporaryProvision object
   :width: 80%
   :align: center

   UML model representation of the ``temporaryProvision`` object

Managing Records for TROs and Corresponding Provisions
******************************************************

.. note::
    A key enhancement to the Data Model for Beta is the Records Management concept to help link together TROs and provisions, supporting different forms of orders, order provisions and notices that come into the D-TRO Central Service, particularly in the case of amendments, revocations, variations by notice and consolidations.

As part of records management, the Central Service will maintain a 'live TRO' list, which may be modified by the receipt of a new inbound Order or Notice received by the Central Service.

* An ``amendment`` order can change or remove anything in an existing order - or orders - and add new provisions and revoke other orders.

* A ``revocation`` is a type of amendment order, that does not have any new provisions. An order that only contains revocations will still be advertised and consulted upon. The receipt of a record that is identified solely as a revocation into the central service, does not automatically mean that any referenced previous orders will be removed from the “live TRO” list. An order that is solely a revocation may only revoke parts of an old order and leave other parts intact - this may be a partial revocation of a Provision within a previous TRO.

* Parking tariffs are varied by use of a **variation by notice**. As the initial tariffs may have been specified in the original full order, this can have the effect of being an amendment to it.

* A ``consolidation`` is an administrative process and nothing 'of substance' should be added or removed. Generally, a consolidation would combine a base order and its subsequent amendments into a new base order. If something is missed from the revocation list of a consolidation, then the remaining pre-existing Provisions (partial or whole) might be orphaned but still be in force. These always have multiple revocations by definition.

* A ``consolidation`` can be used to change some details of a previously made TRO, so long as this does not affect the substance of the Order. Things can be tidied up if required (noting there is small defined list of minor changes that are allowed) but nothing should be changed that would ordinarily require consultation. The opportunity to make changes is very limited. However, as a side note, this can be complicated by the fact that some people refer to the combination of old orders with substantial changes as a consolidation, which it is not.

We require that all (versions of) Orders and Notices received shall contain 'minimum contextual content' (i.e. the who, what, when and how much, if relevant, of any Provision). This requirement is defined by the minimum mandatory data elements within the Data Model. Effectively new versions will replace older versions within the Live TRO list - old versions will remain visible for a while.

Whilst the central service currently will hold records for all D-TRO records it has received, D-TRO records management mean that new versions of TROs (and their provisions) - through amendments and revocations - will supersede earlier versions. Each version is considered to be a complete representation of the TRO and its provisions. Older records that have been amended or revoked will be visible in the Central Service for a defined retention period, before being archived.

.. _fig19:

.. figure:: /_static/images/fig19.png
   :alt: Objects View for Records Management related objects
   :width: 80%
   :align: center

   Objects View for Records Management related objects


The ``source`` and ``provision`` objects have been described above in :ref:`section3.1`, with an illustrative example shown in :numref:`fig20`.

.. _fig20:

.. figure:: /_static/images/fig20.png
   :alt: Records Management example for source & provision
   :width: 80%
   :align: center

   Records Management example for source & provision

The example shown above illustrates the D-TRO records management in progress. The left-hand side shows a new TRO, being submitted as a D-TRO into the central service (via the “Create D-TRO” process).

It contains multiple sources and provisions. For the purpose of this illustration, we focus on source #1 (with reference TRAxxxx-So-01, and actionType = 'new'). It has two child provisions:

* provision #1 with reference: TRAxxxx-Pro-01 and ``actionType`` = ``new``, and

* provision #2 with reference: TRAxxxx-Pro-12 and ``actionType`` = ``new``

At a later point in time, the TRA makes a new (Consolidation) TRO with reference TRAxxxx-SO-09, and ``actionType`` = ``amendment``. We highlight two of the provisions in the example:

* provision #1, with reference: TRAxxxx-Pro-01 and ``actionType`` = ``partialAmendment``, and

* provision #7, with reference: TRAxxxx-Pro-12 and ``actionType`` = ``fullRevoke``

For the new provision #1, as this has the same reference as provision #1 from the earlier TRO, and an action type of ``partialAmendment``, this instance of the provision is considered to fully replace the earlier instance. The old version of provision #1 with reference: TRAxxxx-Pro-01 will be marked in the D-TRO service database as not current and replaced by a newer version.

For provision #7, as this has the same reference as provision #2 from the earlier TRO, and an action type of ``fullRevoke``, this instance of the provision is considered to fully replace the earlier instance. The old version of provision #2 with reference: TRAxxxx-Pro-12 will be marked in the D-TRO Service database as not current.

When using ``actionType``s for amendment (``fullAmendment`` or ``partialAmendment``) the old provision (or source) is considered to be fully replaced by the new provision. The same applies to amendment of sources. The distinction between ``fullAmendment`` and ``partialAmendment`` does not change the action of the D-TRO service records management, but rather may be helpful metadata for data consumers to correctly interpret updates between records. The same records management approach applies to ``partialRevoke``.

Use of ``fullyRevoke`` does not replace the older record by a newer one, but rather triggers the older record to be marked in the D-TRO Service database as not current.

The use of the ``actionType`` ``new`` is interpreted by the D-TRO service as the newer records being unrelated to older records. Both will be considered to be current in the D-TRO Service database.

Specifying Locations for TROs
*****************************

.. note::
    Following key stakeholder engagement, no singular preferred approach to location referencing is mandated at this current stage. During the D-TRO Beta project, feedback provided from data consumers will inform the usability of data provided through the mixed approaches for location referencing.

In order to make future digital TROs useable to the widest set of stakeholders and applications the provision of a coded location that is machine-interpretable and can be related to specific spatially coded locations on digital maps is considered essential. Providing clear information on the geographic spatial location that are subject to regulations is a critical element of the D-TRO record.

No single preferred approach is mandated at this current stage. Therefore, for example, a speed limit TRO provision can be represented either by linear road centreline/reference line features (polyline) or by use of a polygon. Similarly, kerb line regulations can be represented as a polyline, a polygon or both.

The following sections lay out a standardised approach for how the location data for TRO regulations should be handled. All TRO regulation measures shall be defined geospatially, using coordinates and coded in WKT (Well Known Text) format.

The standardised approach covers general concepts, such as where to place spatial polygons or polyline in different circumstances, which is expected to be appropriate for most forms of TRO regulation.

The standardised approach addresses:

* Instances where TRO regulations are subject to a direction, such as one-way streets, no entry restrictions, banned turns, etc

* Cases where TRO regulations may apply to roads that appear coincident on a map but are grade separated vertically.

* The topic of providing additional contextual information that enables the TRO regulation locations to be associated directly with references found in well-known road network model data sets, specifically the National Street Gazetteer.

* Other forms of TRO regulation location which can be considered more point-like, such as gate access regulations, some height, width, weight regulations.

A TRO may contain multiple distinct regulations (measures) which relate to potentially numerous **regulated places**. The shape/geometry of the spatial footprint of a regulated place may not be well defined in existing and current new TROs. Table 1 provides an overview of the forms of shape/geometry for TRO regulations.

.. raw:: html

   <div class="table">

.. table:: Geometry examples for different forms of regulation
   :widths: auto

   +---------------------------------------+--------------------------------------------------+
   | **Section of whole road**             | **Lane-based**                                   |
   |                                       |                                                  |
   | (e.g. speed limit, one way street)    | (e.g. bus lane restrictions, HOV lanes)          |
   +---------------------------------------+--------------------------------------------------+
   | **Point/gate**                        | **Zone/Area (polygon)**                          |
   |                                       |                                                  |
   | (e.g. bus gate, width access control) | (e.g. Controlled Parking Zone, 20mph speed zone) |
   +---------------------------------------+--------------------------------------------------+
   | **Section of kerb line**              | **Turning movement**                             |
   |                                       |                                                  |
   | (e.g. parking.loadin restrictions)    | (e.g. banned turns)                              |
   +---------------------------------------+--------------------------------------------------+

.. raw:: html

    </div>


:numref:`fig21` provdes the UML class representation of the location related objects.

.. _fig21:

.. figure:: /_static/images/fig21.png
   :alt: UML model representation of location related objects
   :width: 80%
   :align: center

   UML model representation of location related objects

Each instance of ``provision`` shall be related to at least one ``regulatedPlace``.

A ``regulatedPlace`` represents a real-world identifiable location which is where the provision and related regulation(s) are applicable to. There is no particular limitation or rules concerning specifying a regulatedPlace, or choosing to define the zone of influence into several ``regulatedPlace`` - this is a choice of the TRA.

Each ``regulatedPlace`` shall have one or, potentially more than one, specified ``geometry``.

If multiple ``geometry`` instances exist for a ``regulatedPlace`` each ``geometry`` instance represents an alternative version (alternative representation) of the same location. They are not intended to define different real-world locations. Each instance of geometry for a ``regulatedPlace`` shall have a unique ``version`` attribute value (see :numref:`fig24` below). This enables a TRA to represent a ``regulatedPlace`` using, say, a polygon-based ``geometry`` in one version, and a polyline-based ``geometry`` in a second version.

.. note::
    In v3.3.0 and higher, the ability to define Diversion Routes is provided.

    A word on coding of diversion routes; Coding diversion routes uses the same sub-model structure below the ``regulatedPlace`` as is used for coding the location of the effect of a regulation. For diversion routes, meaningfully, this can be done by use of a ``linearGeometry`` object, and associated ``externalReference(s)`` (USRNs). A ``directedLinear`` object could also be used. The ``polygon`` and ``pointLocation`` objects should not be used.

    It is good practice to provide start and end coordinates that relate to where the diversion route deviates from the primary route (start and end coordinates), and also provide sufficient intermediate points that the path of the diversion route through the road network is clear. Where USRNs are available, reference to all applicable USRNs forming the diversion route shall be supplied.

The sub-model below the regulatedPlace object can also be used to define, optionally, diversion routes.

:numref:`fig22` provides the UML class representation of the ``regulatedPlace`` object.

.. _fig22:

.. figure:: /_static/images/fig22.png
   :alt: UML model representation of the regulatedPlace object
   :width: 80%
   :align: center

   UML model representation of the ``regulatedPlace`` object

Each ``regulatedPlace`` has a description given in a free-text string in the ``description`` attribute. This can support the traditional textual description of the relevant location (e.g. Henbury Way).

In addition:

● The ``assignment`` attribute indicate that the regulatedPlace is subject to an assignment has been granted under section 28(1) of the New Roads and Street Works Act 1991

● The ``busRoute`` attribute indicates that the regulatedPlace relates to (1) a road outside Greater London which is included in the route of a local service or (2) a road in Greater London which is included in the route of a London bus service

● The ``bywayType`` attribute indicates whether the regulatedPlace relates to a footpath, bridle way, cycle track, restricted byway or byway open to all traffic

● The ``concession`` attribute indicates whether the regulatedPlace relates to a road which is subject to a concession within the meaning given by section 1(2) of the New Roads and Street Works Act 1991.

● The ``tramcar`` attribute indicates that the regulatedPlace relates to a road on which a tramcar or trolley service vehicle is provided

● The ``type`` attribute indicates whether the regulatedPlace instance defines the location of the effect of the regulation (regulationLocation) or a diversion route (diversionRoute).

Note: Attributes ``concession``, ``assignment``, ``tramcar``, ``busRoute`` and ``bywayType`` are mandatory for Made Orders (see :ref:`user-and-policy-driven-needs`).

.. _fig23:

.. figure:: /_static/images/fig23.png
   :alt: regulatedPlaceTypes
   :width: 80%
   :align: center

   ``regulatedPlaceTypes``

Each ``regulatedPlace`` is linked to at least one, and potentially more than one, ``geometry`` object.

:numref:`fig24` provides the UML class representation of the ``geometry`` object.

.. _fig24:

.. figure:: /_static/images/fig24.png
   :alt: UML model representation of the geometry object
   :width: 80%
   :align: center

   UML model representation of the ``geometry`` object

The ``geometry`` object has one attribute:

* The mandatory ``version`` attribute which indicates the version number of the ``geometry`` instance defined.

The OSGB36 / British National Grid Coordinate Reference System (ESPG:27700) shall be used.

OSGB36 is well aligned with other local authority data obligations (NSG, LLPG) and provides a baseline CRS that is anchored on the UK :ref:`[6] <ref-coordinate_reference_system>`.

.. note::
    The geometry solution given above emerged from the Valtech Alpha project and has been developed during this Beta project. It is now being subject to prototyping and therefore comments and suggestions for input from relevant stakeholders are welcomed to help develop further.

The details provided in the ``geometry`` object alone are not sufficient to define the spatial geometry of the ``regulatedPlace`` and provide meaningful semantic content to explain what the given geometry means. Therefore, four specialisations of different forms of geometry are supported.

The four specialisations are:

* ``pointGeometry`` - where the supplied geometry identifies a point location, the context of this point location is given in the ``pointGeometry`` object.

* ``linearGeometry`` - where the supplied geometry identifies a polyline location, the context of this polyline (linear location) is given in the ``linearGeometry`` object.

* ``polygon`` - where the supplied geometry identifies polygon (zone or area) location, the context of this polygon location is given in the object.

* ``directedLinear`` - where the supplied geometry a defined movement between two (or linked multiple more) locations (such as defining a banned turn between North Way and East Street), the context of motion (directed linear location) is given in the ``directedLinear`` object.

Each is described in turn.

:numref:`fig25` provides the UML class representation of the ``pointGeometry`` object.

.. _fig25:

.. figure:: /_static/images/fig25.png
   :alt: UML model representation of the pointGeometry object
   :width: 80%
   :align: center

   UML model representation of the ``pointGeometry`` object

The use of the ``pointGeometry`` class is preferred for point/gate locations.

The ``pointGeometry`` object has a single mandatory attribute, ``representation`` which indicates the nature of the point location for a point representation of a regulated place. Acceptable values are: ``centreLinePoint``, ``trafficSignLocation``, and ``other``.

Note: the data type of the attribute ``point`` is defined as a string. This string shall conform to the format required by the WKT standard.

The specific form of standardised data encoding to be used to structure TRO location data in a way that is consistent robust and commonly interpreted. Use of both GeoJSON or WKT (Well Known Text) conventions have been considered. However, the latest edition (2016) of GeoJSON (`RFC 7946 <https://datatracker.ietf.org/doc/html/rfc7946>`_) only permits the use of WGS84 coordinates, and therefore cannot be used given the coordinate referencing system decision above.

The coding of ``pointGeometry.point``, ``linearGeometry.linestring``, ``polygon.polygon`` and ``directedLinear.directedLineString`` shall follow the WKT geometry standard - ISO/IEC 13249-3:2016, showing examples of WKT coding, using OSGB coordinate references (SRID = 27700), around the DfT office in Victoria. Only the ``point``, ``linestring`` and ``polygon`` WKT constructs are permitted.

.. raw:: html

   <div class="table">

.. list-table:: Geometry Types with Examples
   :header-rows: 1

   * - Type
     - Description
     - Illustration
     - Codified Example
   * - ``point``
     - The ``point`` represents a specific location, which in this example is the entrance to the DfT office (Great Minster House)
     - .. image:: ../_static/images/point.png
     -  point: “SRID=27700;POINT(529157 178805)”
   * - ``linstring`` or ``directedLineString``
     - The ``lineString`` represents a segment of Horseferry Road, which runs in front of the DfT office
     - .. image:: ../_static/images/linestring.png
     - linestring: “SRID=27700;LINESTRING(529050 178750, 529157 178805, 529250 178860)”
   * - ``polygon``
     - The ``polygon`` represents an area around the DfT office, enclosing the building
     - .. image:: ../_static/images/polygon1.png
     - polygon: “SRID=27700;POLYGON((529100 178750, 529200 178750, 529200 178860, 529100 178860, 529100 178750))”
   * - 
     - A polygon can also include optional interior rings or holes to represent areas with interior and exterior boundaries, represented by additional sets of coordinate references
     - .. image:: ../_static/images/polygon2.png
     - polygon: “SRID=27700;POLYGON((529100 178750, 529200 178750, 529200 178860, 529100 178860, 529100 178750), (529150 178780, 529200 178780, 529200 178830, 529150 178830, 529150 178780))”

.. raw:: html
   
   </div>

:numref:`fig26` provides the UML class representation of the ``linearGeometry`` object.

.. _fig26:

.. figure:: /_static/images/fig26.png
   :alt: UML model representation of the linearGeometry object
   :width: 80%
   :align: center

   UML model representation of the ``linearGeometry`` object

The ``linearGeometry`` object has four attributes:

* The mandatory ``representation`` attribute which identifies where the given linear geometry is represents a linear feature location (e.g., a stretch of kerbline) and is a representation of zonal object (e.g., the reference centreline of a length of road, where the location of applicability is the whole width of the road for the defined length).

* The mandatory ``direction`` attribute indicates the direction of the applicability of the referenced regulation. Acceptable values are ``bidirectional``, ``startToEnd``, and ``endToStart``. Note this can be used to support the definition of the direction of a direction sensitive regulation on, say, a single road section (e.g. a northbound direction {from the start to the end of the sequence of vertices that exists within the polyline} on a one-way street).

This is distinct from trying to define turning motions between two identifiable road sections. For a linearLocation, the mandatory link to the National Street Gazetteer shall be used to supply all relevant URSN, if they exist. For a directedLinear requires reference to a start and an end USRN (i.e. two).

* The mandatory ``lateralPosition`` attribute indicates the lateral position across a road of the linear representation of a regulated place. Acceptable values are ``centreline``, ``onKerb``, ``near`` and ``far``. The values ``near`` and ``far`` are not currently defined in any detail.

* The mandatory ``linestring`` attribute is a free text field holding the WKT coded representation of vertices forming a linestring. By default, two coordinate values per vertex are used, however and optional third attribute can be defined in instances where the vertical separation of roads and regulations need to be defined.

:numref:`fig27` provides the UML class representation of the ``polygon`` object.

.. _fig27:

.. figure:: /_static/images/fig27.png
   :alt: UML model representation of the polygon object
   :width: 80%
   :align: center

   UML model representation of the ``polygon`` object

The polygon object has one mandatory attribute:

* The ``polygon`` attribute defines a coordinate-polygon that represents the extent of the road subject to the TRO regulation. The mandatory 'polygon' attribute is a free text field holding the WKT-coded representation of vertices forming a polygon. By default, two coordinate values per vertex are used, however and optional third attribute can be defined in instances where the vertical separation of roads and regulations need to be defined.

:numref:`fig28` provides the UML class representation of the ``directedLinear`` object.

.. _fig28:

.. figure:: /_static/images/fig28.png
   :alt: UML model representation of the directedLinear object
   :width: 80%
   :align: center

   UML model representation of the ``directedLinear`` object

The ``directedLinear`` object has one mandatory attribute:

* The ``directedLineString`` attribute specialisation is used for specifying regulations for turning movements or directional regulations. The mandatory ``directedLineString`` attribute is a free text field holding the WKT-coded representation of vertices forming a polyline. In this case, the sequence of vertices defined is considered to be significant, the first vertex being considered the start of the directedLineString; and the last vertex being considered the end of the ``directedLineString``. Intermediate additional vertices can be added if they are considered to clarify routing through the road network, between the start and the end. By default, two coordinate values per vertex are used, however and optional third attribute can be defined in instances where the vertical separation of roads and regulations need to be defined.

:numref:`fig29` provides the UML representation of ``diversionType`` object.

.. _fig29:

.. figure:: /_static/images/diversion-type.png
   :alt: UML model representation of the diversionType object
   :width: 80%
   :align: center

   UML model representation of the ``diversionType`` object

The ``diversionType`` object links to different forms of diversion route as shown in the schema below.

.. _fig30:

.. figure:: /_static/images/diversion-route-type.png
   :alt: UML model representation of the diversionRouteType object
   :width: 80%
   :align: center

   UML model representation of the ``diversionRouteType`` object

:numref:`fig31` provides the UML representation of ``externalReference`` object.

.. _fig31:

.. figure:: /_static/images/external-reference.png
   :alt: UML model representation of the externalReference object
   :width: 80%
   :align: center

   UML model representation of the ``externalReference`` object

The ``externalReference`` object has one mandatory attribute:

* The ``lastUpdateDate`` attribute is a date to specify when this cross reference was established, as USRNs and ESUs do occasionally change.

**If no relevant USRN is available, the ``externalReference``, ``uniqueStreetReferenceNumber`` and ``elementaryStreetUnit`` objects shall not be supplied.**

:numref:`fig32` provides the UML representation of ``uniqueStreetReferenceNumber`` object. Each ``regulatedPlace`` shall be cross-referenced to one or more Unique Street Reference Numbers (USRN) as specified in the National Street Gazetteer (NSG), by use of the ``usrn`` attribute, where the road has a USRN.

.. _fig32:

.. figure:: /_static/images/usrn.png
   :alt: UML model representation of the uniqueStreetReferenceNumber object
   :width: 80%
   :align: center

   UML model representation of the ``uniqueStreetReferenceNumber`` object

The ``uniqueStreetReferenceNumber`` object has three attributes:

* The mandatory ``nsgStreetName`` and ``nsgSteetNumber`` are the street name and street reference numbers in the Gazetteer for the Regulated Place. ``nsgStreetName`` and ``nsgSteetNumber`` attributes are optional, however, it is mandatory that one attribute shall be filled, for all road lengths that appear in the NSG.

* The mandatory ``usrn`` attribute is the designated Unified Street Reference Number derived from the NSG.

Multiple URSNs can be defined per geometry, as some streets have multiple USRNs (e.g. Blackstock Road near Finsbury Park in London, which sits on the border of Islington and Hackney).

:numref:`fig33` provides the UML representation of ``elementaryStreetUnit`` object

.. _fig33:

.. figure:: /_static/images/esu.png
   :alt: UML model representation of the elementaryStreetUnit object
   :width: 80%
   :align: center

   UML model representation of the ``elementaryStreetUnit`` object

The optional ``elementaryStreetUnit`` object has one mandatory attribute:

* The ``esu`` attribute represents the Elementary Street Unit (ESU) derived from the NSG, relating to the origin and destination locations shall be specified, where they exist in the NSG.

Times Relating to Regulations
*****************************

Date and time information relating to regulations is defined using a tried and tested sub-model which appears in several European technical standards and is widely deployed.

.. note::
    In earlier data model versions, the ``timeValidity`` object was related to two objects: ``condition`` and ``regulation``. In version v3.3.0 and higher, ``timeValidity`` is maintained as only a child of ``condition``. The relationship between ``timeValidity`` and ``regulation`` has been removed, to reduce complexity.

The full ``timeValidity`` sub-model is shown in :numref:`fig34`.

.. _fig34:

.. figure:: /_static/images/time-validity-relationships.png
   :alt: UML model representation of Validity (Time-based) related objects
   :width: 80%
   :align: center

   UML model representation of Validity (Time-based) related objects

Use of each object and its attributes is given below. For all dates and times, the following should be noted:

* All times are expressed in local time (i.e. without reference to UTC time-zone offset). The combination of the regulation.timezone attribute and local times enables data consumers to calculate the times of applicability in absolute times. The rationale for specifying times of applicability in local times aligns with common practice for TROs and reduces the complexity of the data to be delivered.

* Dates and times - generally all date and time records shall be expressed using the ISO 8601-1:2019 extended format (e.g., ``YYYY-MM-DDTHH:MI:SS``) - note: no ``Z`` timezone offset. Some specific exceptions to this rule do exist - ``eventTime`` and ``publicationTime``, which are both metadata attributes (beyond the scope of this document) are specified using the ISO 8601-1:2019 extended format for UTC datetimes, indicated by the suffix ``Z`` (e.g., ``YYYY-MM-DDTHH:MI:SSZ``).

:numref:`fig35` provides the UML class representation of the ``timeValidity`` object.

.. _fig35:

.. figure:: /_static/images/time-validity.png
   :alt: UML model representation of the timeValidity object
   :width: 80%
   :align: center

   UML model representation of the ``timeValidity`` object

The ``timeValidity`` object defines overall dates and times relating to the applicability of a regulation. It shall be used to specify the bounding start and end times of the validity period, within which there may be any number of valid and invalid (exception) periods. The ``start`` date time attribute is mandatory - in the case where the D-TRO record characterises a historic, live regulation and the actual date and time of applicability is unknown the start attribute should be set to the current time.

For permanent TROs the end attribute may be omitted.

The ``timeValidity`` model allows intermittent or variable patterns of time applicability for TRO regulations to be specified.

:numref:`fig36` shows the UML class representation of the period object but also note the two links at the top of the figure, which allow instances of the period object to be specified either as a valid period (i.e., an included period) or an exception period (i.e., an excluded period where the regulation is not applicable).

.. note::
    It is a matter of data quality and integrity on behalf of the data supplier to ensure the dates and times and periods of applicability are complete, consistent and coherent – there is nothing in the Data Model, per se, that stops contradictory or conflicting information being specified. Data suppliers should take appropriate steps to ensure the quality of the data supplied.

The overall ``timeValidity`` period defined by the ``start`` and ``end`` properties in the ``timeValidity`` object shall strictly bound (i.e. override) any periods defined in the period object.

.. note::
    Where an invalid (exception) period overlaps (intersects) a valid period the validity shall be regarded as invalid.

.. _fig36:

.. figure:: /_static/images/period.png
   :alt: UML model representation of the period object
   :width: 80%
   :align: center

   UML model representation of the ``period`` object

Each instance of ``period`` may have a given ``periodName`` and also may have specified date times indicating the ``startOfPeriod`` and ``endOfPeriod``. If the ``startOfPeriod`` or the ``endOfPeriod`` are unspecified the date times of the related ``timeValidity`` object instance may bound applicability.

An instance of a ``period`` object is typically used to define patterns of applicability of a regulation (or exceptions). This is done in conjunction with several 'child'objects. These are described below. These 'child' objects can be combined in several ways to express different patterns.

.. admonition:: Example
   :class: example

   An illustrative example is a permanent TRO for a parking restriction. This fictitious TRO was made in early 2022 and came in effect on 1st June 2022. It is applicable between 15th June and 30th September each year, and between the hours of 07:00 and 09:30am and again between 16:00 and 18:30 on weekdays, except public holidays.

The optional attribute ``recurringPeriod``, if populated, indicates that the ``startOfPeriod`` and ``endOfPeriod`` attributes are considered to define the first instance of a recurring period. The attribute ``recurringPeriod`` defines the duration between the start of instances of recurring periods. The ``recurrents`` attribute is optional and can define a number of repetitions if required - this is not typically the case of permanent regulations.

To support use cases where the start and ends of recurring periods are defined by a changeable date (such as Good Friday, or Easter), the use of the ``changeableTimePeriod`` object and its children allow changeable dates to be defined, and these will overide the ``startOfPeriod`` and ``endOfPeriod`` attributes.

:numref:`fig37` provides the UML class representation of the timePeriodOfDay object.

.. _fig37:

.. figure:: /_static/images/time-period-of-day.png
   :alt: UML model representation of the timePeriodOfDay object
   :width: 80%
   :align: center

   UML model representation of the ``timePeriodOfDay`` object

The ``timePeriodOfDay`` object has two mandatory attributes, which indicate the time of day of the start and end of the period with local times being used when defining validity.

In the example given above, the first instance of the ``timePeriodOfDay`` object contains the attribute ``startTimeOfPeriod`` with the value 07:00am (07:00:00) and the attribute ``endTimeOfPeriod`` with the value 09:30am (09:30:00). The second instance of the ``timePeriodOfDay`` object contains the attribute ``startTimeOfPeriod`` with the value 4:00pm (16:00:00) and the attribute ``endTimeOfPeriod`` with the value 6:30pm (18:30:00).

This addresses the local challenge of daylight saving time changes, but should be taken into account when factoring into time-zone based systems.

The value of ``startTimeOfPeriod`` must fall before the value of ``endTimeOfPeriod`` within a one-day period.

:numref:`fig28` provides the UML class representation of the ``dayWeekMonth`` Object. This object and its associated specialisation (``calendarWeekInMonth``, ``weekOfMonth``, and ``instanceOfDayWithinMonth``) enable identification of patterns of days, weeks and months.

.. _fig38:

.. figure:: /_static/images/day-week-month.png
   :alt: UML model representation of the dayWeekMonth Object
   :width: 80%
   :align: center

   UML model representation of the ``dayWeekMonth`` Object

The ``dayWeekMonth`` object has two optional attributes:

* The ``applicableDay`` attribute indicates days of the week to be included. The attribute may be used between zero and 7 times, with each attribute instance being a unique day of the week. Permitted values are 'monday', 'tuesday' etc.

In the example above applicableDay would be specified 5 times, with the values 'monday', 'tuesday', 'wednesday', 'thursday', and 'friday'. The order of the attribute values is unimportant.

* The ``applicableMonth`` attribute indicates months of the year to be included. The attribute may be used between zero and 12 times, with each attribute instance being a unique month of the year. Permitted values are 'january', 'february', etc.

:numref:`fig39` provides the UML class representation of the ``calendarWeekInMonth`` Object. This object enables specification of calendar weeks within a month to be included. See ISO-8601 for further details. The first calendar week contains the first of the month, with the calendar week starting on a Monday. Several days of the first week of the month may occur in the previous calendar month. By construction, the last week of a preceding month can also be the first week of a subsequent month.

.. _fig39:

.. figure:: /_static/images/calendar-week-in-month.png
   :alt: UML model representation of the calendarWeekInMonth object
   :width: 80%
   :align: center

   UML model representation of the ``calendarWeekInMonth`` object

The ``calendarWeekInMonth`` object has one mandatory attribute:

* The ``weekInMonth`` attribute indicates the Calendar week of the month to be included. The attribute shall be used between one and 6 times, with each attribute instance being a unique Calendar week in month identifier. Permitted values are 'firstWeekofMonth', 'secondWeekOfMonth' … to 'sixthWeekOfMonth'.

:numref:`fig40` provides the UML class representation of the weekOfMonth object. The weekOfMonth object provides information concerning an identifiable week in a calendar month – where the week starts on the same day of the week as the month. E.g., if the first of the month is a Wednesday, each week in a month identified here also starts on a Wednesday.

.. _fig40:

.. figure:: /_static/images/week-of-month.png
   :alt: UML model representation of the weekOfMonth object
   :width: 80%
   :align: center

   UML model representation of the ``weekOfMonth`` object

The ``weekInMonth`` object has one mandatory attribute:

* The ``applicableWeek`` attribute indicates the week of the month to be included. The attribute shall be used between one and 5 times, with each attribute instance being a unique week in month identifier. Permitted values are 'firstWeek', 'secondWeek' … to 'fifthWeek'.

:numref:`fig41` provides the UML class representation of the ``instanceOfDayWithinMonth`` object. The ``instanceOfDayWithinMonth`` object enables identification of instances of a day of the week in a month; for example, the second Tuesday in the month. When using this object, at least one ``applicableDay`` instance shall be specified in the related object ``dayWeekMonth``.

.. _fig41:

.. figure:: /_static/images/instance-of-day-within-month.png
   :alt: UML model representation of the instanceOfDayWithinMonth object
   :width: 80%
   :align: center

   UML model representation of the ``instanceOfDayWithinMonth`` object

The ``instanceOfDayWithinMonth`` object has one mandatory attribute:

* The ``applicableInstanceOfDayWithinMonth`` attribute indicates the identified day instance within the month to be included. The attribute shall be used between one and 5 times, with each attribute instance of an identified day in a month. Permitted values are 'firstInstance', 'secondInstance' … to 'fifthInstance'. This can be used to define patterns such as the second and fourth Tuesday and Friday in the month.

:numref:`fig42` provides the UML class representation of the ``specialDay`` object. The ``specialDay`` object indicates the characteristics of an identified (special) day.

.. _fig42:

.. figure:: /_static/images/special-day.png
   :alt: UML model representation of the specialDay object
   :width: 80%
   :align: center

   UML model representation of the ``specialDay`` object

The ``specialDay`` object has three attributes:

* The mandatory ``intersectWithApplicableDays`` attribute, specified as a boolean. When ``true``, the period is the intersection of applicable days and this special day. When ``false``, the period is the union of applicable days and this special day.

* The mandatory ``specialDayType`` attribute which indicates the type of the special day. Permitted values are defined in the ``specialDayType`` enumeration list. Values include: 'easter', 'marketDay', 'matchDay', 'publicHoliday' etc.

* The optional ``publicEvent`` attribute which indicates what type of public event is associated with this ``specialDay``. Permitted values are defined in the extensive ``publicEventType`` enumeration list. Values include: 'agriculturalShow', 'airShow, 'artEvent', etc.

:numref:`fig43` provides the UML class representation of the ``publicHoliday`` object. The object publicHoliday with its mandatory attribute ``publicHolidayName`` enables the public holiday to be named.

.. _fig43:

.. figure:: /_static/images/public-holiday.png
   :alt: UML model representation of the publicHoliday object
   :width: 80%
   :align: center

   UML model representation of the ``publicHoliday`` object

:numref:`fig44` provides the UML class representation of the ``changeableTimePeriod`` object.

.. _fig44:

.. figure:: /_static/images/changeable-time-period.png
   :alt: UML model representation of the changeableTimePeriod object
   :width: 80%
   :align: center

   UML model representation of the ``changeableTimePeriod`` object

:numref:`fig45` provides the UML class representation of the ``changeableTimePeriodStart`` object. There is a mirror image object called ``changeableTimePeriodEnd``. Both objects work in a similar manner. A 'fuzzy time' period is defined in several European standards as the time period with non-precise characteristics. However, this is actually a poor definition for the concept. The actual concept is a time qualification that is not fixed and may be variable in nature. The variation may be highly predictable (such as dusk or dawn), or defined by external factors and authorities (such as school terms times in a specific locality). Hence in the D-TRO Data Specification we do not use the term 'Fuzzy Period', but rather ``changeableTimePeriod``.

Use of the ``changeableTimePeriodStart`` object and/or the ``changeableTimePeriodEnd`` object enable a period to be defined using a variable date time start or end or both.

.. _fig45:

.. figure:: /_static/images/changeable-time-period-start.png
   :alt: UML model representation of the changeablePeriodStart object
   :width: 80%
   :align: center

   UML model representation of the ``changeablePeriodStart`` object

.. _fig46:

.. figure:: /_static/images/changeable-time-period-end.png
   :alt: UML model representation of the changeablePeriodEnd object
   :width: 80%
   :align: center

   UML model representation of the ``changeablePeriodEnd`` object

The ``changeableTimePeriodStart`` object (and the ``changeableTimePeriodEnd`` object), shown in :numref:`fig46` and :numref:`fig47` respectively, each has one attribute:

* The mandatory ``startType`` attribute (``endType`` for the ``changeableTimePeriodEnd`` object), which indicates the type of characteristic time measure being used. Values include: ``dawn``, ``dusk``, ``holiday``, and ``external``.

The ``changeableTimePeriodStart`` and ``changeableTimePeriodEnd`` objects define the nature of the ``changeableTimePeriod``. They do not provide the specific means to determine what the instances of period starts and ends are. This is done by one of three mechanisms:

* Use of the ``changeableTimePeriodSource`` object which points to an external data resource.

* Use of the ``changeableTimePeriodEntry`` object or objects gives specific date time value which is associated with a start or stop. Use of several objects can build up a schedule or calender of start entries and/or stop entries.

* By use of the linkage between a ``changeableTimePeriodStart`` object and/or ``changeableTimePeriodEnd`` object with the ``specialDay`` object - i.e. indicating that the start and/or end is a special day (e.g. Easter).

:numref:`fig47` provides the UML class representation of the ``changeableTimePeriodSource`` object.

.. _fig47:

.. figure:: /_static/images/changeable-time-period-source.png
   :alt: UML model representation of the changeableTimePeriodSource object
   :width: 80%
   :align: center

   UML model representation of the ``changeableTimePeriodSource`` object

The ``changeableTimePeriodSource`` object has two mandatory attributes:

* The ``definition`` attribute is a free-text string that describes the nature of the external data source.

* The ``sourceLocator`` attribute is a URI hyperlink providing the accessible location for retrieval of the external data source.

Each instance of ``changeableTimePeriodSource`` will have a definition to explain the nature of the source of data that provides the accurate timings. E.g. for a changeable time period of school term times, it could be a Government website which shares these dates. The ``sourceLocator`` will then provide the specific data elements from the hyperlink of the website through the URI.

:numref:`fig48` provides the UML class representation of the ``changeableTimePeriodEntry`` object.

.. _fig48:

.. figure:: /_static/images/changeable-time-period-entry.png
   :alt: UML model representation of the changeableTimePeriodEntry object
   :width: 80%
   :align: center

   UML model representation of the ``changeableTimePeriodEntry`` object

The ``changeableTimePeriodEntry`` object has one mandatory attribute:

* The ``entry`` attribute provides one date/time entry defining a specific date and time.

An example of ``changeableTimePeriodEntry``, when linked to a ``changeableTimePeriodStart``, could represent a list of school terms start dates, e.g. entry 1 - 2024-09-05T08:00, entry 2 - 2024-11-04T08:00, entry 3 - 2025-01-07T08:00, with equivalent entries linked to the ``changeableTimePeriodEnd``.

About Conditions and Exclusions
*******************************

Being able to specify conditions that apply to regulations is a key element of D-TRO modelling. Such conditions enable regulation properties to detail, for example, width restrictions; access restrictions by vehicle type; conditions applied under different weather conditions, etc.

The D-TRO model for conditions is used to specify conditions or constraints that apply to a regulation. These include time period, vehicle type, weather conditions, etc. :numref:`conditionRelationships` provides the UML class representation of the condition related objects.

.. _conditionRelationships:

.. figure:: /_static/images/conditionRelationships.png
   :alt: UML model representation of condition related objects
   :width: 80%
   :align: center

   UML model representation of condition related objects

.. note::
    In earlier data model versions, the various condition sub-types (e.g. ``roadCondition``, ``occupantCondition``, etc.) were specialisations of the abstract condition object. To improve consistency and reduce complexity, in v3.3.0 and higher, the object condition is concrete (instantiable) and each sub-type is associated with the condition object.

    Each instance of condition **shall be related to one and one only sub-type**.

In any instance where more than one condition is to be included in the definition of a provision, the concept of a ``conditionSet`` shall be used.

A ``conditionSet`` object may be specified using a sequence of conditions with logical operators specifying the relationship of the conditions. An example is as follows:

.. code-block:: xml

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

Or, the same example in an alternate notation:

.. code-block:: python3

    ((timeValidity and vehicleCharacteristics) or (timeValidity and vehicleCharacteristics))

A condition stating ``vehicleType`` = ``emergencyVehicle`` and ``negate`` = ``true`` would mean all vehicles except those of type ``emergencyVehicle``.

An unset negate value means the same as false, i.e., no negation applied.

An illustrative example, in :numref:`condition-sets-and-conditions`, shows the use of conditionSet and condition objects, with sample code.

.. _condition-sets-and-conditions:

.. figure:: /_static/images/condition-sets-and-conditions.png
   :alt: Illustrative example of use of conditionSets and conditions
   :width: 80%
   :align: center

   Illustrative example of use of ``conditionSets`` and ``conditions``

:numref:`conditionSet-json` shows an extract of the JSON coding of the same conditions as shown in :numref:`condition-sets-and-conditions`.

.. _conditionSet-json:

.. code-block:: json
    :caption: Example JSON condition set

    {
        "conditionSet": [
            {
                "operator": "and",
                "conditionSet": [
                    {
                        "operator": "or",
                        "condition": [
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
                                "operator": "and",
                                "condition": [
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
                        ],
                        "condition": {
                            "timeValidity": {
                                "start": "2024-08-22T08:00:00",
                                "end": "2024-08-22T20:00:00",
                            }
                        }
                    }
                ]
            }
        ]
    }
   
.. _condition:

.. figure:: /_static/images/condition.png
   :alt: UML model representation of the condition object
   :width: 80%
   :align: center

   UML model representation of the ``condition`` object

The ``condition`` object has only the ``negate`` attribute, as explained above.

:numref:`condition-set` provides the UML class representation of the ``conditionSet`` object.

.. _condition-set:

.. figure:: /_static/images/condition-set.png
   :alt: UML model representation of the conditionSet object
   :width: 80%
   :align: center

   UML model representation of the ``conditionSet`` object

The ``conditionSet`` object has only the ``operator`` attribute, as explained above. The ``operator`` attribute supports the permissible values ``and``, ``or`` and ``xor``.

:numref:`road-condition` provides the UML class representation of the ``roadCondition`` object.

.. _road-condition:

.. figure:: /_static/images/road-condition.png
   :alt: UML model representation of the roadCondition object
   :width: 80%
   :align: center

   UML model representation of the ``roadCondition`` object

The ``roadCondition`` object contains only the mandatory ``roadType`` attribute. Permissible values include, but are not limited to: ``motorway``, ``trunkRoad``, and ``other``.

:numref:`occupant-condition` provides the UML class representation of the ``occupantCondition`` object.

.. _occupant-condition:

.. figure:: /_static/images/occupant-condition.png
   :alt: UML model representation of the occupantCondition object
   :width: 80%
   :align: center

   UML model representation of the ``occupantCondition`` object

The ``occupantCondition`` object contains only the ``disabledWithPermit`` attribute which is defined as a ``boolean`` data type.

:numref:`number-of-occupants` provides the UML class representation of the ``numberOfOccupants`` object.

.. _number-of-occupants:

.. figure:: /_static/images/number-of-occupants.png
   :alt: UML model representation of the numberOfOccupants object
   :width: 80%
   :align: center

   UML model representation of the ``numberOfOccupants`` object

The ``numberOfOccupants`` object has two mandatory attributes:

* The ``operator`` attribute specifies the operator to be used in the characteristic comparison operation. Permissible operators include ``equalTo``, ``greaterThan``, ``greaterThanOrEqualTo``, ``lessThan``, and ``lessThanOrEqualTo``
* The ``value`` attribute provides the integer numeric value for the boundary condition

.. admonition:: Example
   :class: example

   Up to two instances of the ``numberOfOccupants`` condition can be used to optionally define both an upper and lower boundary, using a combination of the ``operator`` and ``value`` attributes. For example, the following would permit valid use for vehicles between 2 and 8 occupants, inclusive. 
   
   .. code-block:: json

      {
         "numberOfOccupants": [
            {
               "operator": "greaterThanOrEqualTo",
               "value": 2
            },
            {
               "operator": "lessThanOrEqualTo",
               "value": 8
            }
         ]
      }

:numref:`driver-condition` provides the UML class representation of the ``driverCondition`` object.

.. _driver-condition:

.. figure:: /_static/images/driver-condition.png
   :alt: UML model representation of the driverCondition object
   :width: 80%
   :align: center

   UML model representation of the ``driverCondition`` object

The ``driverCondition`` object has one attribute:

* The ``driverCharacteristicsType`` attribute indicates a specific type of driver characteristic. Permissible values include, but are not limited to, ``disabledWithPermit``, ``learnerDriver`` and ``localResident``

:numref:`access-condition` provides the UML class representation of the ``accessCondition`` object.

.. _access-condition:

.. figure:: /_static/images/access-condition.png
   :alt: UML model representation of the accessCondition object
   :width: 80%
   :align: center

   UML model representation of the ``accessCondition`` object

The ``accessCondition`` object has two attributes:

* The ``accessConditionType`` attribute indicates an access restriction type. Permissible values include, but are not limited to, ``accessOnly``, ``loadingAndUnloading`` and ``throughTraffic``
* The ``otherAccessRestriction`` attribute indicates a condition controlling access

:numref:`permit-condition` provides the UML class representation of the ``permitCondition`` object.

.. _permit-condition:

.. figure:: /_static/images/permit-condition.png
   :alt: UML model representation of the permitCondition object
   :width: 80%
   :align: center

   UML model representation of the ``permitCondition`` object

The permitCondition object has the following attributes:

* The mandatory ``type`` attribute indicates the type of the referenced permit. Permissible values include ``doctor``, ``business``, ``resident`` and ``other``. Note that the permissible values list is under review and may modify in future releases of the Data Model
* The optional ``schemeIdentifier`` attribute supports a free text name for the permit scheme referenced
* The optional ``permitIdentifier`` attribute supports multiple instances for an identifier for the permit scheme referenced (e.g., resident parking zone A)
* The optional ``whereToApplyForPermit`` attribute provides a web address (URL) of the competent authority where an application for a permit can be requested
* The optional ``whereToCallForPermit`` attribute provides a contact telephone number of the competent authority where an application for a permit can be requested
* The optional ``locationRelatedPermit`` ``boolean`` attribute which indicates if the referenced permit related to a specified geography
* The optional ``maxDurationOfPermit`` attribute which indicates the maximum validity duration a permit can have, specified in minutes
* The optional ``maximumAccessDuration`` attribute expresses the maximum duration that is permitted in relationship to use of this permit. Specified in minutes
* The optional ``minimumTimeToNextEntry`` attribute expresses the minimum duration between last use of permit and next permitted use of permit. This is often referred to as the no return timeSpecified in minutes

:numref:`authority` provides the UML class representation of the ``authority`` object which is linked to ``permitCondition``.

.. _authority:

.. figure:: /_static/images/authority.png
   :alt: UML model representation of the authority object
   :width: 80%
   :align: center

   UML model representation of the ``authority`` object

The ``authority`` object has only one attribute - The ``name`` attribute indicates the governing authority that has applied the relevant permit condition.

:numref:`permitSubjectToFee` provides the UML class representation of the ``permitSubjectToFee`` object which is linked to ``permitCondition``.

.. _permitSubjectToFee:

.. figure:: /_static/images/permitSubjectToFee.png
   :alt: UML model representation of the permitSubjectToFee object
   :width: 80%
   :align: center

   UML model representation of the ``permitSubjectToFee`` object

The ``permitSubjectToFee`` object has four optional attributes:

* The ``amountDue`` attribute indicates the monetary amount, in pounds sterling, related to the use of or purchase of the permit. This value is expressed in UK Sterling, with two decimal points, e.g. ``8.50`` which represents £8.50.

* The ``paymentInformation`` attribute provides a web address (URL) for further information on the permit and related payment.

.. error::

   MISSING TWO ATTRIBUTES HERE

.. error::

   Also, is this following text meant to be here?

The ``condition`` object is linked to the 'standard' ``timeValidity`` sub-model (the ``timeValidity`` object at the top of this sub-model). This enables time-related conditions to be specified.

:numref:`nonVehicularRoadUserCondition` provides the UML class representation of the ``nonVehicularRoadUserCondition`` object.

.. _nonVehicularRoadUserCondition:

.. figure:: /_static/images/nonVehicularRoadUserCondition.png
   :alt: UML model representation of the nonVehicularRoadUserCondition object
   :width: 80%
   :align: center

   UML model representation of the ``nonVehicularRoadUserCondition`` object

The ``nonVehicularRoadUserCondition`` object has the following attribute:

* The ``nonVehicularRoadUser`` attribute indicates restriction or permissions relating to non-vehicular road users. Permissible values include, but are not limited to, ``pedestrians``, ``herdedAnimals``, etc.

Specifying Vehicle Conditions
*****************************

The ``vehicleCharacteristics``-related objects, specified in this section, comprise a sub-model for defining the characteristics of vehicles.

The information that is modelled in ``vehicleCharacteristics`` objects identifies a set of vehicle characteristics, many of whose values can be specified using the maximum dimension characteristic.

:numref:`vehicleCharacteristics-related` provides the UML class representation of the ``vehicleCharacteristics``-related objects.

.. _vehicleCharacteristics-related:

.. figure:: /_static/images/vehicleCharacteristics-related.png
   :alt: UML model representation of vehicleCharacteristics-related objects
   :width: 80%
   :align: center

   UML model representation of ``vehicleCharacteristics``-related objects

The objects ``maximumGrossWeightCharacteristic``, ``maximumHeightCharacteristic``, ``maximumLengthCharacteristic``, ``maximumWidthCharacteristics``, ``heaviestAxleWeightCharacteristic`` and ``numberOfAxlesCharacteristic`` all follow the same basic pattern, which is described below.

We will use the ``maximumGrossWeightCharacteristic`` object to illustrate this pattern. This enables limits for maximum gross weight to be defined. If gross weight limits are defined in theory there could be two limits - an upper bound (maximum weight) and a lower bound (minimum weight), as shown in :numref:`boundaryConditions`.

In practice, upper bounds are specified in TROs, so the maximum characteristic is used.

.. _boundaryConditions:

.. figure:: /_static/images/boundaryConditions.png
   :alt: Example of boundary conditions (upper and lower bounds)
   :width: 80%
   :align: center

   Example of boundary conditions (upper and lower bounds)

.. error::
   Here we have some text around the ``numberOfAxlesCharacteristic`` object but the figure immediately below is for the ``maximumGrossWeightCharacteristic`` object.
   
   The published version mentions [-1..2] whereas the PDF version says [0..2].

   The grammar needs checking, also.

:numref:`maximumGrossWeightCharacteristic` provides the UML class representation of the ``numberOfAxlesCharacteristic`` object, to support the potential for both upper and lower bounds to be specified up to two instances, depicted by the [-1..2] in the UML representation, of ``numberOfAxlesCharacteristic`` can be linked to each instance of ``vehicleCharacteristics``.

.. _maximumGrossWeightCharacteristic:

.. figure:: /_static/images/maximumGrossWeightCharacteristic.png
   :alt: UML model representation of the maximumGrossWeightCharacteristic object
   :width: 80%
   :align: center

   UML model representation of the ``maximumGrossWeightCharacteristic`` object

The ``maximumGrossWeightCharacteristic`` object has three attributes:

* The mandatory ``grossVehicleWeight`` attribute provides the numeric value for the boundary condition. It is specified in metric tonnes, with one decimal place

* The mandatory ``typeOfWeight`` attribute identifies different forms of weight limit that may be specified. Permissible weight types include ``actual``, ``combinedMaximumPermitted``, ``maximumPermitted`` and ``unladen``.

This pattern is replicated as follows:

.. raw:: html

   <div class="table">

.. csv-table::
   :file: ../table_data/boundary_conditions.csv
   :header-rows: 1

.. raw:: html

   </div>

Attributes similar to ``typeOfWeight`` are not replicated in the other objects listed.

:numref:`vehicleCharacteristics` provides the UML class representation of the ``vehicleCharacteristics`` object.

.. _vehicleCharacteristics:

.. figure:: /_static/images/vehicleCharacteristics.png
   :alt: UML model representation of the vehicleCharacteristics object
   :width: 80%
   :align: center

   UML model representation of the ``vehicleCharacteristics`` object

The ``vehicleCharacteristics`` object has six optional attributes:

* The ``fuelType`` attribute specifies optionally multiple fuel types used by vehicles, within this condition. Permissible fuel types include, for example, ``petrol``, ``diesel``, ``hydrogen``, ``lpg``, ``battery``, etc.

* The ``loadType`` attribute specifies optionally one type of load carried by the vehicle. Permissible load types include, for example, ``empty``, ``dangerousGoods``, ``explosiveMaterials``.

* The ``vehicleEquipment`` attribute specifies optionally one type of vehicle equipment. Permissible equipment types include, for example, ``snowChainsInUse``, ``dippedHeadlightsInUse``, ``electronicTollEquipment``, etc.

* The ``vehicleType`` attribute specifies optionally multiple types of vehicles. Permissible vehicle types include, for example, ``taxi``, ``pedalCycle``, ``car``, ``goodsVehicle``, ``bus``, etc.

* The ``vehicleUsage`` attribute specifies optionally one usage type (i.e. for what purpose is the vehicle being used). Permissible vehicle usage types include, for example, ``accessToOffStreetPremises``, ``localBuses``, ``privateHireVehicle``, ``guidedBus``, etc.

* The ``yearOfFirstRegistration`` attribute specifies optionally one registration year. Year is specified as an integer in the format ``YYYY`` (e.g. 2008).

:numref:`emissions` provides the UML class representation of the emissions object. 

.. _emissions:

.. figure:: /_static/images/emissions.png
   :alt: UML model representation of the emissions object
   :width: 80%
   :align: center

   UML model representation of the ``emissions`` object

The ``emissions`` object has two optional attributes:

* The ``emissionClassificationEuro`` attribute specifies the minimum Euro emission classification the vehicle(s) have to comply with according to the 1970 Directive 70/220/EEC and its several amendments

To specify ``emissionClassificationEuro`` properly, it is necessary to define in the ``vehicleCharacteristics`` object:

* the corresponding vehicle type (e.g., car for M1, miniBus for M2, lightCommercialVehicle for N1 or largeGoodVehicle for N2)
* and fuel type (e.g., diesel for CI engines or petrol for PI engines)

.. note::
   
   Euro V and Euro VI are used for emissions of lorries only.

* The ``emissionClassificationOther`` attribute specifies optionally multiple free-text description of a classification type for vehicle emissions, distinct from the Euro classifications.

About Tariff Rates
******************

:numref:`rate-related-objects` provides the UML class representation of the rate-related objects.

.. _rate-related-objects:

.. figure:: /_static/images/rate-related-objects.png
   :alt: UML model representation of the rate-related objects
   :width: 80%
   :align: center

   UML model representation of the rate-related objects

Information concerning tariff rates may be associated with a defined ``condition``.

The rates sub-model shown here is experimental. It is derived from a richer model that has been specified within the APDS :ref:`[7] <ref-apds>` specifications which have been published as an ISO Technical Specification ISO TS 5206-1:2023.

.. note::

   The 2023 DfT D-TRO Alpha project prototyping begun examining whether this rates sub-model has sufficient functionality to meet the needs of describing rates and tariff in D-TROs. Further work during the Beta Project testing is needed.

:numref:`rateTable` provides the UML class representation of the ``rateTable`` object. Each instance of the condition object may optionally be linked to one instance of the ``rateTable`` object. A ``rateTable`` is described as specific set of rate charges relating to one or more locations and one set of condition criteria.

.. _rateTable:

.. figure:: /_static/images/rateTable.png
   :alt: UML model representation of the rateTable object
   :width: 80%
   :align: center

   UML model representation of the rateTable object

The ``rateTable`` object has two optional attributes:

* The ``type`` attribute specifies the type of rate in use. Permissible types are: ``daily``, ``hourly``

* The ``additionalInformation`` attribute provides a web address (URI) locator for supplementary additional information concerning use of the rate table

Each ``rateTable`` object contains one or more ``rateLineCollection`` objects. A ``rateLineCollection`` is defined as group of rate line elements that logically group together within one rate table, e.g., such as the rate lines for the different tiers of a time-based tier rate table.

:numref:`rateLineCollection` provides the UML class representation of the rateLineCollection object.

.. _rateLineCollection:

.. figure:: /_static/images/rateLineCollection.png
   :alt: UML model representation of the rateLineCollection object
   :width: 80%
   :align: center

   UML model representation of the ``rateLineCollection`` object

The ``rateLineCollection`` object has the following attributes:

* The mandatory ``applicableCurrency`` attribute which defines the monetary currency that rates are specified in this rate line collection. Permissible values are ``GBP`` and ``EUR``

* The optional ``endValidUsagePeriod`` attribute which defines the end time for the validity of this rate line collection

* The optional ``maxTime`` attribute which defines a maximum session duration to be applied to this rate line collection. Defined as ``string`` type, formatted using an ISO 8601-1 duration format

* The optional ``maxValueCollection`` attribute which defines the maximum monetary amount to be applied in conjunction with use of this rate line collection. Defined in applicable currency with 2 decimal places

* The optional ``minTime`` attribute which defines a minimum session duration to be applied to this rate line collection. Defined as ``string`` type, formatted using an ISO 8601-1 duration format

* The optional ``minValueCollection`` attribute which defines the minimum monetary amount to be applied in conjunction with use of this rate line collection. Defined in applicable currency with 2 decimal places

* The optional ``resetTime`` attribute which defines the time that rate resets. Example: a rate table that charges £2 per hour with a max value collection of £10, resets at 2 am. At 2 am, the £2 per hour fee would start to charge until the £10 is reached

* The mandatory ``sequence`` attribute which is specified as an incrementing integer which is an indicator giving the place in sequence of this rate line collection within the ``rateTable``

* The mandatory ``startValidUsagePeriod`` attribute which defines the start time for the validity of this rateLineCollection

Each rateLineCollection object contains one or more ``rateLine`` objects. :numref:`rateLine` provides the UML class representation of the ``rateLine`` object. A ``rateLine`` is defined as a specific rate element of a rate line collection within a specific rate table.

.. _rateLine:

.. figure:: /_static/images/rateLine.png
   :alt: UML model representation of the rateLine object
   :width: 80%
   :align: center

   UML model representation of the ``rateLine`` object

The ``rateLine`` object has the following attributes:

* The mandatory ``sequence`` attribute which is specified as an incrementing integer which is the ordered sequence of this ``rateLine`` instance within the ``rateLineCollection``. Used to define the order of operation of multiple rate lines
* The mandatory ``type`` attribute which indicates the nature of the rate line. Permissible values are: ``flatRate``, ``incrementingRate``, ``flatRateTier`` and ``perUnit``
*	The optional ``description`` attribute which provides a free-text description associated with this ``rateLine``
*	The optional ``durationStart`` attribute, which indicates the start time for the applicability of the specific rate line, generally with respect to the start of the parking or other mobility session. e.g., the start of a time-based tier charge rate
*	The optional ``durationEnd`` attribute, which indicates the end time for the applicability of the specific rate line, generally with respect to the start of the parking or other obility session. e.g., the end of a time-based tier charge rate
*	The optional ``incrementPeriod`` attribute, the time period for incrementing the rate line charge. If set to the same as the duration of the period between the ``durationStart`` and ``durationEnd`` the increment will occur once per period, i.e., a flat rate time-based tier charge rate. The duration is defined in integer minutes
*	The mandatory ``value`` attribute which indicates the value of the fee to be charged in respect of this rate line. Defined in applicable currency with 2 decimal places
*	The optional ``minValue`` attribute which is the minimum monetary amount to be applied in conjunction with use of this rate line collection, regardless of the actual calculated value of the rate line. Defined in applicable currency with 2 decimal places
*	The optional ``maxValue`` attribute which is the maximum monetary amount to be applied in conjunction with use of this rate line collection, regardless of the actual calculated value of the rate line. Defined in applicable currency with 2 decimal places
*	The optional ``usageCondition`` attribute which indicates conditions on the use of this rate line. Permissible values are: ``fixedDuration``, ``fixedNumber``, ``once``, ``unlimited``

About Consultations
*******************

This section of the Data Model is designed to permit basic information relating to a consultation to be coded and exchanged.

.. note::

   The expectation, subject to secondary legislation following consultation, is that information on consultations would be made at the time of the notice of proposals (i.e. commencement of consultation). There is no expected requirement for the provision of information concerning consultations at other points in the lifecycle, at this time.

:numref:`consultation-related` provides the UML class representation of the ``consultation`` related objects.

.. _consultation-related:

.. figure:: /_static/images/consultation-related.png
   :alt: UML model representation of the consultation related objects
   :width: 80%
   :align: center

   UML model representation of the ``consultation`` related object

The ``consultation`` object has numerous attributes:

*	The mandatory ``consultationName`` attribute refers to the name of the TRO that the TRA has published under consultation 
*	The mandatory ``endOfConsultation`` attribute is a date / time indicating the end of the Consultation period 
*	An optional free-text string with the ``howToComment`` attribute specifying how to comment on the proposal which is the subject of the consultation 
*	An optional free-text string with the ``localReference`` attribute for an identifier for the consultation defined by the Local Authority 
*	An optional free-text string with the ``pointOfContextEmail`` attribute giving the email address location to support receipt of comments / objections to consultation proposals 
*	An optional free-text string with the ``pointOfContactAddress`` attribute giving the postal or office address location to support receipt of comments / objections to consultation proposals
*	An optional date / time field with the ``startOfConsultation`` attribute giving time and date of the start of the consultation period 
*	An optional free-text string with the ``statementOfReason`` attribute giving the Statement of Reason 
*	An optional free-text string with the ``urlAdditionalInformation`` attribute giving the web address (URL) for where to find further information related to the consultation 

Extending the Data Model
************************

The Data Model (and associated schema) defines categorised lists of short name terms that represent different concepts and choices. Examples of these lists include regulation type, vehicle type, permit type, etc.

It is intended that the Data Model covers a broad spectrum of choices covering a vast majority of TROs to be produced in the future.

Proposed Statutory Guidance and best practice documentation will strongly encourage reuse of standardised concepts. However, it is prudent that the Data Model also supports the ability to define new or unusual concepts.

Therefore, the ability to support additional enumerations would be prudent for several of the enumerated lists existing in the Data Model. These include:

*	``permitType`` (implemented in 3.4.0)
*	``payloadType`` (to be implemented)
*	``vehicleUsageType`` (implemented in 3.4.0)
*	``emissionsClassificationEuroType`` (implemented in 3.4.0)
*	``fuelType`` (to be implemented)
*	``vehicleEquipmentType`` (to be implemented)
*	``vehicleType`` (to be implemented)

To maintain the simplicity in the Data Model, it is easiest to add an "other" enumeration value to each of the enumerated lists stated. For ``regulationType``, there is the off-list regulation mechanism referred to earlier in the guide that will handle additional enumerations.

In instances where the 'other' enumeration is used further information shall be required. In each case the user (the Local Authority) would be required to provide a unique enumeration short name (distinct from short names that appear in the Data Model), plus a robust definition.

The use of 'other' on its own shall not be permitted.

Rather than adding this extension mechanism to each relevant enumerated list in the Data Model, a generic extension mechanism has been added to the model.

:numref:`extensionEnumeration` provides the UML class representation of the ``extensionEnumeration`` object.

.. _extensionEnumeration:

.. figure:: /_static/images/extensionEnumeration.png
   :alt: UML model representation of the extensionEnumeration object and related enumeration
   :width: 80%
   :align: center

   UML model representation of the ``extensionEnumeration`` object and related enumeration

The extensionEnumeration object has numerous attributes: 

*	The ``definition`` attribute is a string for the complete definition of the enumeration
*	The ``enumeratedList`` attribute reflects the list which is being extended
*	The ``definition`` attribute is a free-text string giving complete definition for the enumeration

.. code-block:: json
   :caption: JSON-encoding demonstrating the use of ``extensionEnumeration``

   {
      "negate": false,
      "vehicleCharacteristics": {
         "vehicleUsage": "other",
         "vehicleUsageTypeExtension": {
            "definition": "srteet cleaning, example",
            "enumeratedList": "vehicleUsageType",
            "value": "cleaner"
         }
      }
   }
