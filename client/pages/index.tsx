import React from 'react';
import buildAxiosClient from '../api/build-axios-client';

const LandingPage = ({
	currentUser,
}: {
	currentUser: { id: string; email: string } | null;
}) => {
	return (
		 currentUser ? <h1>You are signed in</h1> : <h1>You are NOT signed in</h1>
	);
};

LandingPage.getInitialProps = async (context) => {
	const client = buildAxiosClient(context);
	const { data } = await client.get('/api/users/currentuser');

	return data;
};

export default LandingPage;
