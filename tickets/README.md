# Tickets service

### Port - 3000

### Docker image - rmarinov045/tickets

### Endpoints:

-   `GET` `/api/tickets`:

*   Receive information about all unreserved tickets:

```
{ title: string, price: number, userId: string, version: number, orderId?: string } | []

```

---

-   `POST` `/api/tickets`

*   Create a ticket. Requires auth. Has following validation:

-   Title is required
-   Price must be greater than 0

Returns created ticket and status `201`

```
{ title: string, price: number, userId: string, version: number, orderId?: string }
```

-   Publishes TicketCreated event

---

-   `GET` `/api/tickets/:id`

*   Fetch a single ticket by ID. Returns a ticket object or error if ticket is not found:

```
{ title: string, price: number, userId: string, version: number, orderId?: string } | [{ message: string }]
```

---

-   `PUT` `/api/tickets/:id`

*   Update ticket by ID. Requires auth. Returns updated ticket or error in following scenarions:

-   Ticket is not found
-   Ticket is reserved
-   Current user is not the owner of the ticket

```
{ title: string, price: number, userId: string, version: number, orderId?: string } | [{ message: string }]
```

-   Publishes a TicketUpdated event

---

### Listens for the following events:

-   OrderCancelled
-   OrderCreated
