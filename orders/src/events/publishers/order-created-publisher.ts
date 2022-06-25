import { Publisher, OrderCreatedEvent, Subjects } from '@rmtickl/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
	subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
