import axios from "axios";

const API_URL = "http://localhost:8082/api/auth/";
const API_LOCAL="http://localhost:8082/"

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

 const forgotpassword = async (email) => {
  try {
    const response = await axios.post(API_LOCAL + "forgot-password", {
      email,
    });
    return response.data.message;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};


const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  forgotpassword
};

export default AuthService;