import mongoose from 'mongoose';
import { TicketUpdatedEvent } from '@rmtickl/common';
import { TicketUpdatedListener } from '../ticket-updated-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';
import { Message } from 'node-nats-streaming';

const setup = async () => {
	const listener = new TicketUpdatedListener(natsWrapper.client);
	const ticket = Ticket.build({
		title: 'test',
		price: 20,
		id: new mongoose.Types.ObjectId().toHexString(),
	});
	await ticket.save();
	const data: TicketUpdatedEvent['data'] = {
		id: ticket.id,
		version: ticket.version + 1,
		title: 'new test',
		price: 30,
		userId: new mongoose.Types.ObjectId().toHexString(),
	};
	// @ts-ignore
	const msg: Message = {
		ack: jest.fn(),
	};

	return { listener, data, msg, ticket };
};

it('finds, updates and saves a ticket', async () => {
	const { msg, data, ticket, listener } = await setup();

	await listener.onMessage(data, msg);

	const updatedTicket = await Ticket.findById(ticket.id);

	expect(updatedTicket!.title).toEqual(data.title);
	expect(updatedTicket!.price).toEqual(data.price);
	expect(updatedTicket!.version).toEqual(data.version);
});

it('acks the message', async () => {
	const { msg, data, listener } = await setup();

	await listener.onMessage(data, msg);

	expect(msg.ack).toHaveBeenCalled();
});

it('does not call ack if the event has a skipped version', async () => {
	const { msg, data, listener } = await setup();
	data.version = 10;

	try {
		await listener.onMessage(data, msg);
	} catch (error) {}

	expect(msg.ack).not.toHaveBeenCalled();
});
