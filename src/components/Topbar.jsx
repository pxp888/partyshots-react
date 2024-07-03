import LogoutButton from './accounts/Logout';
import Searchline from './Searchline';

import './Topbar.css';


function Topbar({setCurrent, uname, setUname, code, setCode}) {
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
			<Searchline code={code} setCode={setCode} setCurrent={setCurrent} />
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

