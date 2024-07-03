import { useState } from 'react';

import { getData } from './helpers';

import './Searchline.css';

function Searchline({code, setCode, setCurrent}) {
	const [message, setMessage] = useState('');
	
	function search(e) {
		e.preventDefault();
		let scode = e.target[0].value;
		getData('api/search/', {scode:scode}, (data) => {
			if (data.found==='not found'){
				setMessage('not found : ' + data.scode);
				return;
			}
		});
	}
	
	return (
		<div id="searchDiv">
			<form onSubmit={search}>
				<input type="text" placeholder="Search..." onChange={()=>{setMessage('')}}/>
				<button>Search</button>
			</form>
			{message!=='' && <p>{message}</p>}
		</div>
  	);
}

export default Searchline;