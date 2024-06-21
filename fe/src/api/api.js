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

export async function apiUserPostUser(newUser) {
  try {
    const data = await apiClient.post("/apiUserPostUser", newUser);
    toast.success("New user created successfully");
    return data;
  } catch (exception) {
    console.log(exception);
    toast.error(exception.response.data);
    return exception.response.data;
  }
}

export async function apiUserDeleteUser(userId) {
  try {
    const data = await apiClient.delete(`/apiUserDeleteUser/${userId}`);
    toast.success("User deleted successfully");
    return data;
  } catch (exception) {
    toast.error(exception.message);
    return exception.message;
  }
}
