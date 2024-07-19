import { updateRealtime } from "../feIo/feIo";
import { deleter, getter, patcher, poster } from "./operators";

export async function apiUsers() {
  return getter("Registry Users fetched", "/apiUsers", updateRealtime, false);
}

export async function apiUser(id) {
  return getter(
    "Single Registry User fetched",
    "/apiUser/",
    updateRealtime,
    true,
    id,
  );
}

export async function apiUserPostUser(newUser) {
  return poster("Registry User created", "/apiUserPostUser", newUser);
}

export async function apiUserPatchUser(id, newUser) {
  return patcher("Registry User updated", "/apiUserPatchUser/", id, newUser);
}

export async function apiUserDeleteUser(id) {
  return deleter("Registry User deleted", "/apiUserDeleteUser/", id, true);
}
