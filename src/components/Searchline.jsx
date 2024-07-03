import { useState } from 'react';

import { getData } from './helpers';

import './Searchline.css';

function Searchline({setCode, setCurrent}) {
	const [message, setMessage] = useState('');
	
	function search(e) {
		e.preventDefault();
		let scode = e.target[0].value;
		getData('api/search/', {scode:scode}, (data) => {
			if (data.found==='not found'){
				setMessage('not found : ' + data.scode);
				return;
			}
			if (data.found==='user'){
				setCode(scode);
				setCurrent('user');
			}
		});
	}
	
	return (
		<div id="searchDiv" className='formdiv'>
			<form onSubmit={search}>
				<input type="text" placeholder="Search..." onChange={()=>{setMessage('')}}/>
				<button>Search</button>
			</form>
			{message!=='' && <p>{message}</p>}
		</div>
  	);
}

export default Searchline;