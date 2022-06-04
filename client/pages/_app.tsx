import 'bootstrap/dist/css/bootstrap.css';
import Head from 'next/head';

function App({ Component, pageProps }: any) {
	<Head>
		<meta
			name='viewport'
			content='width=device-width, initial-scale=1'
		></meta>
	</Head>;

	return <Component {...pageProps} />;
}

export default App