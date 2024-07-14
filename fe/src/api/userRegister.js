import { updateRealtime } from "../feIo/feIo";
import { deleter, getter, patcher, poster } from "./operators";

export async function apiUsers() {
  return getter(
    "Registry Users fetched",
    "/apiUsers",
    apiUsers,
    updateRealtime,
    false,
  );
}

export async function apiUser(id) {
  return getter(
    "Single Registry User fetched",
    "/apiUser/",
    apiUsers,
    updateRealtime,
    true,
    id,
  );
}

export async function apiUserPostUser(newUser) {
  return poster("Registry User created", "/apiUserPostUser", apiUsers, newUser);
}

export async function apiUserPatchUser(id, newUser) {
  return patcher(
    "Registry User updated",
    "/apiUserPatchUser/",
    apiUsers,
    id,
    newUser,
  );
}

export async function apiUserDeleteUser(id) {
  return deleter(
    "Registry User deleted",
    "/apiUserDeleteUser/",
    apiUsers,
    id,
    true,
  );
}
