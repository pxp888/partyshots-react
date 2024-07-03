import { useState } from 'react';
import axios from 'axios';

import Createbox from './Createbox';


function Vuser({code, setCode, uname}) {
    
    return (
        <div>
            <h1>User</h1>
            {uname === code && <Createbox />}
        </div>
    );
}

export default Vuser;