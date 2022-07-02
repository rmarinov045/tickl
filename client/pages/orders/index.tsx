import React from 'react';

interface OrderData {
	id: string;
	status: string;
	ticket: {
		title: string;
	};
}

function OrderIndex({ orders }: { orders: OrderData[] }) {
	return (
		<ul>
			{orders.map((order) => {
				return (
					<li key={order.id}>
						{order.ticket.title} - {order.status}
					</li>
				);
			})}
		</ul>
	);
}

OrderIndex.getInitialProps = async (context, client) => {
	const { data } = await client.get('/api/orders');

	return { orders: data };
};

export default OrderIndex;
