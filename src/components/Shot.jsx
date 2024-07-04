import React, { useEffect, useState } from 'react';
import { getData } from './helpers';

import './Shot.css';
import blankimage from '../assets/blankimage.png'

function Shot({code, setBig}) {
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

	function handleClick(e) {
		e.preventDefault();
		let binfo = info;
		if (binfo.tlink === null){
			binfo.link = null;
		}
		setBig(binfo);
	}
	
	return (
		<div className='shot' onClick={handleClick}>			
			{!info.tlink ?  <img src={blankimage} alt='blank' />  : <img src={info.tlink} alt={info.filename} /> }
			<h3>{code}</h3>
			<p>{info.filename}</p>
			<p>{info.user}</p>
			<p>{info.created}</p>
			<p>{info.album}</p>
		</div>
	);
}

export default Shot;
