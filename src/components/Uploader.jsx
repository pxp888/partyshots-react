import CryptoJS from 'crypto-js';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import { useState,  } from 'react';
import { getData, postData } from './helpers';

function md5(blob) {
    const hash = CryptoJS.MD5(blob);
    return hash.toString(CryptoJS.enc.Hex);
}


function Uploader({code, refreshAlbum, info, setCurrent, setSword }) {

	const [togo, setTogo] = useState(0);

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
						setTogo(togo - 1);
						if (togo === 0) refreshAlbum();
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
		setTogo(files.length);
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
				setSword(info.user);
				setCurrent('userview');
			}
			else {
				console.log(data);
			}
		});
	}

	function downloadall(e) {
		e.preventDefault();
		const zip = new JSZip();
	
		getData('api/get_album_links/', {code: code}, (data) => {
			let links = data.links;
			let filenames = data.names;
	
			const promises = links.map((link, index) => 
				fetch(link)
					.then(response => {
						if (response.status === 200) return response.blob();
						throw new Error('Network response was not ok.');
					})
					.then(blob => {
						const filename = filenames[index]; 
						zip.file(filename, blob); 
					})
					.catch(error => console.error('There was a problem with your fetch operation:', error))
			);
	
			Promise.all(promises).then(() => {
				zip.generateAsync({type:"blob"}).then(function(content) {
					saveAs(content, info.name+".zip"); 
				});
			});
		});
	}
	

	return (
		<div id='uploader'>
			<form className='formdiv' onSubmit={uploadFiles}>
				<input type='file' name='file' multiple/>
				<input type="text" placeholder='description (optional)' />
				<button>add to album</button>
			</form>
			
			{togo > 0 && <p>Uploading {togo} files...</p>}

			<form className='formdiv' onSubmit={(e)=>{e.preventDefault();}}>
				<button onClick={downloadall}>Download</button>
				{info.status === 1 && <button onClick={subscribe}>Subscribe</button>}
				{info.status === 2 && <button onClick={unsubscribe}>Leave</button>}
				{info.status === 3 && <button onClick={deleteAlbum}>Delete</button>}
			</form>
		</div>
	);
}

export default Uploader;