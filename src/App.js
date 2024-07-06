import React, { useState } from 'react';

import Topbar from './components/Topbar';
import Landing from './components/Landing';
import Login from './components/accounts/Login';
import Register from './components/accounts/Register';
import Userview from './components/Userview';
import Albumview from './components/Albumview';

import './App.css';


function App() {
	const [current, setCurrent] = useState('landing');
	const [sword, setSword] = useState('');

	return (
		<div className="App">
			<Topbar 
				sword={sword}
				setSword={setSword}
				setCurrent={setCurrent} 
			/>
			{current === 'landing' && <Landing />}
			{current === 'login' && <Login setSword={setSword} setCurrent={setCurrent} />}
			{current === 'register' && <Register setCurrent={setCurrent} />}
			{current === 'userview' && <Userview sword={sword} setSword={setSword} setCurrent={setCurrent} />}
			{current === 'albumview' && <Albumview code={sword} setCurrent={setCurrent} setSword={setSword} />}
		</div>
	);
}

export default App;
