# Expiration service

### Port - 3000

### Docker image - rmarinov045/expiration

### Endpoints:

-   Does not have endpoints:

*   The service listens for created orders and starts a preset timer for every created order (expiration timer). Once the timer is up, the service emits and `ExpirationComplete` event (handled by orders service, which cancels the order).

### Listens for the following events:

-   OrderCreated
