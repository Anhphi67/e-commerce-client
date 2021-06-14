import axios from 'axios';
import config from '../src/config'
const instance = axios.create({
    baseURL: config.API,
    headers: { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("token")) }
  });
export default instance;