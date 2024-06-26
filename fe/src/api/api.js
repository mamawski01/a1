import axios from "axios";
import connectWithSocketServer, { updateRealtime } from "../feIo/feIo";
import toast from "react-hot-toast";

const apiClient = axios.create({
  baseURL: "http://localhost:7000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export async function apiUsers() {
  try {
    connectWithSocketServer();
    const data = await apiClient.get("/apiUsers");
    updateRealtime(data.data.users);
    toast.success("Users fetched successfully");
    return data;
  } catch (exception) {
    return { error: true, exception };
  }
}

export async function apiUser(userId) {
  try {
    const data = await apiClient.get(`/apiUser/${userId}`);
    toast.success("User fetched successfully");
    return data;
  } catch (exception) {
    return { error: true, exception };
  }
}

export async function apiUserPostUser(newUser) {
  const form = new FormData();
  for (const key in newUser) {
    if (key === "image") {
      form.append(key, newUser[key][0]);
    } else {
      form.append(key, newUser[key]);
    }
  }
  try {
    const data = await apiClient.post("/apiUserPostUser", form);
    toast.success("New user created successfully");
    apiUsers();
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
    apiUsers();
    return data;
  } catch (exception) {
    toast.error(exception.message);
    return exception.message;
  }
}

export async function apiUserPatchUser(userId) {
  try {
    const data = await apiClient.patch(`/apiUserPatchUser/${userId}`);
    toast.success("User updated successfully");
    apiUsers();
    return data;
  } catch (exception) {
    toast.error(exception.message);
    return exception.message;
  }
}

export async function apiTest(newUser) {
  const form = new FormData();
  // form.append("image", newUser.image[0]);
  // form.append("name", newUser.name);
  for (const key in newUser) {
    if (key === "image") {
      form.append(key, newUser[key][0]);
    } else {
      form.append(key, newUser[key]);
    }
  }
  try {
    const data = await apiClient.post("/apiTest", form);
    toast.success("New test created successfully");
    return data;
  } catch (exception) {
    console.log(exception);
    toast.error(exception.response.data);
    return exception.response.data;
  }
}
