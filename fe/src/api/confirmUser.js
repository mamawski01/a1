import { updateRealtimeConfirmUser } from "../feIo/feIo";
import { deleter, getter, patcher, poster } from "./operators";

export async function apiConfirmUsers() {
  return getter(
    "/apiConfirmUsers",
    "apiConfirmUsers",
    apiConfirmUsers,
    updateRealtimeConfirmUser,
    false,
  );
}

export async function apiConfirmUser(id) {
  return getter(
    "/apiConfirmUser/",
    "apiConfirmUser",
    apiConfirmUsers,
    updateRealtimeConfirmUser,
    true,
    id,
  );
}

export async function apiConfirmUserPost(confirmUser) {
  return poster(
    "/apiConfirmUserPost",
    "apiConfirmUserPost",
    apiConfirmUsers,
    confirmUser,
  );
}

export async function apiConfirmUserPatchUser(id, confirmUser) {
  return patcher(
    "/apiConfirmUserPatchUser/",
    "apiConfirmUserPatchUser",
    apiConfirmUsers,
    id,
    confirmUser,
  );
}

export async function apiConfirmUserDelete(id) {
  return deleter(
    "/apiConfirmUserDelete/",
    "apiConfirmUserDelete",
    apiConfirmUsers,
    id,
  );
}
