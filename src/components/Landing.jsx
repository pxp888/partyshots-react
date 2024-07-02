import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Landing() {
	const [message, setMessage] = useState('');

	useEffect(() => {
		axios.get('http://localhost:8000/api/hello-world/')
			.then(response => {
				setMessage(response.data.message);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);


	function handleClick() {
		axios.post('http://localhost:8000/api/test/', { 
			message: 'thing test' 
		}).then(response => {
			setMessage(response.data.message);
		}).catch(error => { console.log(error); });
		
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

