import React, { useEffect, useState } from 'react';
import { getData } from './helpers';
import Shot from './Shot';
import Uploader from './Uploader';

import blankimage from '../assets/blankimage.png'

import './styles/Albumview.css';

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

	const [showbig, setShowbig] = useState(false);

	
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
		<div id='albumview'>
			<div id="abinfo">
				<div>
					<p className="label">name</p>
					<p>{info.name}</p>
					<p className="label">user</p>
					<p>{info.user}</p>
					<p className="label">created</p>
					<p>{info.created}</p>
					<p className="label">album code</p>
					<p>{info.code}</p>
				</div>
			</div>

			{uname !== '' && ( <Uploader code={code} refreshAlbum={refreshAlbum} /> )}

			{showbig && (
				<div id='bigimage'>
					{big.link === null ?  <img src={blankimage} alt='blank' />  : <img src={big.link} alt={big.filename} /> }
				</div>
			)}
			
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