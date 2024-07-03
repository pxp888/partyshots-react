import axios from 'axios';

const baseURL = 'http://localhost:8000/';


function getData(url, param, callback) {
    let furl = baseURL + url;
    axios.get(furl, { params: param })
    .then(response => {
        callback(response.data);
    })
    .catch(error => {
        console.log(error);
    });
}


function postData(url, param, callback) {
    let furl = baseURL + url;
	axios.post(furl, param)
	.then(response => {
		callback(response.data);})
	.catch(error => { console.log(error); });
}

export { getData, postData }
