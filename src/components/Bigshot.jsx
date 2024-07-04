import React, { useEffect } from 'react';

import './styles/Bigshot.css';

function Bigshot({link, big, setBig}) {
    
    function close(e) {
        e.preventDefault();
        setBig(-1);
    }

    function next(e) {
        e.preventDefault();
        setBig(big+1);
    }

    function prev(e) {
        e.preventDefault();
        if (big > 0){
            setBig(big-1);
        }
    }

    function handleKeyDown(e) {
        switch(e.key) {
            case 'ArrowLeft':
                prev(e);
                break;
            case 'ArrowRight':
                next(e);
                break;
            case 'Escape':
                close(e);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [big]);
    

    return (
        <div className="bigshot" >
            <img src={link} alt="full photo" />
            <div className='mousearea'>
                <div className="prevarea" onClick={prev}></div>            
                <div className="closearea" onClick={close}></div>
                <div className="nextarea" onClick={next}></div>
            </div>
        </div>
    );
}

export default Bigshot;