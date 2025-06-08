TRO-Modelling Key Concepts
==========================

Background
**********

Data modelling is by its nature open to interpretation, different approaches and may reflect the personal preferences of those developing it.

DfT agreed that the modelling approach would seek to achieve several aims:

* Provides as simple a structure as is possible to model a wide spectrum of traffic regulation concepts as is practicable
* Where appropriate, be aligned to internationally recognised standards (see section :ref:`alignment-with-other-standards`).
* Based on an appropriate and relevant data structure.
* Compatible with other standards where possible.
* Be as open and accessible as possible.

The management and exchange of traffic regulations and TROs is a strengthening need, that will support the digitisation of traffic, vehicle automation and enhanced data-centric transport and mobility services.

Transport and mobility include both the short local and cross-border long-distance journey. There is a need to develop common national mechanisms to ensure the efficient and safe movement of vehicles and road users. Commonality is needed to support travel between jurisdictions, but also the consistent sharing and use of TRO data.

At present, although international conventions support the free movement of road traffic and general conditions for safe common road use, and other road features such as common aspects of road signs, there are no existing common technical standards for how to encode and model road traffic regulations.

The Data Model is the first national recognised effort to support such encoding, expressly for the purpose of exchanging details concerning road traffic regulations, their location and features as well as the traffic impact that they create. The Data Model is expected to form part of the “with a specified model, standard or set of specifications” specifications as mentioned in the Automated Vehicles Act 2024, section 93(8).

General Concepts
****************

TROs are complex and have been specified by highway authorities (and now TRAs) over an extended period, with quite some variation of style and approach. Developing the Data Model is challenging and therefore choices and simplifications are needed. The Data Model has been subject to modification and enhancement through a series of projects and also in response to comments and issues raised through validation undertaken by some Local Authorities and their existing TRO software service providers.

Onward reviews and use of this model will identify omissions and exceptions, but the design principles adopted seek to provide clear data modelling constructs to cover a range of key concepts.

When considering TROs there are various aspects that could be the subject of modelling:

* The legal Order itself, as made by the TRA
* Road network features (instantiated by the Order) that control the movement of traffic, use of the highways, etc, which includes the modelling of the traffic effect of the regulation for that feature
* Modelling of road traffic signs
* Modelling of road markings and other traffic management measures

DfT focus for the Data Model has been to develop a firm technical basis to support the encoding, exchange, storage and distribution of details of the legal contents of the TRO itself.

The scope of the Data Model covers all different forms of Order (permanent, temporary, experimental and notices) for both moving and stationary traffic.

Design Principles
*****************

The following design principles have reflected the shaping of the Data Model:

* The scope of the Data Model shall cover all different forms of Order (permanent, temporary, experimental and notices) for both moving and stationary traffic.
* The Data Model will seek to include the full semantic contents of (a largely majority of) TROs. This notes that there is wide variety in the form and content of existing TROs, and attempting to model all content and options is both impractical and counter-productive to the intent of creating standardised digital TRO records based on a common data structure as defined by the Data Model.
* The Data Model will seek to simplify data structures as much as practical.
* The Data Model design will be cognisant of user needs in terms of provisioning of digital TRO records, the most likely use cases for consumption and reuse of digital TRO records, and supporting DfT policy objectives, as well as supporting automated validation.
* Where appropriate, the Data Model will align, and reuse concepts specified in appropriate European or International Standards.
* The Data Model shall be extensible. The current landscape, format and content of ‘made’ TROs contains wide diversity. As part of the process of digitalising and regularising TRO information in the form of D-TRO records, it is essential to try to bound possible options and characteristics in an extensive, inclusive but ultimately limited way. It is important to provide technical mechanisms within the structure of the Data Model and its implementation in the D-TRO service to enable some of the key vocabulary to be extended in an ad-hoc user driven way.

