import { natsWrapper } from '../../../nats-wrapper';
import { OrderCreatedListener } from '../order-created-listener';
import { Ticket } from '../../../models/ticket';
import mongoose from 'mongoose';
import { OrderCreatedEvent, OrderStatus } from '@rmtickl/common';
import { Message } from 'node-nats-streaming';

const setup = async () => {
	const listener = new OrderCreatedListener(natsWrapper.client);
	const ticket = Ticket.build({
		title: 'test',
		price: 20,
		userId: new mongoose.Types.ObjectId().toHexString(),
	});

	await ticket.save();

	const data: OrderCreatedEvent['data'] = {
		id: new mongoose.Types.ObjectId().toHexString(),
		version: 0,
		status: OrderStatus.Created,
		userId: new mongoose.Types.ObjectId().toHexString(),
		expiresAt: 'test',
		ticket: {
			id: ticket.id,
			price: ticket.price,
		},
	};
	// @ts-ignore
	const msg: Message = {
		ack: jest.fn(),
	};

	return { msg, data, listener, ticket };
};

it('sets the userId of the ticket', async () => {
	const { listener, ticket, data, msg } = await setup();

	await listener.onMessage(data, msg);

	const updatedTicket = await Ticket.findById(ticket.id);

	expect(updatedTicket!.orderId).toEqual(data.id);
});

it('acks the message', async () => {
	const { listener, ticket, data, msg } = await setup();

	await listener.onMessage(data, msg);

	expect(msg.ack).toHaveBeenCalled();
});

it('publishes a ticket updated event', async () => {
	const { listener, ticket, data, msg } = await setup();

	await listener.onMessage(data, msg);

	expect(natsWrapper.client.publish).toHaveBeenCalled();

	const ticketUpdatedData = JSON.parse(
		(natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
	);

	expect(data.id).toEqual(ticketUpdatedData.orderId);
});
