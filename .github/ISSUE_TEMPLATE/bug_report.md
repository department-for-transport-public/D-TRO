---
name: Bug report
about: Create a report to help us improve
title: ''
labels: ''
assignees: ''

---

1. Provide full details of the endpoint call with parameters and body including the payload being used, e.g. 
 curl --location 'https://dtro-integration.dft.gov.uk/v1/search' \
            --header 'X-Correlation-ID: <uuid>' \
            --header 'Content-Type: application/json' \
            --header 'Accept: application/json' \
            --header 'Authorization: Bearer <Token>' \
            --data '{
             "queries": [
                  {
                    "publicationTime": "2024-09-19 T13:46:00"
                  }
                ],
                "page": 1,
                "pageSize": 50
            }'
2. Provide full error message from D-TRO application, e.g.

  {
          "message": "Internal Server Error",
          "error": "An unexpected error occured: Object reference not set to an instance of an object."
        }
3. Provide the date and time of the API call to enable us to search to logs for more information
4. Provide expected and actual behaviour
5. Provide steps to reproduce
6. Provide what version of Schema you are using
7. Provide any additional context, if applicable

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Desktop (please complete the following information):**
 - OS: [e.g. iOS]
 - Browser [e.g. chrome, safari]
 - Version [e.g. 22]

**Smartphone (please complete the following information):**
 - Device: [e.g. iPhone6]
 - OS: [e.g. iOS8.1]
 - Browser [e.g. stock browser, safari]
 - Version [e.g. 22]

**Additional context**
Add any other context about the problem here.
