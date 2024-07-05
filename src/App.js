import React, { useEffect, useState,  } from 'react';

import Topbar from './components/Topbar';
import Landing from './components/Landing';
import Login from './components/accounts/Login';
import Register from './components/accounts/Register';
import Userview from './components/Userview';
import Albumview from './components/Albumview';

import './App.css';


function App() {
	const [current, setCurrent] = useState('landing');
	const [uname, setUname] = useState('');
	const [sword, setSword] = useState('');

	useEffect(() => {
		if (current==='newlogin'){
			setSword(uname);
			setCurrent('userview');
		}
	}, [current, uname]);

	return (
		<div className="App">
			<Topbar 
				setCurrent={setCurrent} 
				uname={uname} 
				setUname={setUname}
				setSword={setSword}
			/>
			<div className="topspacer"></div>
			{current === 'landing' && <Landing />}
			{current === 'login' && <Login setCurrent={setCurrent} setUname={setUname} />}
			{current === 'register' && <Register setCurrent={setCurrent} />}
			{current === 'userview' && <Userview sword={sword} setSword={setSword} setCurrent={setCurrent} uname={uname} />}
			{current === 'albumview' && <Albumview code={sword} uname={uname} setCurrent={setCurrent} setSword={setSword} />}
		</div>
	);
}

export default App;
