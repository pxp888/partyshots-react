import React, { useEffect, useState } from 'react';
import { getData } from './helpers';
import Shot from './Shot';
import Uploader from './Uploader';

import './styles/Albumview.css';

function Albumview({code, uname, setCurrent, setSword}) {
	const [shots, setShots] = useState({});
	const [info, setInfo] = useState({
		name: 'name', 
		code: 'code',
		user: 'user',
		created: 'created',
		thumbnail: 'thumbnail',
		status: 'guest',
	});
	const [big, setBig] = useState(-1);

	function refreshAlbum() {
		getData('api/getalbum/', {code: code}, (data) => {
			if (data.code === code){
				setInfo(data);
				console.log(data);
			}
		});

		getData('api/getshots/', {code: code}, (data) => {
			if (data.code === code){
				setShots(data.shots);
			}
		});
	}

	function killshot(i) {
		const confirm = window.confirm('Are you sure you want to delete this file?');
		if (!confirm) {return;}

		const newshots = {...shots};
		delete newshots[i];
		setShots(newshots);
	}

	useEffect(() => { refreshAlbum(); }, [code, ]);



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

			{info.status > 1 && (
					<Uploader code={code} refreshAlbum={refreshAlbum} info={info} setCurrent={setCurrent} setSword={setSword} /> 
			)}

			<div id='shotlist'>
				{Object.keys(shots).map((shot, index) => {
					return (
						<Shot 
							key={shot}
							code={shot} 
							big={big}
							setBig={setBig} 
							index={index}
							killshot={killshot}
						/> 
					)
				})}
			</div>
		</div>
	);
}



export default Albumview;