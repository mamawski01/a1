import { updateRealtimeConfirmUser } from "../feIo/feIo";
import { deleter, getter, patcher, poster } from "./operators";

export async function apiConfirmUsers() {
  return getter(
    "Users fetched",
    "/apiConfirmUsers",
    updateRealtimeConfirmUser,
    false,
  );
}

export async function apiConfirmUser(id) {
  return getter(
    "Single User fetched",
    "/apiConfirmUser/",
    updateRealtimeConfirmUser,
    true,
    id,
  );
}

export async function apiConfirmUserPost(data) {
  return poster("User created", "/apiConfirmUserPost", data);
}

export async function apiConfirmUserPatchUser(id, data) {
  return patcher("User updated", "/apiConfirmUserPatchUser/", id, data);
}

export async function apiConfirmUserDelete(id, id2nd) {
  return deleter("User deleted", "/apiConfirmUserDelete/", id, false, id2nd);
}
