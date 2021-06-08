import axios from 'axios';
import config from '../src/config'
const instance = axios.create({
    baseURL: config.API,
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
  });
export default instance;