import React, { useEffect, useState } from 'react';
import { getData } from './helpers';

import './styles/Shot.css';

import Bigshot from './Bigshot';

import blankimage from '../assets/blankimage.png'
import xbutton from '../assets/x.webp'

function Shot({code, big, setBig, index, killshot, tshots}) {
	const [info, setInfo] = useState({
		code: 'code',
		filename: 'filename',
		link: 'link',
		tlink: 'tlink',
		created: 'created',
		user: 'user',
		album: 'album',
	});
	
	useEffect(() => {
		getData('api/getshot/', {code: code}, (data) => {
			if (data.code===code){
				setInfo(data);
			}
		});
	}, [code]);

	function shotClicked(e) {
		e.preventDefault();
		setBig(index);
	}

	function xclicked(e) {
		e.preventDefault();
		e.stopPropagation();
		console.log('kill', code);
		killshot(code);
	}
	
	return (
		<>
		<div className='shot' onClick={shotClicked}>			
			{!info.tlink ?  <img src={blankimage} alt='blank' />  : <img src={info.tlink} alt={info.filename} /> }
			<div className='shotholder'>
				<div className='shotinfo'>
					<p className="label">filename</p>
					<p>{info.filename}</p>
					<p className="label">user</p>
					<p>{info.user}</p>
					<p className="label">created</p>
					<p>{info.created}</p>
				</div>
				<div className="shotkiller" onClick={xclicked}>
					<img src={xbutton} alt="close" />
				</div>
			</div>
		</div>
		{big === index && ( <Bigshot info={info} big={big} setBig={setBig} tshots={tshots} /> )}
		</>
	);
}

export default Shot;

