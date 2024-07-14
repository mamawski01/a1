import { updateRealtimeConfirmUser } from "../feIo/feIo";
import { apiConfirmUsers } from "./confirmUser";
import { getter, patcher } from "./operators";

export async function apiAttendanceId(id) {
  return getter(
    "Single Attendance Id fetched",
    "/apiConfirmUserPatchUser/",
    apiConfirmUsers,
    updateRealtimeConfirmUser,
    true,
    id,
  );
}

export async function apiAttendanceIdPatch(id, confirmUser) {
  return patcher(
    "User id updated",
    "/apiAttendanceIdPatch/",
    apiConfirmUsers,
    id,
    confirmUser,
    true,
  );
}
