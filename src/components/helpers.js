import axios from 'axios';

function getData(url, msg, callback) {
	axios.post(url, msg)
	.then(response => {
		callback(null, response.data);})
	.catch(error => { console.log(error); });
}
	

export { getData };
