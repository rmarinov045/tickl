# Orders service

### Port - 3000

### Docker image - rmarinov045/orders

### Endpoints:

-   `GET` `/api/orders`:

*   Receive information about all orders that belong to the current user. Requires auth.

```
{ ticket: Ticket, expiresAt: number, userId: string, version: number, status: 'created' | 'cancelled' | 'awaiting:payment' | 'complete' } | []

```

---

-   `POST` `/api/orders`

*   Create an order. Requires auth. Has following validation:

-   ticketId is required
-   ticketId is a valid mongoose Object Id

Returns created ticket and status `201` or error if the ticket is not found/reserved

```
{ ticket: Ticket, expiresAt: number, userId: string, version: number, status: 'created' | 'cancelled' | 'awaiting:payment' | 'complete' } | [{ message: string }]
```

-   Publishes OrderCreated event

---

-   `GET` `/api/orders/:id`

*   Fetch a single order by ID. Requires auth. Returns an order object or error if order is not found/current user is not the owner of the order:

```
{ ticket: Ticket, expiresAt: number, userId: string, version: number, status: 'created' | 'cancelled' | 'awaiting:payment' | 'complete' } | [{ message: string }]
```

---

-   `DELETE` `/api/orders/:id`

*   Cancel order by ID. Requires auth. Returns cancelled order with a status of `204` or error in following scenarions:

-   Order is not found
-   Current user is not the owner of the order

```
{ ticket: Ticket, expiresAt: number, userId: string, version: number, status: 'created' | 'cancelled' | 'awaiting:payment' | 'complete' } | [{ message: string }]
```

-   Publishes a OrderCancelled event

---

### Listens for the following events:

-   ExpirationComplete
-   PaymentCreated
-   TicketCreated
-   TicketUpdated
