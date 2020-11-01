# appointment-api
 
# Github repository
# https://github.com/JoaoWesley/appointment-api.git

## How to run
 - On the project root folder run npm install then npm run dev
 - Then the application will be available at: http://localhost:3001

### Linter
 - Run the command `npm run lint` to execute lint on the project

### Tests
  - Run the command `npm run test` to execute all the tests on the application.

# Dependencies

## Backend
- NodeJS: JavaScript runtime
- Express: Web framework
- Body-parser: Receive request body 
- Moment: Date and time manipulation
- Moment-timezone: For working with timezones
- Nodemon: Hot reload
- DotEnv: Load environment variables
- FirebaseAdmin: Interact with firebase resources 

## Tests
- Mocha: Test framework for javascript
- Chai: Assertion library

# API DOCUMENTATION

## Endpoint

  http://localhost:3001

## Requisições

### - Get events

This request return all events between two dates  

#### HTTP Method

    GET

#### URL

    /event/?startDate=2019-10-10&endDate=2020-11-02

#### Parameters

    {startDate} - Initial date
    {endDate} - Final date

The date can have offset following iso 8601 pattern if none is provided UTC will considered default.

#### Response

````json
  [
    {
        "duration": 30,
        "dateTime": "2020-01-01T13:00:00Z"
    },
    {
        "dateTime": "2020-01-01T18:00:00Z",
        "duration": 30
    },
  ]
````

### - Get free slots

Returns all free slots available from a given date

#### HTTP Method

    GET

#### URL

    /slot?timeZone=America/Sao_Paulo&date=2020-11-01

#### Parameters

    {timeZone} - Timezone to the given date
    {date} - Final date

The date can have offset following iso 8601 pattern if none is provided UTC will be considered default.

#### Response

````json
  [
    {
        "duration": 30,
        "dateTime": "2020-01-01T13:00:00Z"
    },
    {
        "dateTime": "2020-01-01T18:00:00Z",
        "duration": 30
    },
  ]
````

### - Create event

This request creates a event 

#### HTTP Method
    POST

#### URL

    /event

#### Parameters

    {dateTime} - Date and time to create event, offset can be provided inside the string following the ISO 8601 format, otherwise UTC will be considered default.

This Parameter must be sent over as json in the request body, see below:

````json
  {
    "dateTime": "2020-02-01T20:30:00-03:00"
  }
````

#### Response

````json
  {
    "id": "oOHj7LGNfij2RUBH9c7E"
  }
````