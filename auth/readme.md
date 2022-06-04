# Auth service

### Port - 3000

### Docker image - rmarinov045/auth

### Endpoints:

1.   `GET` `/api/users/currentuser`:

  -   Receive information about the current user or null:

```
{ id: string, email: string } | null

```

2.   `POST` `/api/users/signin`

  -   Sign in with user credentials. Returns user object or array of error objects depending on login success. Sets JWT token on the request session property.

```
{ id: string, email: string } | [{ message: string, field?: string }]
```

3.   `POST` `/api/users/signout`

  -   Signout current user. Clears current session and returns an empty object.

4.   `POST` `/api/users/signup`

  -   Register user with credentials. Receive user object or array of errors depending on signup success. Sets JWT token on the request session property.

```
{ id: string, email: string } | [{ message: string, field?: string }]
```
