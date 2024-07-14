import { updateRealtimeConfirmUser } from "../feIo/feIo";
import { deleter, getter, patcher, poster } from "./operators";

export async function apiConfirmUsers() {
  return getter(
    "Users fetched",
    "/apiConfirmUsers",
    apiConfirmUsers,
    updateRealtimeConfirmUser,
    false,
  );
}

export async function apiConfirmUser(id) {
  return getter(
    "Single User fetched",
    "/apiConfirmUser/",
    apiConfirmUsers,
    updateRealtimeConfirmUser,
    true,
    id,
  );
}

export async function apiConfirmUserPost(data) {
  return poster("User created", "/apiConfirmUserPost", apiConfirmUsers, data);
}

export async function apiConfirmUserPatchUser(id, data) {
  return patcher(
    "User updated",
    "/apiConfirmUserPatchUser/",
    apiConfirmUsers,
    id,
    data,
  );
}

export async function apiConfirmUserDelete(id) {
  return deleter(
    "User deleted",
    "/apiConfirmUserDelete/",
    apiConfirmUsers,
    id,
    true,
  );
}
