import React, { useState, useEffect } from 'react';

import { getData, postData } from './helpers';

function Landing() {
	const [message, setMessage] = useState('');

	useEffect(() => {
		getData('api/hello-world/', {}, (data) => { setMessage(data.message); });
	}, []);

	function handleClick() {
		postData('api/test/', { message: 'thing test' }, (data) => { setMessage(data.message); });
	}

	return (
		<div>
			<h1>Hello, World!</h1>
			<p>{message}</p>
			<button onClick={handleClick}>Click me!</button>

		</div>
	);
}

export default Landing;

