# Tickl

Ticketing app built for practicing microservices architecture.

## Technology used:

-   ExpressJS
-   Typescript
-   MongoDB
-   Mongoose
-   NATS streaming server
-   BullJS
-   Redis
-   StripeJS
-   React
-   NextJS
-   Jest
-   Custom built NPM package (@rmtickl/common)

## Functionality:

-   Ability to create, update and reserve tickets
-   Payments integration
-   Communication between services with NATS streaming server
-   Worker service
-   Fully dockerized
-   Simple CI flow with GitHub actions
-   Tested with Jest

## Services:

| Service    | Link |
| ---------- | ---- |
| Auth       | [Click] (https://github.com/rmarinov045/tickl/tree/main/auth)     |
| Client     | [Click] (https://github.com/rmarinov045/tickl/tree/main/client)     |
| Expiration | [Click] (https://github.com/rmarinov045/tickl/tree/main/expiration)     |
| Orders     | [Click] (https://github.com/rmarinov045/tickl/tree/main/orders)     |
| Payments   | [Click] (https://github.com/rmarinov045/tickl/tree/main/payments)     |
| Tickets    | [Click] (https://github.com/rmarinov045/tickl/tree/main/tickets)     |

## How to run

1. Make sure to have docker & kubernetes installed
2. Go to `infra/k8s/ingress-srv.yaml` and change host to localhost
3. Install `skaffold` if not already available
4. Run `skaffold dev`
5. Open the app at localhost in the browser

Built during Stephen Grider's microservices course
