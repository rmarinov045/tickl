# Auth service

### Port - 3000

### Docker image - rmarinov045/auth

### Endpoints:

-   `GET` `/api/users/currentuser`:

*   Receive information about the current user or null:

```
{ id: string, email: string } | null

```

-   `POST` `/api/users/signin`

*   Sign in with user credentials. Returns user object or array of error objects depending on login success. Sets JWT token on the request session property.

```
{ id: string, email: string } | [{ message: string, field?: string }]
```

-   `POST` `/api/users/signout`

*   Signout current user. Clears current session and returns an empty object.

-   `POST` `/api/users/signup`

*   Register user with credentials. Receive user object or array of errors depending on signup success. Sets JWT token on the request session property.

```
{ id: string, email: string } | [{ message: string, field?: string }]
```
