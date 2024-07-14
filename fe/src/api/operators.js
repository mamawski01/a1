import toast from "react-hot-toast";
import { swalAlert } from "../reusable/utils/helpers";

import connectWithSocketServer from "../feIo/feIo";
import { apiClient } from "./api";

import Swal from "sweetalert2";

export async function getter(
  url,
  mess,
  updater,
  updateRealtime,
  single = true,
  id,
) {
  try {
    connectWithSocketServer();
    if (single) {
      if (!id) return toast.error(mess + " " + "fail to fetch");
      const data = await apiClient.get(url + id);
      toast.success(mess + " " + "fetched successfully");
      updater();
      return data;
    }
    if (!single) {
      const data = await apiClient.get(url);
      toast.success(mess + " " + "fetched successfully");
      updateRealtime(data.data.data);
      return data;
    }
  } catch (exception) {
    toast.error(exception.response.data);
    return exception.response.data;
  }
}

export async function poster(url, mess, updater, newData) {
  try {
    if (mess === "apiUserPostUser") {
      const form = new FormData();
      for (const key in newData) {
        if (key === "image") {
          form.append(key, newData[key][0]);
        } else {
          form.append(key, newData[key]);
        }
      }
      const data = await apiClient.post(url, form);
      toast.success(mess + " " + "created successfully");
      updater();
      return data;
    }

    if (mess === "apiConfirmUserPost") {
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
        const data = await apiClient.post(url, newData);
        toast.success(mess + " " + "created successfully");
        updater();
        return data;
      }
    }
  } catch (exception) {
    toast.error(exception.response.data);
    return exception.response.data;
  }
}

export async function patcher(url, mess, updater, id, newData) {
  try {
    if (mess === "apiUserPatchUser" || mess === "apiConfirmUserPatchUser") {
      const form = new FormData();
      for (const key in newData) {
        if (key === "image") {
          form.append(key, newData[key][0]);
        } else {
          form.append(key, newData[key]);
        }
      }
      const data = await apiClient.patch(url + id, form);
      toast.success(mess + " " + "updated successfully");
      updater();
      return data;
    }
  } catch (exception) {
    toast.error(exception.response.data);
    return exception.response.data;
  }
}

export async function deleter(url, mess, updater, id) {
  try {
    if (mess === "apiUserDeleteUser" || mess === "apiConfirmUserDelete") {
      const confirmDelete = await swalAlert();
      if (confirmDelete.isConfirmed) {
        const data = await apiClient.delete(url + id);
        toast.success(mess + " " + "deleted successfully");
        updater();
        return data;
      }
    }
  } catch (exception) {
    toast.error(exception.response.data);
    return exception.response.data;
  }
}
