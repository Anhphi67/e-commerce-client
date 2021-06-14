import axios from "axios";
import config from '../config'
const API_URL = config.API;
class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "AuthManagement/Login", { email, password })
      .then((response) => {
        if (response.data.result) {
          localStorage.setItem("token", JSON.stringify(response.data.token));
          debugger
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
        return response;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(data) {
    return axios.post(API_URL + "AuthManagement/Register", data).then((response) => {
      if (response.data.result) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response;
    });;
  }
}

export default new AuthService();