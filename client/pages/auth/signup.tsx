import React, { SyntheticEvent, useState } from 'react';
import axios from 'axios';

interface ErrorAttrs {
	message: string;
	field?: string;
}

function Signup() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState<ErrorAttrs[] | []>([]);

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();

		try {
			const response = await axios.post('/api/users/signup', {
				email,
				password,
			});
			console.log(response.data);
		} catch (error) {
			setErrors(error.response.data.errors);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h1>Sign up</h1>
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
				{errors.length > 0 && (
					<div className='alert alert-danger'>
						<h4>Ooops....</h4>
						<ul className='my-0'>
							{errors.map((error: ErrorAttrs) => (
								<li key={error.message}>{error.message}</li>
							))}
						</ul>
					</div>
				)}
				<button className='btn btn-primary'>Sign up</button>
			</div>
		</form>
	);
}

export default Signup;
