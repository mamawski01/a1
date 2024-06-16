import axios from "axios";
import connectWithSocketServer from "../feIo/feIo";
import toast from "react-hot-toast";

const apiClient = axios.create({
  baseURL: "http://localhost:7000",
  timeout: 10000,
});

export async function apiUsers() {
  try {
    connectWithSocketServer();
    const data = await apiClient.get("/apiUsers");
    toast.success("Users fetched successfully");
    return data;
  } catch (exception) {
    return { error: true, exception };
  }
}

export async function apiUserPostUser(data) {
  try {
    await apiClient.post("/apiUserPostUser", data);
    toast.success("User created successfully");
  } catch (exception) {
    toast.error(exception.message);
    return exception.message;
  }
}

export async function apiUserDeleteUser(userId) {
  try {
    await apiClient.delete(`/apiUserDeleteUser/${userId}`);
    toast.success("User deleted successfully");
  } catch (exception) {
    toast.error(exception.message);
    return exception.message;
  }
}
