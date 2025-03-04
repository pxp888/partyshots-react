import React, { useState } from 'react';
import axios from 'axios';
import './styles/Contact.css';

function Contact({}) {
	const [msg, setMsg] = useState('Drop us a line');

	function submitForm(e) {
		e.preventDefault();
		const form = e.target;
		const name = form.name.value;
		const email = form.email.value;
		const message = form.mess.value;
		const data = { name, email, message };

		axios.post('https://52.56.34.125/status', data).then((response) => {
			console.log(response.data.event);
			if (response.data.event === 'message'){
				setMsg("Message sent! We'll get back to you soon.")
			}
			e.target.reset();
		}).catch((error) => {
			setMsg("There was an error sending your message. Please try again later.");
			console.log(error);
		});
	}

	return (
		<div className="contactholder">
			<h1>{msg}</h1>
			<div className='contactbox'>
				<form className="contactform" onSubmit={submitForm}>
					<label htmlFor="contactname">Name:</label>
					<input type="text" name="name" id="contactname"/>
					<label htmlFor="contactemail">Email:</label>
					<input type="email" name="email" id="contactemail" />
					<label htmlFor="mess">Message:</label>
					<textarea name="mess" id="mess" onChange={()=>{setMsg('Drop us a line')}} ></textarea>
					<button className='btn'>Submit</button>
				</form>
			</div>
		</div>
	);
}

export default Contact;

