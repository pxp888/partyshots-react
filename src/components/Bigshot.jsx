import React, { useEffect } from 'react';

import './styles/Bigshot.css';

function Bigshot({info, big, setBig}) {
	
	function close(e) {
		e.preventDefault();
		setBig(-1);
	}

	function next(e) {
		e.preventDefault();
		setBig(big+1);
	}

	function prev(e) {
		e.preventDefault();
		if (big > 0){
			setBig(big-1);
		}
	}

	function imageClicked(e) {
		e.preventDefault();
		let x = e.clientX / window.innerWidth;
		if (x > .75) {
			setBig(big+1);
			return;
		}
		if (x < .25) {
			if (big > 0){
				setBig(big-1);
			}
			return;
		}
		setBig(-1);
	}

	function download(e) {
		e.preventDefault();
		const element = document.createElement('a');
		element.href = info.link;
		element.download = info.filename || 'download';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}

	function handleKeyDown(e) {
		switch(e.key) {
			case 'ArrowLeft':
				prev(e);
				break;
			case 'ArrowRight':
				next(e);
				break;
			case 'Escape':
				close(e);
				break;
			default:
				break;
		}
	}

	

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [big]);
	
	return (
		<div className="bigshot" >
			<div className="bigshotholder" onClick={imageClicked}>
				<img src={info.link} alt="full photo" />
			</div>

			<div className="bigshotinfo" >
				<p className="label">filename</p>
				<p>{info.filename}</p>
				<p className="label">user</p>
				<p>{info.user}</p>
				<p className="label">created</p>
				<p>{info.created}</p>
				<button className="btn" onClick={download}>download</button>
			</div>			
		</div>
	);
}

export default Bigshot;

