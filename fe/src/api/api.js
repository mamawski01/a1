import axios from "axios";
import connectWithSocketServer from "../feIo/feIo";

const apiClient = axios.create({
  baseURL: "http://localhost:7000",
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const userDetails = localStorage.getItem("user");

    if (userDetails) {
      const { token } = JSON.parse(userDetails);
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export async function getUsers() {
  try {
    connectWithSocketServer();
    return await apiClient.get("api/users");
  } catch (exception) {
    return { error: true, exception };
  }
}

export async function registerUser(data) {
  try {
    return await apiClient.post("/api/registerUser", data);
  } catch (exception) {
    return { error: true, exception };
  }
}
