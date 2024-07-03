import React, { useEffect, useState } from 'react';
import { getData } from './helpers';

import './Album.css';

function Album({code, setSword, setCurrent}) {
    const [info, setInfo] = useState({
        name: 'name', 
        code: 'code',
        user: 'user', 
        created: 'created', 
        thumbnail: 'thumbnail',
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
            <p>{info.name}</p>
            <p>{info.thumbnail}</p>
            <p>{info.created}</p>
            <p>{info.code}</p>
        </div>
    );
}

export default Album;