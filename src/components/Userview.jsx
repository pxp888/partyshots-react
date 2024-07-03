import React, { useEffect, useState } from 'react';
import { getData, postData } from './helpers';

import Album from './Album';

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
        <div>
            <h1>Userview</h1>
            <p>Search term: {sword}</p>
            <p>{message}</p>

            {uname === sword && (
                <div className="abmaker">
                    <form className="formdiv" onSubmit={createAlbum}>
                        <label htmlFor="abname">New Album Name: </label>
                        <input type="text" name="abname" placeholder='album name' />
                        <button>Create Album</button>
                    </form>
                </div>
            )}


            <div className='albumlist'>
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
