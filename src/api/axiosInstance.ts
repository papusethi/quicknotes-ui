import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:12000/",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});
