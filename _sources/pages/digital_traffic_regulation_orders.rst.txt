Digital Traffic Regulation Orders
=================================

Introduction
************

The Department for Transport (DfT) is modernising the regulatory framework for Traffic Regulation Orders (TROs) (Traffic Management Orders in London) made under the Road Traffic Regulation Act 1984.

The new regulatory framework will, subject to necessary legislation coming into force, mandate that traffic authorities in England publish TROs as open data in a standardised and digital format that anyone can access, use and share. The standardised digital format will be based on the Digital TRO (D-TRO) Data Model that is described in this document – called the Data Model throughout the remainder of this document. The Data Model is intended to be a free resource for all. The Data Model is candidate in nature and may be subject to change without notification.

Taking into account the needs arising from the UK Industrial Strategy and recognising the requirements that will emerge from the deployment of Connected and Automated Vehicles (CAVs) the Data Model provides an initial framework for how the data and information relating to TROs can be formed in the future. Availability of this Data Model, will support the move towards TROs being easily accessible to the public whether using apps or driving connected vehicles.

The Automated Vehicles Act 2024 :ref:`[1] <ref-ava>` (section 93) provides the capability for the Secretary of State, through regulation, to require Traffic Regulation Authorities :ref:`[2] <ref-tras>` (TRAs) to provide information on a defined set of Traffic Regulation Measures :ref:`[3] <ref-tr_measure>`, in a specified manner and form, to be provided in accordance with a specified model, standard or set of specifications. These will be the D-TRO Data Specifications including the D-TRO Data Model and are expected to be specified under secondary legislation.

The content of the Data Model has been developed by Harrod Booth Consulting Ltd with grateful support from numerous organisations.

The report presents the Data Model, Release 3.4.0, with a series of larger updates including:

* Use of camelCase structure to all objects and properties within the Data Model.
* Additional objects and attributes added in response to the expected functional needs resulting from Secondary Legislation
* Additional properties and attributes added or updated in response to the stakeholder comments.
* A few attribute datatypes have been changed.

* Extension Enumeration capabilities have been added for:
    * permitType: part of permitCondition
    * emissionClassificationEuroType: part of emissions
    * vehicleUsageType: part of vehicleCharacteristics.

* diversionRouteType enumeration added

Additionally, further changes have been made beyond the scope of the Data Model:

* Use of ``X-App-Id`` and ``X-Correlation-Id`` headers have been removed, as these are automatically inferred from the actor's access token.
* All ``/rules`` endpoints and the ``/schema/{id}`` endpoint have been retired due to redundancy.

About This Document
*******************

This document outlines the data modelling concepts defined to help support the definition and exchange of information relating traffic regulations, particularly within the scope of TROs as specified under UK legislation (notably the Automated Vehicles Act 2024, section 93).

As explained in the introductory sections of this document the Data Model contained and described here is by its nature developmental and evolutionary. Users, developers and stakeholders are encouraged to review and use this Model and provide feedback and any identified issues to the DfT.

Any user feedback can be provided:

* By direct comment on the D-TRO Public GitHub repository: https://github.com/department-for-transport-public/D-TRO

* By contacting the Department for Transport:

.. raw:: html

    <div class="admonition custom">
        <p>Name: John Cooper</p>
        <p>Telephone Number: 07825 864288</p>
        <p>Email Address: john.cooper@dft.gov.uk</p>
    </div>   

The existing informational content of the existing legacy TROs in the UK is diverse, rich, and in some cases somewhat incompatible with a more limited, regularised approach defined in this specification for digitising traffic regulations.

This Data Model has been the subject of ongoing development, validation and piloting. It is not expected to be error-free or covering the full spectrum of TROs - but it is expected to support the digital encoding of a significant majority of TROs.

This document is primarily intended to be read by technologists who are familiar with data modelling concepts, especially use of UML, as the contained diagrams are expressed in this notation format.

As this specification evolves it is expected that additional context material will be made available to support ease of access to key concepts and principles for non-technical readers.

TROs in Context
***************

TROs are UK legislative instruments used by highways authorities to implement changes on the road network. They are used for such diverse purposes as:

* managing the use of the road with measures such as parking restrictions and speed limits,
* allowing temporary closures for street parties and roadworks, and
* experimental changes.

Innovations in transport and increasingly data-supported mobility are emerging. Foundational data, such as access to digital Traffic Regulation Measures, supports improved use of our transport infrastructure, forming an important element of this digital journey, to enhanced mobility services.

The **Local Transport Data Discovery Report** :ref:`[4] <ref-local_transport_data_discovery_report>`, published by DfT in 2018, explored the transport data held by Local Authorities. Its key findings relating to TROs were that:

