import React, { useEffect, useState } from 'react';
import { getData } from './helpers';

import LogoutButton from './accounts/LogoutButton';
import Searchline from './Searchline';


import './styles/Topbar.css';


function Topbar({ sword, setSword, setCurrent}) {
	const [username, setUsername] = useState('');

	function logoClicked(e) {
		e.preventDefault();
		if (username !== ''){
			setSword(username);
			setCurrent('userview');
		}
		else {
			setCurrent('landing');
		}
	}
	
	function login(e) {
		e.preventDefault();
		setCurrent('login');
	}

	function register(e) {
		e.preventDefault();
		setCurrent('register');
	}

	useEffect(() => {
		getData('api/whoami/', {sword: sword}, (data) => {
			if (data.message==='logged in'){
				setUsername(data.user);
			}
			else {
				setUsername('');
			}
		}, [sword]);
	});

	return (
		<>
			<div id="topbar">
				<p className="logo" onClick={logoClicked}>partyShots</p>

				<Searchline 
					setSword={setSword}
					setCurrent={setCurrent}
				/>
				
				{username === '' ? 
					<nav>
						<p onClick={login}>login</p>
						<p onClick={register}>register</p>
					</nav>
					:
					<nav>
						<p onClick={logoClicked}>{username}</p>
						<LogoutButton setCurrent={setCurrent} />
					</nav>
				}
			</div>
			<div id="topspacer"></div>
		</>
	)
};

export default Topbar;

