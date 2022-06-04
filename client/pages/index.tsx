import React from 'react';
import buildAxiosClient from '../api/build-axios-client';

const LandingPage = ({
	currentUser,
}: {
	currentUser: { id: string; email: string } | null;
}) => {
	return (
		<div className='container'>
			Homepage
			<h2>{currentUser?.email || 'test'}</h2>
		</div>
	);
};

LandingPage.getInitialProps = async (context) => {
	const client = buildAxiosClient(context);
	const { data } = await client.get('/api/users/currentuser');

	return data;
};

export default LandingPage;
