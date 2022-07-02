import React, { useEffect, useState } from 'react';
import { TicketData } from '..';

export interface OrderData {
	userId: string;
	status: 'created' | 'cancelled' | 'complete' | 'pending';
	expiresAt: Date;
	ticket: TicketData;
	id: string;
}

function OrderShow({ order }: { order: OrderData }) {
	const [timeLeft, setTimeLeft] = useState(0);

	useEffect(() => {
		const findTimeLeft = () => {
			// @ts-ignore
			const msLeft = new Date(order.expiresAt) - new Date();
			setTimeLeft(Math.round(msLeft / 1000));
		};
		findTimeLeft();
		const timerId = setInterval(findTimeLeft, 1000);

		return () => clearInterval(timerId);
	}, []);

	if (timeLeft < 0) {
		return <div>Order expired</div>;
	}

	return <div>Time left to pay: {timeLeft} seconds</div>;
}

OrderShow.getInitialProps = async (context, client) => {
	const { orderId } = context.query;
	const { data } = await client.get(`/api/orders/${orderId}`);

	return { order: data };
};

export default OrderShow;
