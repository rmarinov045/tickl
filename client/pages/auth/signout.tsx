import Router from 'next/router';
import React, { useEffect } from 'react';
import useRequest from '../../hooks/useRequest';

function Signout() {
	const { doRequest, errors } = useRequest({
		url: '/api/users/signout',
		method: 'post',
		body: {},
		onSuccess: () => Router.push('/'),
	});

	useEffect(() => {
		doRequest();
	}, []);

	return <div>Signing you out....</div>;
}

export default Signout;
