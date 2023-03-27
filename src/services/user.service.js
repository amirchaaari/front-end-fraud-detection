import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getOwnerBoard = () => {
  return axios.get(API_URL + "owner", { headers: authHeader() });
};

const getFraudAnalystBoard = () => {
  return axios.get(API_URL + "fraud-analyst", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};
const getSupervisorBoard = () => {
  return axios.get(API_URL + "supervisor", { headers: authHeader() });
};

const UserService = {
  getPublicContent,
  getOwnerBoard,
  getFraudAnalystBoard,
  getAdminBoard,
  getSupervisorBoard
};

export default UserService;