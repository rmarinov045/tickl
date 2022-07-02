import React from 'react';
import Router from 'next/router';
import { TicketData } from '../index';
import useRequest from '../../hooks/useRequest';
import { OrderData } from '../orders/[orderId]';

function TicketShow({ ticket }: { ticket: TicketData }) {
	const { doRequest, errors } = useRequest({
		url: '/api/orders',
		method: 'post',
		body: { ticketId: ticket.id },
		onSuccess: (order: OrderData) =>
			Router.push('/orders/[orderId]', `/orders/${order.id}`),
	});

	return (
		<div>
			<h1>{ticket.title}</h1>
			<h4>Price: {ticket.price}</h4>
			{errors}
			<button onClick={doRequest} className='btn btn-primary'>
				Purchase
			</button>
		</div>
	);
}

TicketShow.getInitialProps = async (context, client) => {
	const { ticketId } = context.query;
	const { data } = await client.get(`/api/tickets/${ticketId}`);

	return { ticket: data };
};

export default TicketShow;
