import React, { useState } from 'react';

import Topbar from './components/Topbar';
import Landing from './components/Landing';
import Login from './components/accounts/Login';
import Register from './components/accounts/Register';

import './App.css';


function App() {
	const [current, setCurrent] = useState('landing');
	const [uname, setUname] = useState('');
	const [code, setCode] = useState('');

	return (
		<div className="App">
			<Topbar 
				setCurrent={setCurrent} 
				uname={uname} 
				setUname={setUname}
				code={code}
				setCode={setCode}
			/>
			{current === 'landing' && <Landing />}
			{current === 'login' && <Login setCurrent={setCurrent} setUname={setUname} />}
			{current === 'register' && <Register setCurrent={setCurrent} />}
			
		</div>
	);
}

export default App;
