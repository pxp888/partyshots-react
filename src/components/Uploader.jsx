import CryptoJS from 'crypto-js';

import { postData } from './helpers';

function md5(blob) {
    const hash = CryptoJS.MD5(blob);
    return hash.toString(CryptoJS.enc.Hex);
}


function Uploader({code, refreshAlbum, info,}) {

	function uploadFile(file) {
		const chunkSize = 1024 * 1024;
    	const filename = file.name;
		let reader = new FileReader();
		reader.onload = function(e) {
			let blob = e.target.result;
			let hash = md5(blob);
	
			let size = blob.length;
			let chunks = Math.ceil(size / chunkSize);
			for (let i = 0; i < chunks; i++) {
				let start = i * chunkSize;
				let end = Math.min(size, start + chunkSize);
				let data = blob.slice(start, end);
				let msg = {
					'code': code,
					'chunk': i,
					'chunks': chunks,
					'data': data,
					'filename': filename,
					'hash': hash,
				};
				postData('api/upload/', msg, (data) => {
					if(data.message==='up'){
						refreshAlbum();
					}
				});
			}
		}
		reader.readAsDataURL(file);
	}


	function uploadFiles(event) {
		event.preventDefault();
		const form = event.target;
		const files = form.file.files;
		for (let i = 0; i < files.length; i++) {
			uploadFile(files[i]);
		}
	}


	function subscribe(e) {
		e.preventDefault();
		postData('api/subscribe/', {code: code}, (data) => {
			if(data.message==='subscribed'){
				refreshAlbum();
			}
			else {
				console.log(data);
			}
		});
	}

	function unsubscribe(e) {
		e.preventDefault();
		postData('api/unsubscribe/', {code: code}, (data) => {
			if(data.message==='unsubscribed'){
				refreshAlbum();
			}
			else {
				console.log(data);
			}
		});
	}

	function deleteAlbum(e) {
		e.preventDefault();
		const confirm = window.confirm('Are you sure you want to delete this album?');
		if (!confirm) {return;}

		postData('api/killbum/', {code: code}, (data) => {
			if(data.message==='deleted'){
				refreshAlbum();
			}
			else {
				console.log(data);
			}
		});
	}
	
	return (
		<div id='uploader'>
			<form className='formdiv' onSubmit={uploadFiles}>
				<input type='file' name='file' multiple/>
				<input type="text" placeholder='description (optional)' />
				<button>add to album</button>
			</form>

			<form className='formdiv' onSubmit={(e)=>{e.preventDefault();}}>
				{info.status === 'guest' && <button onClick={subscribe}>Subscribe</button>}
				{info.status === 'subscribed' && <button onClick={unsubscribe}>Leave</button>}
				{info.status === 'owner' && <button onClick={deleteAlbum}>Delete</button>}
			</form>
		</div>
	);
}

export default Uploader;