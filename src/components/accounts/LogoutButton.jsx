import axios from 'axios';

import { postData } from '../helpers';

function LogoutButton({setUname, setCurrent}){
    function logout(e) {
		e.preventDefault();

		postData('api/logout/', {message: 'logout'}, (data) => {
				axios.defaults.headers.common['Authorization'] = null;
				localStorage.removeItem('access_token');
				localStorage.removeItem('refresh_token');
				setUname('');
				setCurrent('landing');
			});
	};



    return (
        <p onClick={logout}>Logout</p>
    );
}

export default LogoutButton;

