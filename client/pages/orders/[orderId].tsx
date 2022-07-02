import React, { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { TicketData } from '..';
import { stripeKey } from './stripe-key';

export interface OrderData {
	userId: string;
	status: 'created' | 'cancelled' | 'complete' | 'pending';
	expiresAt: Date;
	ticket: TicketData;
	id: string;
}

export interface UserData {
	email: string;
	userId: string;
}

function OrderShow({
	order,
	currentUser,
}: {
	order: OrderData;
	currentUser: UserData;
}) {
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

	return (
		<div>
			Time left to pay: {timeLeft} seconds
			<StripeCheckout
				token={(token) => console.log(token)}
				stripeKey={stripeKey}
				amount={order.ticket.price * 100}
				email={currentUser.email}
			/>
		</div>
	);
}

OrderShow.getInitialProps = async (context, client) => {
	const { orderId } = context.query;
	const { data } = await client.get(`/api/orders/${orderId}`);

	return { order: data };
};

export default OrderShow;
