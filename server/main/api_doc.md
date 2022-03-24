# Alert Me API Documentation

## Endpoints:

List of available endpoints (server for user and report):

- `POST /users/register` 
- `POST /users/login` 
- `GET /reports/weathers` 
- `GET /reports/weathers/:id` 
- `POST /reports/weathers` 
- `GET /events/earthquake/:id` 
- `POST /events/earthquake`
- `GET /reports/earthquakes`
- `GET /reports/earthquakes/:id`
- `POST /reports/earthquakes`
- `DELETE /reports/earthquakes/:id`

## 1. POST /users/register

Description:
Create New User

Request:
- body

```json
{
  "email": "string (email format)",
  "password": "string"
}

```

_Response (201 - Created)_

```json
{
  "message": "string"
}

```

_Response (400 - Bad Request)_

```json
{
  "message": "Email Is Required!"
}
OR
{
  "message": "Email Has Been Taken!"
}
OR
{
  "message": "Invalid Email Format!"
}
OR
{
  "message": "Password Is Required!"
}
```

&nbsp;

## 2. POST /users/login

Description:
User Login with email and password

Request:
- body
```json
{
  "email": "string (email format)",
  "password": "string"
}
```

_Response (200 - OK)_
```json
{
  "access_token": "string"
}
```
_Response (401- Failed Login)_

```json
{
  "message": "Invalid email/password!"
}
```

&nbsp;

## 3. GET /reports/weathers
Description:
Get all weather reports for last 7 days

_Response (200 - OK)_
```json
[
    {
        "id": 1,
        "status": "Aman",
        "description": "test",
        "photoUrl": "https://cdn.iconscout.com/icon/free/png-256/weather-2191838-1846632.png",
        "coordinate": "-12.94,106.94",
        "temperature": 20,
        "uvi": 20,
        "pressure": 5,
        "humidity": 70,
        "windspeed": 6,
        "weatherMain": "test",
        "weatherDesc": "test",
        "weatherIcon": "https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png",
        "UserId": 1,
        "createdAt": "2022-03-19T07:38:26.126Z",
        "updatedAt": "2022-03-19T07:38:26.126Z",
        "User": {
            "id": 1,
            "email": "user1@gmail.com",
            "createdAt": "2022-03-19T07:05:41.282Z",
            "updatedAt": "2022-03-19T07:05:41.282Z"
        }
    },
    ...
]
```

&nbsp;

## 4. GET /reports/weathers/:id`
Description:
Get one weather report

Request:
- params
```json
  {
    "id": "string"
  }
```

_Response (200 - OK)_
```json
 {
        "id": "integer",
        "status": "string",
        "description": "string",
        "photoUrl": "string",
        "coordinate": "string",
        "temperature": "integer",
        "uvi": "integer",
        "pressure": "integer",
        "humidity": "integer",
        "windspeed": "integer",
        "weatherMain": "string",
        "weatherDesc": "string",
        "weatherIcon": "string",
        "UserId": "integer",
        "createdAt": "date",
        "updatedAt": "date",
        "User": {
            "id": "integer",
            "email": "string",
            "createdAt": "date",
            "updatedAt": "date"
        }
    }
```

_Response (404 - NOT DOUND)_
```json
{
  "message": "Weather Report Not Found!"
}
```

&nbsp;

## 5. POST /reports/weathers
Description:
Create new weather Report

Request:
- headers
```json
{
  "access_token": "string"
}
```

- body
```json
 {
    "status": "string",
    "description": "string",
    "photoUrl": "string",
    "coordinate": "string",
    "temperature": "integer",
    "uvi": "integer",
    "pressure": "integer",
    "humidity": "integer",
    "windspeed": "integer",
    "weatherMain": "string",
    "weatherDesc": "string",
    "weatherIcon": "string",
    "UserId": "integer",
}
```

_Response (201 - Created)_
```json
{
  "message": "Laporan telah berhasil dibuat"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Status Is Required!"
}
OR
{
  "message": "Description Is Required!"
}
OR
{
  "message": "Coordinate Is Required!"
}
OR
{
  "message": "Temperature Is Required!"
}
OR
{
  "message": "UVI Is Required!"
}
OR
{
  "message": "Pressure Is Required!"
}
OR
{
  "message": "Humidity Is Required!"
}
OR
{
  "message": "Wind Speed Is Required"
}
OR
{
  "message": "Weather Main Is Required!"
}
OR
{
  "message": "Weather Description Is Required!"
}
OR
{
  "message": "Weather Icon Is Required!"
}
OR
{
  "message": "Invalid Token"
}
```

&nbsp;

## 6. GET /events/earthquake/:id
Description:
Get one earthquake event (1 event can have multiple reports)

Request:
- params
```json
{
  "id": "string"
}
```

