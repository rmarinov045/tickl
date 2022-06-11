import Link from 'next/link';
import React from 'react';

function Header({ currentUser }: { currentUser: { email: string } | null }) {
	const links = [
		!currentUser && { label: 'Sign Up', href: '/auth/signup' },
		!currentUser && { label: 'Sign In', href: '/auth/signin' },
		currentUser && { label: 'Sign Out', href: '/auth/signout' },
	]
		.filter(Boolean)
		.map(({ label, href }) => {
			return (
				<li key={href} className='nav-item'>
					<Link href={href}>
						<a className='nav-link'>{label}</a>
					</Link>
				</li>
			);
		});

	return (
		<nav className='navbar navbar-light bg-light'>
			<Link href='/'>
				<a className='navbar-brand'>Tickl</a>
			</Link>

			<div className='d-flex justify-content-end'>
				<ul className='nav d-flex aligh-items-center'>{links}</ul>
			</div>
		</nav>
	);
}

export default Header;
