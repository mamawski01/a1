import toast from "react-hot-toast";
import axios from "axios";

import { swalAlert } from "../reusable/utils/helpers";
import connectWithSocketServer from "../feIo/feIo";
import { apiAttendances } from "./attendance";
import { apiAttendanceSettings } from "./attendanceSetting";
import { apiConfirmUsers } from "./confirmUser";
import { apiUsers } from "./userRegister";
import { apiSchedules } from "./schedule";

const apiClient = axios.create({
  baseURL: "http://localhost:7000",
  timeout: 10000,
});

function updater() {
  apiAttendances();
  apiAttendanceSettings();
  apiConfirmUsers();
  apiUsers();
  apiSchedules();
}

export async function getter(custMess, url, updateRealtime, single = true, id) {
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

export async function poster(custMess, url, newData, simple = "", id) {
  try {
    if (simple === "simple") {
      const data = await apiClient.post(url, newData);
      toast.success(custMess);
      updater();
      return data;
    }
    if (url === "/apiSchedulesPostPatch") {
      const data = await apiClient.patch(url + "/" + id, newData);
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

export async function patcher(custMess, url, id, newData, simple = "", id2nd) {
  try {
    if (simple === "simple") {
      const data = await apiClient.patch(url + id, newData);
      toast.success(custMess);
      updater();
      return data;
    }
    if (id2nd) {
      const data = await apiClient.patch(url + id + "/" + id2nd, newData);
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

export async function deleter(custMess, url, id, simple = false, id2nd) {
  console.log(id2nd);
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
    if (!simple && id2nd) {
      const confirmDelete = await swalAlert();
      if (confirmDelete.isConfirmed) {
        const data = await apiClient.delete(url + id + "/" + id2nd);
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
