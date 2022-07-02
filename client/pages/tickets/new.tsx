import React, { SyntheticEvent, useState } from 'react';
import useRequest from '../../hooks/useRequest';

function NewTicket() {
	const [title, setTitle] = useState('');
	const [price, setPrice] = useState('');
	const { doRequest, errors } = useRequest({
		url: '/api/tickets',
		method: 'post',
		body: {
			title,
			price,
		},
		onSuccess: (ticket) => console.log(ticket),
	});

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();

		doRequest();
	};

	const handleBlur = () => {
		const value = parseFloat(price);

		if (isNaN(value)) {
			return;
		}

		setPrice(value.toFixed(2));
	};

	return (
		<div>
			<h1>Create a ticket</h1>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor=''>Title</label>
					<input
						onChange={(e) => setTitle(e.target.value)}
						value={title}
						className='form-control'
						type='text'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor=''>Price</label>
					<input
						onChange={(e) => setPrice(e.target.value)}
						onBlur={handleBlur}
						value={price}
						className='form-control'
						type='text'
					/>
				</div>
				{errors}
				<button className='btn btn-primary'>Submit</button>
			</form>
		</div>
	);
}

export default NewTicket;
