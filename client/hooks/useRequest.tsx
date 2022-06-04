import axios from 'axios';
import { ReactElement, useState } from 'react';

export interface ErrorAttrs {
	message: string;
	field?: string;
}

interface RequestHook {
	url: string;
	method: 'post' | 'get' | 'patch' | 'delete';
	body: {
		[key: string]: string;
	};
}

function useRequest({ url, method, body }: RequestHook): {
	doRequest: () => Promise<void> | Promise<{ email: string; id: string }>;
	errors: ReactElement | ReactElement[] | null;
} {
	const [errors, setErrors] = useState<ReactElement | null>(null);

	const doRequest = async () => {
		try {
			setErrors(null);
			const response = await axios[method](url, body);
			return response.data;
		} catch (error) {
			setErrors(
				<div className='alert alert-danger'>
					<h4>Ooops....</h4>
					<ul className='my-0'>
						{error.response.data.errors.map((error: ErrorAttrs) => {
							<li key={error.message}>{error.message}</li>;
						})}
					</ul>
				</div>
			);
		}
	};

	return { doRequest, errors };
}

export default useRequest;
