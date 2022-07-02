import React from 'react';
import { TicketData } from '..';

export interface OrderData {
	userId: string;
	status: 'created' | 'cancelled' | 'complete' | 'pending';
	expiresAt: Date;
	ticket: TicketData;
	id: string;
}

function OrderShow() {
	return <div>OrderShow</div>;
}

export default OrderShow;
