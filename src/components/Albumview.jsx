import React, { useEffect, useState } from 'react';
import { getData } from './helpers';
import Shot from './Shot';
import Uploader from './Uploader';

import './styles/Albumview.css';

function Albumview({code, uname}) {
	const [shots, setShots] = useState({});
	const [info, setInfo] = useState({
		name: 'name', 
		code: 'code',
		user: 'user',
		created: 'created',
		thumbnail: 'thumbnail',
	});
	const [big, setBig] = useState(-1);

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

	function killshot(i) {
		const newshots = {...shots};
		delete newshots[i];
		setShots(newshots);
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

			<div id='shotlist'>
				{Object.keys(shots).map((shot, index) => {
					return (
						<Shot 
							key={shot}
							code={shot} 
							big={big}
							setBig={setBig} 
							index={index}
							
						/> 
					)
				})}
			</div>
		</div>
	);
}



export default Albumview;