It is a matter of service governance that use of the extension mechanism, mentioned above, should only be used when absolutely necessary. This will ensure that the consistency of the collected set of D-TRO records is maintained. However, legitimate need to extend values beyond the ‘hard coded’ values in the Data Model is essential. Regular use of extended items should raise the need for their consideration of inclusion in a revision of the Data Model – as part of the expected regime of the Data Model governance.

* The Data Model shall be designed and represented in a manner that aligns with Government policies and is portable, and suitable for long term maintenance. 

.. _user-and-policy-driven-needs:

User and Policy-Driven Needs
****************************

As reflected in the design principles, above, ongoing work is reviewing user needs for digital TRO records, and therefore the foreseen deployment of the D-TRO Service and the Data Model.

This section does not seek to replicate the wide spectrum of needs but highlights a handful of considerations that shape the way in which the Data Model is expected to be used.

DfT, through the previous Service Alpha and current Beta Project, are reviewing and enhancing user needs analysis, prototyping the D-TRO Service, and reviewing the Data Model. Therefore, updates and changes may occur.

The DfT's preferred option is to establish a centralised service which receives digital TROs (D-TROs) from TRAs, stores these records, and exposes data services for consumers to request distribution of D-TRO records. The Data Model forms the technical baseline for D-TRO records.

Due to the variety of different forms of TRO and notices permitted under the legislation, there is a need to define in future legislation and statutory guidance when in the lifecycle of orders and notices the TRA will be required to provide a D-TRO record to the D-TRO Service. The current expectation is that the following Reporting Points are needed – see :numref:`fig2`.

.. _fig2:

.. figure:: /_static/images/fig2.png
   :alt: D-TRO Reporting Points
   :width: 80%
   :align: center

   D-TRO Reporting Points

These Reporting Points are reflected in the Data Model in an enumerated list named ``orderReportingPointType`` :ref:`[5] <ref-order_reporting_type>` .

It is not foreseen that the D-TRO Central Service will in the future retain a full, growing library of all D-TROs submitted over time, but retain recently submitted D-TRO records and those that remain current. The Service is also expected to hold future D-TRO records, and those that have recently expired, or replaced by a newer amended version, or revoked. The precise definition of this Service is currently being defined through this Beta project, with initial version for a records management capability being implemented.

Version 3.4 introduces additional objects and attributes added in response to expected functional needs resulting from the Secondary Legislation.

.. note::
   Many of these changes apply to Made orders (whether on initial making, amendment or revocation). The following ``orderReportPoint`` types, as reflected in :numref:`fig2`, are included in the list of Made orders

* ``experimentalAmendment``
* ``experimentalMakingPermanent``
* ``experimentalNoticeOfMaking``
* ``experimentalRevocation``
* ``permanentAmendment``
* ``permanentNoticeOfMaking``
* ``permanentRevocation``
* ``specialEventOrderNoticeOfMaking``
* ``ttroTtmoByNotice``
* ``ttroTtmoExtension``
* ``ttroTtmoNoticeAfterMaking``
* ``ttroTtmoNoticeOfIntention``
* ``ttroTtmoRevocation``
* ``variationByNotice``

These are referred to as “Made Orders” in this document.

Choice of Technologies
**********************

The Data Model has been modelled in UML (Unified Modelling Language) following Model Driven Architecture design principles. Sparx Systems Enterprise Architect, a visual modelling and design tool, has been used to develop and refine the Data Model.

A QEA extract is provided specific to Enterprise Architect that contain the entire UML model, including diagrams, elements, and relationships. This will allow users who have Enterprise Architect software to directly open, view, modify, and work with the model in the same environment it was created. An XMI extract is also provided to allow import of the Data Model into other modelling tools or software applications that support the XMI format (extracts with XMI 1.1 and 2.1 are available), enabling greater interoperability.

JavaScript Object Notation (JSON) is used for definition of schema and the use of REST APIs preferred to meet GDS best practice outlined at https://www.gov.uk/guidance/gds-api-technical-and-data-standards. 

