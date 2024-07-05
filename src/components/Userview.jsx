import React, { useEffect, useState } from 'react';
import { getData, postData } from './helpers';

import Album from './Album';
import './styles/Userview.css';


function Userview({sword, setSword, setCurrent, uname}) {
    const [message, setMessage] = useState('');
    const [albums, setAlbums] = useState({});

    useEffect(() => {
        getData('api/getalbums/', {sword: sword}, (data) => {
            if (data.message==='ok'){
                setAlbums(data.albums);
            }
            else {
                setMessage(data.message);
            }
        });
    }, [sword]);

    function createAlbum(event) {
        event.preventDefault();
        const abname = event.target.abname.value;
        if (abname==='') {
            const alert = window.alert('Album name cannot be empty');
            return;
        }

        postData('api/abcreate/', {sword: sword, abname: abname}, (data) => {
            if (data.message==='ok'){
                setAlbums(data.albums);
            }
            else {
                setMessage(data.message);
            }
        });
    }


    return (
        <div id='userview'>
            <p className='msgline'>{message}</p>

            {uname === sword && (
                <div id="abmaker">
                    <form className="formdiv" onSubmit={createAlbum}>
                        <label htmlFor="abname">New Album Name: </label>
                        <input type="text" name="abname" placeholder='album name' onChange={()=>{setMessage('');}} />
                        <button>Create Album</button>
                    </form>
                </div>
            )}

            <div id='albumlist'>
                {Object.keys(albums).map((album, index) => {
                    return (
                        <Album key={album} code={album} setSword={setSword} setCurrent={setCurrent}/>
                    )
                })}
            </div>
        </div>
    );
}

export default Userview;
