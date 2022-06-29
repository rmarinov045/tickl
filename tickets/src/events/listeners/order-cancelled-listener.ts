import { Listener, OrderCancelledEvent, Subjects } from '@rmtickl/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher';
import { queueGroupName } from './queue-group-name';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
	subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
	queueGroupName = queueGroupName;

	async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
		const ticket = await Ticket.findById(data.ticket.id);

		if (!ticket) {
			throw new Error('Ticket not found');
		}

		ticket.set({ orderId: undefined });

		await ticket.save();
		// @ts-ignore
		new TicketUpdatedPublisher(this.client).publish({
			id: ticket.id,
			// @ts-ignore
			orderId: ticket.orderId,
			userId: ticket.userId,
			price: ticket.price,
			title: ticket.title,
			version: ticket.version,
		});

		msg.ack();
	}
}
