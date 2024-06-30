import axios from "axios";
import toast from "react-hot-toast";

import connectWithSocketServer, {
  updateRealtime,
  updateRealtimeConfirmUser,
} from "../feIo/feIo";
import { swalAlert } from "../reusable/utils/helpers";
import Swal from "sweetalert2";

const apiClient = axios.create({
  baseURL: "http://localhost:7000",
  timeout: 10000,
});

export async function apiUsers() {
  try {
    connectWithSocketServer();
    const data = await apiClient.get("/apiUsers");
    updateRealtime(data.data.data);
    toast.success("Users fetched successfully");
    return data;
  } catch (exception) {
    toast.error(exception.response.data);
    return exception.response.data;
  }
}

export async function apiUser(userId) {
  try {
    if (!userId) return null;
    const data = await apiClient.get(`/apiUser/${userId}`);
    toast.success("User fetched successfully");
    apiUsers();
    return data;
  } catch (exception) {
    toast.error(exception.response.data);
    return exception.response.data;
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
    toast.error(exception.response.data);
    return exception.response.data;
  }
}

export async function apiUserDeleteUser(userId) {
  try {
    const confirmDelete = await swalAlert();
    if (confirmDelete.isConfirmed) {
      const data = await apiClient.delete(`/apiUserDeleteUser/${userId}`);
      toast.success("User deleted successfully");
      apiUsers();
      return data;
    }
  } catch (exception) {
    toast.error(exception.response.data);
    return exception.response.data;
  }
}

export async function apiUserPatchUser(userId, newUser) {
  const form = new FormData();
  for (const key in newUser) {
    if (key === "image") {
      form.append(key, newUser[key][0]);
    } else {
      form.append(key, newUser[key]);
    }
  }
  try {
    const data = await apiClient.patch(`/apiUserPatchUser/${userId}`, form);
    toast.success("User updated successfully");
    apiUsers();
    return data;
  } catch (exception) {
    console.log(exception);
    toast.error(exception.response.data);
    return exception.response.data;
  }
}

export async function apiTest(newUser) {
  const form = new FormData();
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

////////////////////////////////////

export async function getConfirmUsers() {
  try {
    const data = await apiClient.get("/apiConfirmUsers");
    updateRealtimeConfirmUser(data.data.data);
    toast.success("ConfirmUsers fetched successfully");
    return data;
  } catch (exception) {
    toast.error(exception.response.data);
    return exception.response.data;
  }
}

export async function getConfirmUser(userId) {
  try {
    if (!userId) return null;
    const data = await apiClient.get(`/apiConfirmUser/${userId}`);
    toast.success("User fetched successfully");
    getConfirmUsers();
    return data;
  } catch (exception) {
    toast.error(exception.response.data);
    return exception.response.data;
  }
}

export async function apiConfirmUserPost(confirmUser) {
  try {
    const confirmDelete = await Swal.fire({
      title: "Are you sure to confirm this user?",
      text: "User will be move to confirmed list",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, move to confirmed list!",
      customClass: {
        popup: "bg-slate-100/80 backdrop-blur-sm",
      },
    });
    if (confirmDelete.isConfirmed) {
      const data = await apiClient.post("/apiConfirmUserPost", confirmUser);
      toast.success("New confirmUser created successfully");
      getConfirmUsers();
      apiUsers();
      return data;
    }
  } catch (exception) {
    console.log(exception);
    toast.error(exception.response.data);
    return exception.response.data;
  }
}

export async function apiConfirmUserPatchUser(userId, newUser) {
  const form = new FormData();
  for (const key in newUser) {
    if (key === "image") {
      form.append(key, newUser[key][0]);
    } else {
      form.append(key, newUser[key]);
    }
  }
  try {
    const data = await apiClient.patch(
      `/apiConfirmUserPatchUser/${userId}`,
      form,
    );
    toast.success("User updated successfully");
    getConfirmUsers();
    return data;
  } catch (exception) {
    toast.error(exception.response.data);
    return exception.response.data;
  }
}

export async function apiConfirmUserDelete(userId) {
  try {
    const confirmDelete = await swalAlert();
    if (confirmDelete.isConfirmed) {
      const data = await apiClient.delete(`/apiConfirmUserDelete/${userId}`);
      toast.success("Confirmser deleted successfully");
      getConfirmUsers();
      return data;
    }
  } catch (exception) {
    toast.error(exception.response.data);
    return exception.response.data;
  }
}
