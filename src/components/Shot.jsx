import React, { useEffect, useState } from 'react';
import { getData } from './helpers';

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
			<div>
				<div className='shotinfo'>
					<p className="label">filename</p>
					<p>{info.filename}</p>
					<p className="label">user</p>
					<p>{info.user}</p>
					<p className="label">created</p>
					<p>{info.created}</p>
				</div>
			</div>
		</div>
	);
}

export default Shot;
