import LogoutButton from './accounts/LogoutButton';
import Searchline from './Searchline';

import './Topbar.css';


function Topbar({setCurrent, uname, setUname, setSword}) {
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
			<Searchline 
				setSword={setSword}
				setCurrent={setCurrent}
			/>
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

