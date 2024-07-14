import ConfirmUser from "./models/ConfirmUser.js";
import User from "./models/User.js";
import { deleter, getter, patcher, poster } from "./operators.js";

export async function apiConfirmUsers(req, res) {
  return getter(req, res, ConfirmUser, "apiConfirmUsers", false);
}

export async function apiConfirmUser(req, res) {
  return getter(req, res, ConfirmUser, "apiConfirmUser", true);
}

export async function apiConfirmUserPost(req, res) {
  return poster(req, res, ConfirmUser, "apiConfirmUserPost", false, User);
}

export async function apiConfirmUserPatchUser(req, res) {
  return patcher(req, res, ConfirmUser, "apiConfirmUserPatchUser", false);
}

export async function apiConfirmUserDelete(req, res) {
  return deleter(req, res, ConfirmUser, "apiConfirmUserDelete", true);
}
