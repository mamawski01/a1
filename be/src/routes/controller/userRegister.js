import User from "./models/User.js";
import {
  prevImgAndDelImg,
  userEmailAndDelImage,
} from "../../utils/beHelpers.js";
import { deleter, getter, patcher, poster } from "./operators.js";

export function apiUsers(req, res) {
  getter(req, res, User, "Users", false);
}

export function apiUser(req, res) {
  getter(req, res, User, "User", true);
}

export async function apiUserPostUser(req, res) {
  poster(req, res, User, "apiUserPostUser", false);
}

export async function apiUserPatchUser(req, res) {
  patcher(req, res, User, "apiUserPatchUser", false);
}

export async function apiUserDeleteUser(req, res) {
  deleter(req, res, User, "apiUserDeleteUser", true);
}
