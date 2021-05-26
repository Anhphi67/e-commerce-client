import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://localhost:44377/api/',
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
  });
export default instance;