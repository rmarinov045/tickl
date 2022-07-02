import 'bootstrap/dist/css/bootstrap.css';
import { AppContext } from 'next/app';
import Head from 'next/head';
import buildAxiosClient from '../api/build-axios-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }: any) => {
	<Head>
		<meta
			name='viewport'
			content='width=device-width, initial-scale=1'
		></meta>
	</Head>;

	return (
		<>
			<Header currentUser={currentUser} />
			<Component {...pageProps} currentUser={currentUser} />
		</>
	);
};

AppComponent.getInitialProps = async (appContext: AppContext) => {
	const client = buildAxiosClient(appContext.ctx);
	const { data } = await client.get('/api/users/currentuser');
	let pageProps = {};
	if (appContext.Component.getInitialProps) {
		pageProps = await appContext.Component.getInitialProps(
			appContext.ctx,
			// @ts-ignore
			client,
			data.currentUser
		);
	}

	return {
		pageProps,
		...data,
	};
};

export default AppComponent;
