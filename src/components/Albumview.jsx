import React, { useEffect, useState } from 'react';
import { getData } from './helpers';
import Shot from './Shot';
import Uploader from './Uploader';

import blankimage from '../assets/blankimage.png'

import './Albumview.css';

function Albumview({code, uname}) {
	const [big, setBig] = useState({
		code: 'code',
		filename: 'filename',
		link: null,
		tlink: 'tlink',
		created: 'created',
		user: 'user',
		album: 'album',
	});
	const [shots, setShots] = useState({});
	const [info, setInfo] = useState({
		name: 'name', 
		code: 'code',
		user: 'user',
		created: 'created',
		thumbnail: 'thumbnail',
	});

	
	function refreshAlbum() {
		getData('api/getalbum/', {code: code}, (data) => {
			if (data.code === code){
				setInfo(data);
			}
		});

		getData('api/getshots/', {code: code}, (data) => {
			if (data.code === code){
				setShots(data.shots);
			}
		});
	}

	useEffect(() => { refreshAlbum(); }, [code]);


	return (
		<div className='albumview'>
			<p>Albumview</p>
			<div>
				<p>{info.name}</p>
				<p>{info.user}</p>
				<p>{info.created}</p>
				<p>{info.code}</p>
				<p>{info.thumbnail}</p>
			</div>

			{uname !== '' && ( <Uploader code={code} refreshAlbum={refreshAlbum} /> )}

			<div className='bigImage'>
				<h1>big: {big.code}</h1>
				{big.link === null ?  <img src={blankimage} alt='blank' />  : <img src={big.link} alt={big.filename} /> }
			</div>

			<div id='shotlist'>
				{Object.keys(shots).map((shot, index) => {
					return (
						<Shot key={shot} code={shot} setBig={setBig}/> 
					)
				})}
			</div>
		</div>
	);
}

export default Albumview;