import { updateRealtime } from "../feIo/feIo";
import { deleter, getter, patcher, poster } from "./operators";

export async function apiUsers() {
  return getter("/apiUsers", "apiUsers", apiUsers, updateRealtime, false);
}

export async function apiUser(id) {
  return getter("/apiUser/", "apiUser", apiUsers, updateRealtime, true, id);
}

export async function apiUserPostUser(newUser) {
  return poster("/apiUserPostUser", "apiUserPostUser", apiUsers, newUser);
}

export async function apiUserPatchUser(id, newUser) {
  return patcher(
    "/apiUserPatchUser/",
    "apiUserPatchUser",
    apiUsers,
    id,
    newUser,
  );
}

export async function apiUserDeleteUser(id) {
  return deleter("/apiUserDeleteUser/", "apiUserDeleteUser", apiUsers, id);
}
