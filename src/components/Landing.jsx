import React, { useState, useEffect } from 'react';

import { getData, postData } from './helpers';

import './styles/Landing.css';
import cover1 from '../assets/cover1.webp';
import cover2 from '../assets/cover2.webp';
import cover3 from '../assets/cover3.webp';
import cover4 from '../assets/cover4.webp';
import cover5 from '../assets/cover5.webp';

function Landing() {
	const [message, setMessage] = useState('');

	
	return (
		<div id="landing">
			<h1>partyShots</h1>
			<h2>because we don't all have to take the picture.</h2>
			
			<div className="landing1">
				<div className="imdiv1">
					<img src={cover3} alt="landingshot" />
				</div>
				<div className="mbox lightbox">
					<h3>Get the party started</h3>
					<p>partyShots is a photo sharing app that allows you to share photos with your friends and family. Create an album and invite your friends to join. Everyone can share their photos and videos in one place.</p>
				</div>
			</div>

			<div className="warning">
				<h1>Nothing is private on this site</h1>
				<p>Anyone with an album code or username can find files shared on this site.</p>
			</div>

			<div id="howitworks">
				<h1>How it works</h1>
			</div>

			<div className="landing2">
				<div className="imdiv2">
					<img src={cover2} alt="landingshot" />
				</div>
				<div className='hbox'>
					<div className="lightbox">
						<h3>Create an album</h3>
						<p>You just need to be logged in. </p>
					</div>
				
					<div className="lightbox">
						<h3>maybe add some photos</h3>
					</div>
					
					<div className="lightbox">
						<h3>share the album code, or your username</h3>
						<p>Anyone with either the album code or your username can view the album.</p>
						<p>Anyone logged in can see, and add files to an album.</p>
					</div>
				</div>
			</div>
			

			

		</div>
	);
}

export default Landing;

