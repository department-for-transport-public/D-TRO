What is a 'Full' D-TRO Record?
==============================

When a TRA submits a new D-TRO record care is required to ensure that the record contains all necessary information - this is the responsibility of the TRA. The D-TRO Service will undertake various forms of validation to ensure that requirements have been met and the D-TRO record can be accepted.

.. note::
    The test of what constitutes a D-TRO record that contains all essential elements and therefore can be considered to be a 'full' record is subject to review and learning from prototyping. This section is therefore likely to change with new releases.

Valdation Rules
***************

Two primary forms of validation test are foreseen:

* Schema validation - this is a set of technical tests to ensure that that the data and the structure of the submitted D-TRO record conforms to the requirements of the Data Model and schema. These tests will check that mandatory elements of the Data Model exist in the D-TRO record; that additional elements not part of the Data Model are not provided; that supplied data conforms to prescribed data types (e.g. that a attribute typed as a datetime in the Data Model is actually a valid datetime); that enum types are valid, etc.

* Semantic validation - this is a further set of technical tests cannot be enforced by schema validation. Examples include, but are not limited to:
    * The mandatory ``traCreator`` attribute of the ``source`` object contains not only an integer value, as required by schema validation, but the value given matches a value in the SWA code list and corresponds to the sender's TRA SWA code (e.g., '116' for Bristol City Council).
    * Where start and end datetimes are provided, that the start datetime occurs before the end datetime

A set of validation tests have been created, which are summarised in the tables below. A detailed document of the validation rules is available in the GitHub repository.

**Appropriateness**-related rules help keep the data within the D-TRO service as relevant as possible and does not contain biases, which make them unfit for use by the Software Providers.

.. raw:: html
    
    <div class="table">

.. csv-table:: Appropriateness-related validation rules
    :file: ../table_data/appropriateness_related_validation_rules.csv
    :header-rows: 1

.. raw:: html

    </div>

**Completeness** rules ensures that the Data Model provides comprehensive information for the digitalisation and analysis of TROs.

.. raw:: html
    
    <div class="table">

.. csv-table:: Completeness validation rules
    :file: ../table_data/completeness_related_validation_rules.csv
    :header-rows: 1

.. raw:: html

    </div>

**Accuracy**-related rules ensure the degree of confidence that can be placed in the data from the D-TRO service. Data must be sufficiently accurate as standardised data to support the defined use cases and avoid material distortion in the central storage system.

.. raw:: html
    
    <div class="table">

.. csv-table:: Accuracy-related validation rules
    :file: ../table_data/accuracy_related_validation_rules.csv
    :header-rows: 1

.. raw:: html

    </div>