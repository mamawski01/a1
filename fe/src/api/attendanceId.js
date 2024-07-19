import { updateRealtimeConfirmUser } from "../feIo/feIo";
import { getter, patcher } from "./operators";

export async function apiAttendanceId(id) {
  return getter(
    "Single Attendance Id fetched",
    "/apiConfirmUserPatchUser/",
    updateRealtimeConfirmUser,
    true,
    id,
  );
}

export async function apiAttendanceIdPatch(id, confirmUser) {
  return patcher(
    "User id updated",
    "/apiAttendanceIdPatch/",
    id,
    confirmUser,
    true,
  );
}
