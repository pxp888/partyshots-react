import React, { useState } from 'react';

import { postData } from '../helpers';

function Register({setCurrent}) {
	const [message, setMessage] = useState('');
	function handleSubmit(event) {
		event.preventDefault();
		const data = new FormData(event.target);

		postData('api/register/', {
			name: data.get('name'),
			email: data.get('email'),
			password: data.get('password'),
			password_confirmation: data.get('password_confirmation')
		}, (data) => {
			setMessage(data.message);
			if(data.message==='registered') {
				setCurrent('login');
			}
		});


	}

	return (
		<div className="logform">
			<div>
				<h1>Register</h1>
				<form onSubmit={handleSubmit}> 
					<label htmlFor="name">Username</label>
					<input type="text" name="name" placeholder="Username" />
					<label htmlFor="email">Email</label>
					<input type="email" name="email" placeholder="Email" />
					<label htmlFor="password">Password</label>
					<input type="password" name="password" placeholder="Password" />
					<label htmlFor="password_confirmation">Confirm Password</label>
					<input type="password" name="password_confirmation" placeholder="Confirm Password" />
					<button type="submit">Register</button>
				</form>
				{message!=='' && <p>{message}</p>}
			</div>
		</div>
	);
}

export default Register;