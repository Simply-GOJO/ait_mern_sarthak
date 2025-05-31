import axios from 'axios'
const config = {
    baseURL: 'http://localhost:8080',
    headers :{
        'Content-type' : 'application/json'
    }
};
let network = axios.create(config)
export default network;