* TRO data is difficult and time consuming to access, clean and process,
* TRO data is not in a standardised, machine-readable format,
* TROs lack of a centralised point of reference,
* Private sector organisations are being forced to collect TRO data manually, and
* The current process for amending and implementing a TRO is labour intensive, time consuming, and costly.

The report recommended that the DfT sponsor data projects which encourage and foster better local authority transport services, including streamlining and digitising TROs.

As a result, several projects have followed, and in combination the development of this Data Model. These projects were as follows:

**Discovery project** (2019) into TROs processes and how this data is made available and used across the country [undertaken by the British Parking Association, Ordnance Survey and Geoplace]. Three significant outputs resulted:

* `User Research <https://www.geoplace.co.uk/documents/10181/110496/TRO_Discovery_Summary_Report_GeoPlace_August_2019/99c06daa-6444-4328-9970-f2cb02288674>`_
* `User Guide <https://www.britishparking.co.uk/write/Documents/TIR%20Board/BPA_TRO_Best_Practice_Guide_2019.pdf>`_
* `Draft Data Model <https://www.britishparking.co.uk/write/Documents/TIR%20Board/BPA_TRO_Data_Model_User_Guidance.pdf>`_

DfT-commissioned **Policy Alpha** (2019-20) [undertaken by PA Consulting] to identify improvements to the legislative process in England. Strongly recommended development of the TRO data model as a matter of priority.

Through 2019-20 DfT worked with several local authorities to undertake a **first validation of the TRO Data Model** with 8 Local Authorities and market-leading solution providers.

DfT commissioned the **TRO Data Model Alpha** [undertaken by Valtech] (2020-21) giving recommendations on expected market deployment of the TRO data model, and how TRO data from LAs would be made available.

In 2021-22 there was further **data model validation** and enhancement using real-world Data Model Validation of TROs from four local authorities.

In 2022 DfT undertook a **Policy Consultation** concerning the assessment of changes in TRO legislation.

For more information concerning TROs see the British Parking Association's (BPA) Best Practice Guide for TROs:

https://www.britishparking.co.uk/write/Documents/TIR%20Board/BPA_TRO_Best_Practice_Guide_2019.pdf

In 2023, Informed Solutions conducted a **Service Alpha** developing the 3.1.1 version of the Data Model and conducting pre-production Alpha testing with a small set of TRAs involved.

The **D-TRO Beta project** is currently underway, conducted by PA Consulting, with main updates on the Data Model proposed being the implementation of records management, live reporting of TTROs and enabling more effective location referencing.

The **Automated Vehicles Act 2024** (section 93) received Royal Assent in May 2024. It provides the capability for the Secretary of State through regulation to require TRAs to provide information on a defined set of TROs, in a specified manner and form, to be provided in accordance with a specified model, standard or set of specifications.

High-Level Outline of the D-TRO Service
***************************************

The Digital Traffic Regulation Order (D-TRO) service

**IS FOR** Traffic Regulation Authorities, road network data consumers and Central Government

**WHO WANT** to:

1. improve existing services (e.g., satnav routing)
2. provide new services
3. reduce enforcement and processing costs to highway authorities
4. reduce congestion, and
5. provision of the digital infrastructure for connected and automated vehicles.

**THIS SERVICE WILL BE** an API-first digital platform to store and share digital TRO information, enabling the above stated benefits and modernise enforcement on the road network. It is not foreseen as a service to support the creation and initial publication of TROs.

Other Documents and Artefacts
*****************************

This User Guidance is just part of the documents and artefacts that are available in connection to the D-TRO Service.

.. figure:: /_static/images/fig1.png
   :alt: Documents and artefacts supporting the D-TRO Service
   :width: 80%
   :align: center

   Documents and artefacts supporting the D-TRO Service

All the latest versions of documents and other artefacts of this release are listed in GitHub at https://github.com/department-for-transport-public/D-TRO.

Acknowledgements
****************

This document, and the Data Model it describes, draw upon the outputs of earlier projects and has been prepared with the kind support of notably the DfT, Bedford Borough Council, City of York Council, Essex County Council, Transport for the West Midlands, Buchanan Computing, Valtech, Informed Solutions, PA Consulting plus other organisations. The report has been authored by Harrod Booth Consulting Ltd and PA Consulting, under contract to the DfT.

Non-Proprietary Terms
*********************

There are numerous companies currently servicing the TRO market and it is anticipated that this will increase as TROs become more important in the future of transportation.

The Department for Transport do not endorse any particular companies and non-proprietary terms are used throughout this Guidance.

Disclaimer
**********

The Data Model is developmental and experimental in nature. It cannot be considered to be complete or error-free. It should not be viewed as stable and may be subject to alteration without notice.

Licensing
*********

The material contained within this document is subject to copyright by the DfT and is published under the Open Government Licence v3.0. Further details of the licence can be found at http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/.

The DfT are sharing this document and the Data Model it contains to support iteration and development by the DfT.
