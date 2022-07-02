import React from 'react';

const LandingPage = ({
	currentUser,
}: {
	currentUser: { id: string; email: string } | null;
}) => {
	return currentUser ? (
		<h1>You are signed in</h1>
	) : (
		<h1>You are NOT signed in</h1>
	);
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
	return {};
};

export default LandingPage;
