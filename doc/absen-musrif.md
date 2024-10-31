# User API Spec

Headers | Authorization:


```
Headers:
Authorization: 'Bearer [your token]'

Authorization:
Bearer Token: Your token
```

## Absen Musrif Masuk
Edpoint : POST localhost:2005/absensi-musrif/masuk

Request Body:

```json
{
  "nama": "id [user/musrif]"
}

```

Response Body:

```json
{
    "status": "Success",
    "message": "Clock-in successful",
    "data": {
        "nama": 3,
        "hadir": true,
        "shift": "halaqoh",
        "tanggal_masuk": "2024-10-29T03:11:31.201Z",
        "tanggal_keluar": null,
        "id": 25
    }
}
```

## Absen Musrif Keluar
Edpoint : POST localhost:2005/absensi-musrif/keluar

Request Body:

```json
{
    "id": "id [absen masuk]"
}
```

Response Body:

```json
{
    "status": "Success",
    "message": "Clock-out successful",
    "data": {
        "id": 25,
        "hadir": false,
        "shift": "halaqoh",
        "tanggal_masuk": "2024-10-29T03:11:31.000Z",
        "tanggal_keluar": "2024-10-29T03:13:01.809Z"
    }
}
```

## Profile
Edpoint : POST localhost:2005/auth/profile

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

## Absen Musrif List
Edpoint : POST localhost:2005/absensi-musrif/list

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
    "data": [
        {
            "id": 21,
            "hadir": true,
            "shift": "halaqoh",
            "tanggal_masuk": "2024-10-05T02:47:42.000Z",
            "tanggal_keluar": null
        },
        {
            "id": 22,
            "hadir": false,
            "shift": "halaqoh",
            "tanggal_masuk": "2024-10-05T02:48:27.000Z",
            "tanggal_keluar": "2024-10-05T02:49:01.000Z"
        },
        ......
    ],
    "pagination": {
        "total": 6,
        "page": 1,
        "pageSize": 10
    }
}
```

## Reset Pass
