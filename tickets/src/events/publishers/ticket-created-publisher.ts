import { Publisher, Subjects, TicketCreatedEvent } from '@rmtickl/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
	subject: Subjects.TicketCreated = Subjects.TicketCreated;
}