.. _alignment-with-other-standards:

Alignment with Other Standards
******************************

This document and the Data Model reuse some well-known, widely deployed model fragments that appear in several European and International standards:

* The ``condition`` sub-model is specified in both “TN-ITS” CEN/TS17268:2018 and 'APDS' ISO/TS 5206-1:2023,
* The ``timeValidity`` sub-model is an adaptation of the 'timeValidity' package specified in “DATEX II” CEN/TS 16157-7:2018,
* The ``vehicleCharacteristics`` sub-model specified in 'DATEX II' CEN/TS 16157-7:2018,
* The ``rates`` sub-model is specified in “APDS” ISO/TS 5206-1:2023.

However, the Data Model has been reviewed for application in the UK, and in some cases the values appearing in the lists contained the Data Model have been adjusted with additions, deletions and adjustments when compared to the Standards content.

The Data Model supports conditions that relate to the vehicle type, vehicle usage, vehicle dimensions, fuel type, etc. These condition lists were reviewed from the viewpoint of normal practice in the UK by experienced practitioners. This has resulted in a profiling of these condition types and lists that are more suitable for current UK practice.

Location Referencing
********************

One of the technical aspects within the D-TRO Beta Data Specification which requires further clarification and resolution, is how to systematically encode information relating to the spatial location and positioning used within TROs. Currently, an approach has been proposed to shape the data structures that are needed to support it within the D-TRO Beta Data Specification and its Data Model.

In order to make future digital TROs useable to the widest set of stakeholders and applications the provision of a coded location that is machine-interpretable and can be related to specific spatially coded locations on digital maps is considered essential.

Following stakeholder comment, DfT has revised the proposed recommended approach. Given the need to reduce barriers to uptake during the D-TRO Beta project phase, no singular preferred approach is mandated. Therefore, for example, a speed limit TRO provision can be represented either by linear road centreline/reference line features (polyline) or by use of a polygon. Similarly, kerb line regulations can be represented as a polyline, a polygon or both. This approach will be reviewed during the D-TRO Beta project, taking on board feedback primarily from data consumers concerning the useability of mixed approach data.

DfT prefers the use of polygons, but these are not mandatory.

Some forms of TRO do require special treatment to ensure that the data can be correctly interpreted. This special treatment applies to:

* Gate/point locations
* Directional regulations (such as no entry, one-way streets, turning movements, etc.)

There is a need to provide clear guidance and a common approach to enable TRAs to code TRO locations.

Single consolidated or other TROs may represent a range of measures (Provisions) impacting different locations – this approach should support TRAs identifying and encoding “regulated place” in a manner that they consider appropriate. The approach aims to limit specific coding rules to a practical minimum, enabling both alignment with the more commonly used existing practice whilst counter-balancing use of a limited number of coding mechanisms which will aid greater commonality and interoperability of data.

In general, if a TRO regulation is identified as being effective at two or more distinct locations, each location should be treated as a separate "regulated place", as laid out in the D-TRO Data Specification. The design approach aims to address the wide spectrum of different forms of shape that TRO regulations can take.

The standardised approach:

* should not be tied to a specific form of reference base map data set.
* shall use a widely understood and supported standardised data format.
* should be cognisant of the level of effort required to achieve it.
* should support the needs of identified use cases, so far as these are defined.
* should separate the principles of what is being encoded, from the actual IT-centric coding mechanism itself.

The D-TRO Beta Data Specification uses of The OSGB36 / British National Grid Coordinate Reference System (ESPG:27700).In the current D-TRO Private Beta Data Specification the Well-Known Text (WKT) geometry standard - ISO/IEC 13249-3:2016 shall be used for the encoding of geometric coordinates.

There is no support in the D-TRO Beta Data Specification to enable the upload of scan or electronic version of TROs, schedules, or associated maps.