_Response (200 - OK)_
```json
{
    "earthQuake": {
        "id": "integer",
        "date": "string",
        "hour": "string",
        "dateTime": "date",
        "coordinates": "string",
        "magnitude": "float",
        "depth": "integer",
        "area": "string",
        "potensi": "string",
        "dirasakan": "string",
        "shakeMap": null,
        "createdAt": "date",
        "updatedAt": "date"
    },
    "reports": [
        {
            "id": "integer",
            "UserId": "integer",
            "EventquakeId": "integer",
            "status": "string",
            "description": "string",
            "photoUrl": "string",
            "coordinate": "string",
            "createdAt": "date",
            "updatedAt": "date"
        }
    ]
}
```

_Response (404 - NOT FOUND)_
```json
{
  "message": "Event not found"
}
```
&nbsp;

## 7. POST /events/earthquake
Description:
Create new earthquake event (1 event can have multiple reports)

Request:
- headers
```json
{
  "access_token": "string"
}
```

- body
```json
{
  "date": "string",
  "hour": "string",
  "dateTime": "date",
  "coordinates": "string",
  "magnitude": "float",
  "depth": "integer",
  "area": "string",
  "potensi": "string",
  "dirasakan": "string",
}
```

_Response (201 - Created)_
```json
{
  "id": "integer",
  "date": "string",
  "hour": "string",
  "dateTime": "date",
  "coordinates": "string",
  "magnitude": "float",
  "depth": "integer",
  "area": "string",
  "potensi": "string",
  "dirasakan": "string",
  "shakeMap": null,
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Date is required"
}
OR
{
  "message": "Hour is required"
}
OR
{
  "message": "Date Time is required"
}
OR
{
  "message": "Coordinates is required"
}
OR
{
  "message": "Magnitude is required"
}
OR
{
  "message": "Depth is required"
}
OR
{
  "message": "Area is required"
}
OR
{
  "message": "Dirasakan is required"
}
OR
{
  "message": "Potensi is required"
}
```

&nbsp;



## 8. GET /reports/earthquakes
Description:
Get all earthquake reports (1 report can only belong to 1 event), base on one Event

Request:
- query
```json
{
  "dateTime": "date",
  "coordinates": "string"
}
```

_Response (200 - OK)_
```json
[
    {
        "id": 1,
        "UserId": 1,
        "EventquakeId": 1,
        "status": "Safe",
        "description": "disini aman banget",
        "photoUrl": "imageUrlContoh",
        "coordinate": "-12.94,106.94",
        "createdAt": "2022-03-19T07:05:41.403Z",
        "updatedAt": "2022-03-19T07:05:41.403Z",
        "User": {
            "email": "user1@gmail.com"
        }
    },

    ...
]
```

_Response (404 - Not Found)_
```json
{
  "message": "Event not found"
}
```

&nbsp;

## 9. GET /reports/earthquakes/:id
Description:
Get one earthquake report

Request:
```json
{
  "id": "integer"
}
```

_Response (200 - OK)_
```json
{
    "id": "integer",
    "UserId": "integer",
    "EventquakeId": "integer",
    "status": "string",
    "description": "string",
    "photoUrl": "string",
    "coordinate": "string",
    "createdAt": "date",
    "updatedAt": "date"
}
```

_Response (404 - NOT FOUND)_
```json
{
  "message": "Report not found"
}
```

&nbsp;

## 10. POST /reports/earthquakes
Description:
Create new earth quake report

Request:
- headers
```json
{
  "access_token": "string"
}
```
- body
```json
{
  "coordinate": "string",
  "date": "string",
  "hour": "string",
  "dateTime": "date",
  "coordinates": "string",
  "magnitude": "integer",
  "depth": "integer",
  "area": "string",
  "dirasakan": "string",
  "potensi": "string"
}
```

_Response (201 - Created)_
```json
{
  "status": "string",
  "description": "string",
  "photoUrl": "string",
  "coordinate": "string",
  "UserId": "integer",
  "EventquakeId": "integer",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid Token"
}
OR
{
  "message": "Status is required"
}
OR
{
  "message": "Description is required"
}
OR
{
  "message": "Coordinate is required"
}
OR
{
  "message": "Coordinate is required"
}
```

&nbsp;

## 11. DELETE /reports/earthquakes/:id`
Description:
Delete one earthquake report

Request:
- headers
```json
{
  "access_token": "string"
}
```
- params
```json
{
  "id": "integer"
}
```

_Response (200 - OK)_
```json
{
  "message": "Report has been deleted"
}
```

_Response (401 - Failed To Delete)_
```json
{
  "message": "Invalid Token"
}
```
_Response (404 - NOT FOUND)_
```json
{
  "message": "Report not found"
}
```

&nbsp;

## GLOBAL ERROR
_Response (401 - Failed)_
```json
{
  "message": "Invalid Token"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal server error
}
```