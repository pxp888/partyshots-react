import axios from 'axios';

function LogoutButton({setUname, setCurrent}){
    function logout(e) {
		e.preventDefault();
		axios.post('http://localhost:8000/api/logout/', {
			message: 'logout',
		}).then(response => {
			axios.defaults.headers.common['Authorization'] = null;
			localStorage.removeItem('access_token');
			localStorage.removeItem('refresh_token');
			setUname('');
			setCurrent('landing');
		}).catch(error => { console.log(error); });
	};

    return (
        <p onClick={logout}>Logout</p>
    );
}

export default LogoutButton;