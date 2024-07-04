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
        setBig(big-1);
    }

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