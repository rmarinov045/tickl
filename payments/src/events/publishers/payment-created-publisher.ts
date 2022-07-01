import { PaymentCreatedEvent, Publisher, Subjects } from '@rmtickl/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
	subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