.. note::
    DfT is reviewing the approach used for the use of standardised encoding and file formats for geospatial information. This may result in changes or additions to future releases of the data specification.

Standardised Terms and Definintions
***********************************

The transition to digital TROs necessitates the standardisation of terms and definitions to ensure consistency, interoperability, and clarity across different TRAs and platforms.

Standardisation becomes increasingly important to ensure consistency and interoperability by facilitating a uniform understanding of traffic regulations across various regions and platforms. This uniformity is essential for the development of interoperable digital systems that can communicate and integrate seamlessly. For instance, a term like "no-stopping" (kerbsideNoStopping) should have a universally accepted definition to avoid discrepancies between different technology providers used by TRAs, navigation systems, and other traffic management applications.

Clear and consistent definitions in digital TROs help in maintaining legal clarity. Inconsistent or ambiguous terms can lead to misinterpretation of the regulations, resulting in legal challenges and non-compliance.With D-TROs also supporting the rise of intelligent transport systems, automated vehicles, and advanced navigation aids, this depends heavily on the availability of standardised digital information. For these technologies to function correctly and interact with human drivers and existing infrastructure, they need access to precise and consistent regulatory data.

Recognising the critical need for standardisation, an assessment is currently underway to collate and analyse the varied uses of terms across different sources relevant to TROs. This comprehensive assessment involves examining the language used in existing TRO documents from multiple authorities, reviewing legislative texts, and consulting with stakeholders in the Transport Technology Forum and wider. The goal is to identify inconsistencies and ambiguities in the current terminologies and to propose a harmonised set of definitions that can be adopted universally.

Further information on this topic is available on the issues section of the D-TRO Public GitHub repository at https://github.com/department-for-transport-public/D-TRO.

About Data Types in the Data Model and JSON Schema
**************************************************

As you work through this user guide you will see attributes that are specified in the different objects are assigned specific data types. These help a developer know the whether the attribute gains its potential values from the entries in an enumerated list (such as vehicleType), or is a date, a date-time, a web address (URI – a Universal Resource Identifier), string (for free text), etc.

The Data Model is specified using a convention Unified Modelling Language (UML). From this model we generate a JSON (JavaScript Object Notation) schema which provide the template for exchangeable structured data.

In a limited number of cases the data type shown in the Data Model is translated into a data type that conforms to the JSON specification. These translations are as follows:

.. raw:: html

   <div class="table">

.. table:: UML to JSON Schema Mapping
   :widths: auto

   +---------------+-------------------------------------------------------------+
   | In UML Data   | In the JSON schema                                          |
   | Model         |                                                             |
   +===============+=============================================================+
   | dateTime      | type: string                                                |
   |               |                                                             |
   |               | format: date-time                                           |
   +---------------+-------------------------------------------------------------+
   | date          | type: string                                                |
   |               |                                                             |
   |               | format: date                                                |
   +---------------+-------------------------------------------------------------+
   | time          | type: string                                                |
   |               |                                                             |
   |               | format: time                                                |
   +---------------+-------------------------------------------------------------+
   | anyURI        | type: string                                                |
   |               |                                                             |
   |               | format: uri                                                 |
   +---------------+-------------------------------------------------------------+
   | email         | type: string                                                |
   |               |                                                             |
   |               | format: email                                               |
   +---------------+-------------------------------------------------------------+
   | decimal       | type: number                                                |
   |               |                                                             |
   |               | multipleOf: 0.01 (or 0.1)                                   |
   +---------------+-------------------------------------------------------------+
   | integer       | type: number                                                |
   |               |                                                             |
   |               | multipleOf: 1                                               |
   +---------------+-------------------------------------------------------------+
   | duration      | type: string                                                |
   |               |                                                             |
   |               | Regex to enforce ISO 8601-1 duration format                 |
   +---------------+-------------------------------------------------------------+

.. raw:: html

   </div>
