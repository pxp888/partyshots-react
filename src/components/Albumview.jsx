import React, { useEffect, useState } from 'react';
import { getData } from './helpers';
import Shot from './Shot';
import Uploader from './Uploader';

import './Albumview.css';

function Albumview({code, uname}) {
	const [big, setBig] = useState('');
	const [shots, setShots] = useState({});
	const [info, setInfo] = useState({
		name: 'name', 
		code: 'code',
		user: 'user',
		created: 'created',
		thumbnail: 'thumbnail',
	});

	useEffect(() => {
		getData('api/getalbum/', {code: code}, (data) => {
			if (data.code===code){
				setInfo(data);
			}
		});

		getData('api/getshots/', {code: code}, (data) => {
			if (data.code===code){
				setShots(data.shots);
			}
		});
	}, [code]);


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

			{uname !== '' && ( <Uploader code={code}  /> )}

			<div className='bigImage'>
				<h1>big: {big}</h1>    
			</div>

			<div className='shotlist'>
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