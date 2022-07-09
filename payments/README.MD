# Payments service

### Port - 3000

### Docker image - rmarinov045/payments

### Endpoints:

-   `POST` `/api/payments`:

*   Attempts to create a payment with passed orderId. Requires auth. Returns paymentId or error in following scenarions:

-   Order is not found
-   Order's owner is not the current user
-   Order has been already cancelled

```
{ id: string } | [{ message: string }]

```

-   Publishes PaymentCreated event

---

### Listens for the following events:

-   OrderCancelled
-   OrderCreated
