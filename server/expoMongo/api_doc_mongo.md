# Alert Me (Notification Server) API Documentation

## Endpoints:

List of available endpoints (server for user and report):
- `GET /expo-tokens`
- `POST /expo-tokens`
- `GET /expo-tokens/:expoToken`

## 1. GET /expo-tokens
Description:
Get all expo token and current coordinates of user's phone

_Response (200 -OK)_
```json
[
    {
        "_id": "623968ebddecc34c2215a7f3",
        "expoToken": "ExponentPushToken[pDcgbXA0Ii0YA__0TDxF3e]",
        "recentCoordinates": "-6.2412236,106.9235361"
    },
    {
        "_id": "62396ef19c856d4fd29e22fe",
        "expoToken": "ExponentPushToken[NPNoQ9Ls_Lwdq8b7UIg81Y]",
        "recentCoordinates": "-6.8685794 107.5866425"
    },
    ...
]
```
&nbsp;

## 2. POST /expo-tokens
Description:
Save expo token and current coordinates of user's phone

Request:
- body
```json
{
  "expoToken": "string",
  "recentCoordinates": "string"
}
```

_Response (201 - Created)_
```json
{
    "newData": {
        "expoToken": "string",
        "recentCoordinates": "-string"
    },
    "message": "Expo Token dan lokasi tersimpan"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Coordinates And Expo Token Required!"
}
```

&nbsp;

## 3. GET /expo-tokens/:expoToken
Description:
Get One expo token and coordinate of user's phone

Request:
- params
```json
{
  "expoToken": "string"
}
```

_Response (200 - OK)_
```json
{
    "_id": "string",
    "expoToken": "string",
    "recentCoordinates": "string"
}
```

_Response (404 - NOT FOUND)_
```json
{
  "message": "Coordinates And Expo Token Not Found!"
}
```

&nbsp;

## 4. GLOBAL ERROR

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal server error"
}
```