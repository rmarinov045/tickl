import { Publisher, Subjects, OrderCancelledEvent } from '@rmtickl/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
	subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
