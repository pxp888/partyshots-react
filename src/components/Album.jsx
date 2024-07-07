import React, { useEffect, useState } from 'react';
import { getData } from './helpers';

import './styles/Album.css';
import blankimage from '../assets/blankimage.png'

function Album({code, setSword, setCurrent}) {
    const [info, setInfo] = useState({
        name: 'name', 
        code: 'code',
        user: 'user', 
        created: 'created', 
        thumbnail: null,
    });

    useEffect(() => {
        getData('api/getalbum/', {code: code}, (data) => {
            if (data.code===code){
                setInfo(data);
            }
        });
    }, [code]);

    function handleClick() {
        setSword(code);
        setCurrent('albumview');
    }

    return (
        <div className='album' onClick={handleClick}>
            {!info.thumbnail ? <img src={blankimage} alt='blank' />  
                : <img src={info.thumbnail} alt='album thumbnail' /> }

            <div className="holder">
                <p className='albumname'>{info.name}</p>
                <p className="label">owner</p>
                <p>{info.user}</p>
                <p className="label">created</p>
                <p>{info.created}</p>
            </div>
            
        </div>
    );
}

export default Album;