# User API Spec

## Register User
Edpoint : POST localhost:2001/auth/register

Request Body:

```json
{
  "nama": "ridwan",
  "email": "ridwan@gmail.com",
  "password": "smkbisa123",
  "role": "musrif"
}
```

Response Body:

```json
{
  "status": "Success",
  "message": "Register Berhasil",
  "data": {}
}
```

## Login User
Edpoint : POST localhost:2001/auth/login

Request Body:

```json
{
  "email": "ridwan@gmail.com",
  "password": "smkbisa123",
  "role": "musrif"
}
```

Response Body:

```json
{
    "status": "Success",
    "message": "Login Success",
    "data": {
        "id": 3,
        "nama": "ridwan",
        "email": "ridwan@gmail.com",
        "password": "$2b$1.....",
        "refresh_token": "eyJhbGciOiJI...",
        "role": "musrif",
        "access_token": "eyJhbGciOiJ..."
    }
}
```

## Profile
Edpoint : POST localhost:2001/auth/profile

Request Body:

```
Headers:

Authorization: 'Bearer [your token]'
```

Response Body:

```json
{
    "status": "Success",
    "message": "OK",
    "data": {
        "id": 3,
        "avatar": null,
        "nama": "ridwan",
        "email": "ridwan@gmail.com",
        "password": "$2b$12$....",
        "refresh_token": "eyJhbGciO...",
        "role": "musrif",
        "created_at": "2024-10-02T04:42:42.000Z",
        "updated_at": "2024-10-02T04:42:42.000Z"
    }
}
```

## Forgot Pass

## Reset Pass
