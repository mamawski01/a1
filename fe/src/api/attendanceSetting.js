import { updateRealtimeAttendanceSettings } from "../feIo/feIo";
import { getter, patcher, poster } from "./operators";

export async function apiAttendanceSettings() {
  return getter(
    "Attendance Setting fetched",
    "/apiAttendanceSettings",
    apiAttendanceSettings,
    updateRealtimeAttendanceSettings,
    false,
  );
}

export async function apiAttendanceSetting(id) {
  return getter(
    "Attendance Setting",
    "/apiAttendanceSetting/",
    apiAttendanceSettings,
    updateRealtimeAttendanceSettings,
    true,
    id,
  );
}

export async function apiAttendanceSettingPost(data) {
  return poster(
    "Setting created",
    "/apiAttendanceSettingPost",
    apiAttendanceSettings,
    data,
    true,
  );
}

export async function apiAttendanceSettingPatch(id, data) {
  return patcher(
    "Setting updated",
    "/apiAttendanceSettingPatch/",
    apiAttendanceSettings,
    id,
    data,
    true,
  );
}
