/* eslint-disable no-undef */
import axios from "axios";
import { _getTokenFromStorage } from "../utils";

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BACKEND_BASEURL,
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Origin": process.env.REACT_APP_BACKEND_BASEURL,
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = _getTokenFromStorage("accessToken");
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;