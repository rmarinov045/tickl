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
	onSuccess(responseData: { email: string; id: string } | any): void;
}

/**
 * Custom hook that returns a function to make HTTP requests and JSX error markup or null
 * @param url - URL to be called
 * @param method - HTTP method
 * @param body - Request body
 * @returns doRequest function and errors JSX (or null if there are none)
 */

function useRequest({ url, method, body, onSuccess }: RequestHook): {
	doRequest: (
		props?: any
	) => Promise<void> | Promise<{ email: string; id: string }>;
	errors: ReactElement | ReactElement[] | null;
} {
	const [errors, setErrors] = useState<ReactElement | null>(null);

	const doRequest = async (props = {}) => {
		try {
			setErrors(null);
			const response = await axios[method](url, { ...body, ...props });

			if (onSuccess) {
				onSuccess(response.data);
			}

			return response.data;
		} catch (error) {
			setErrors(
				<div className='alert alert-danger'>
					<h4>Ooops....</h4>
					<ul className='my-0'>
						{error.response.data.errors.map((error: ErrorAttrs) => {
							return <li key={error.message}>{error.message}</li>;
						})}
					</ul>
				</div>
			);
		}
	};

	return { doRequest, errors };
}

export default useRequest;
