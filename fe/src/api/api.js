import axios from "axios";
import toast from "react-hot-toast";

import { updateRealtimeAttendance } from "../feIo/feIo";

export const apiClient = axios.create({
  baseURL: "http://localhost:7000",
  timeout: 10000,
});

//attendance
export async function apiAttendances() {
  try {
    const data = await apiClient.get("/apiAttendances");
    updateRealtimeAttendance(data.data.data);
    toast.success("Attendances fetched successfully");
    return data;
  } catch (exception) {
    toast.error(exception.response.data);
    return exception.response.data;
  }
}

export async function apiAttendancesPost(attendance) {
  console.log(attendance);
  try {
    const data = await apiClient.post("/apiAttendancesPost", attendance);
    toast.success("New attendance created successfully");
    apiAttendances();
    getConfirmUsers();
    // apiUsers();
    return data;
  } catch (exception) {
    console.log(exception);
    toast.error(exception.response.data);
    return exception.response.data;
  }
}

//attendanceId
export async function apiAttendanceId(userId) {
  try {
    if (!userId) return null;
    const data = await apiClient.get(`/apiConfirmUserPatchUser/${userId}`);
    toast.success("UserId fetched successfully");
    return data;
  } catch (exception) {
    toast.error(exception.response.data);
    return exception.response.data;
  }
}

export async function apiAttendanceIdPatch(userId, newUser) {
  try {
    const data = await apiClient.patch(
      `/apiAttendanceIdPatch/${userId}`,
      newUser,
    );
    toast.success("UserId updated successfully");
    return data;
  } catch (exception) {
    toast.error(exception.response.data);
    return exception.response.data;
  }
}
