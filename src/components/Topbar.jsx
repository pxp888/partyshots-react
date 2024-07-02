import axios from 'axios';
import LogoutButton from './accounts/Logout';

import './Topbar.css';



function Topbar({current, setCurrent, uname, setUname}) {
	function logoClicked(e) {
		e.preventDefault();
		setCurrent('landing');
	}
	
	function login(e) {
		e.preventDefault();
		setCurrent('login');
	}

	function register(e) {
		e.preventDefault();
		setCurrent('register');
	}

	return (
		<div id="topbar">
			<p className="logo" onClick={logoClicked}>myApp</p>
			{uname === '' ? 
				<nav>
					<p onClick={login}>Login</p>
					<p onClick={register}>register</p>
				</nav>
				:
				<nav>
					<p>{uname}</p>
					<LogoutButton setUname={setUname} setCurrent={setCurrent} />
				</nav>	
			}
		</div>
	)
};

export default Topbar;

