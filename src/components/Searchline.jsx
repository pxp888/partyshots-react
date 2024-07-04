import { useState,  } from 'react';

import { getData } from './helpers';


function Searchline({setSword, setCurrent }) {
	const [message, setMessage] = useState('');
	
	function search(e) {
		e.preventDefault();
		let sword = e.target[0].value;
		getData('api/search/', {sword: sword}, (data) => {
			if (data.found==='user'){
				setSword(sword);
				setCurrent('userview');
			}
			else if (data.found==='album'){
				setSword(sword);
				setCurrent('albumview');
			}
			else if (data.found==='nada') {
				setMessage('Nothing found');
			}
		});
		setSword(sword);
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