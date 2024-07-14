import toast from "react-hot-toast";
import axios from "axios";

import { swalAlert } from "../reusable/utils/helpers";
import connectWithSocketServer from "../feIo/feIo";

const apiClient = axios.create({
  baseURL: "http://localhost:7000",
  timeout: 10000,
});

export async function getter(
  custMess,
  url,
  updater,
  updateRealtime,
  single = true,
  id,
) {
  try {
    connectWithSocketServer();
    if (single) {
      if (!id) return toast.error(custMess);
      const data = await apiClient.get(url + id);
      toast.success(custMess);
      updater();
      return data;
    }
    if (!single) {
      const data = await apiClient.get(url);
      toast.success(custMess);
      updateRealtime(data.data.data);
      return data;
    }
  } catch (exception) {
    toast.error(exception.response.data);
    return exception.response.data;
  }
}

export async function poster(custMess, url, updater, newData, simple = false) {
  try {
    if (simple) {
      const data = await apiClient.post(url, newData);
      toast.success(custMess);
      updater();
      return data;
    }
    if (url === "/apiUserPostUser") {
      const form = new FormData();
      for (const key in newData) {
        if (key === "image") {
          form.append(key, newData[key][0]);
        } else {
          form.append(key, newData[key]);
        }
      }
      const data = await apiClient.post(url, form);
      toast.success(custMess);
      updater();
      return data;
    }

    if (url === "/apiConfirmUserPost") {
      const confirmDelete = await swalAlert(
        "Are you sure to confirm this user?",
        "User will be move to confirmed list",
        "Yes, move to confirmed list!",
      );
      if (confirmDelete.isConfirmed) {
        const data = await apiClient.post(url, newData);
        toast.success(custMess);
        updater();
        return data;
      }
    }
  } catch (exception) {
    toast.error(exception.response.data);
    return exception.response.data;
  }
}

export async function patcher(
  custMess,
  url,
  updater,
  id,
  newData,
  simple = false,
) {
  try {
    if (simple) {
      const data = await apiClient.patch(url + id, newData);
      toast.success(custMess);
      updater();
      return data;
    }
    if (url === "/apiUserPatchUser/" || url === "/apiConfirmUserPatchUser/") {
      const form = new FormData();
      for (const key in newData) {
        if (key === "image") {
          form.append(key, newData[key][0]);
        } else {
          form.append(key, newData[key]);
        }
      }
      const data = await apiClient.patch(url + id, form);
      toast.success(custMess);
      updater();
      return data;
    }
  } catch (exception) {
    toast.error(exception.response.data);
    return exception.response.data;
  }
}

export async function deleter(custMess, url, updater, id, simple = false) {
  try {
    if (simple) {
      const confirmDelete = await swalAlert();
      if (confirmDelete.isConfirmed) {
        const data = await apiClient.delete(url + id);
        toast.success(custMess);
        updater();
        return data;
      }
    }
  } catch (exception) {
    toast.error(exception.response.data);
    return exception.response.data;
  }
}
