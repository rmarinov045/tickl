import React, { ReactElement, SyntheticEvent, useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/useRequest';

function Signup() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { doRequest, errors } = useRequest({
		url: '/api/users/signup',
		method: 'post',
		body: {
			email,
			password,
		},
		onSuccess: () => Router.push('/'),
	});

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();

		await doRequest();
	};

	return (
		<form onSubmit={handleSubmit}>
			<h1>Sign up</h1>
			<div className='form-group'>
				<div className='form-group'>
					<label htmlFor='email'>Email Address</label>
					<input
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						type='email'
						autoComplete='email'
						className='form-control'
						name='email'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Password</label>
					<input
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						type='password'
						autoComplete='current-password'
						className='form-control'
						name='password'
					/>
				</div>
				{errors}
				<button className='btn btn-primary'>Sign up</button>
			</div>
		</form>
	);
}

export default Signup;
