import Schedule from "./models/Schedule.js";
import { getter, patcher, poster } from "./operators.js";

export async function apiSchedules(req, res) {
  return getter(req, res, Schedule, "apiSchedules", false);
}

export async function apiScheduleParent(req, res) {
  return getter(req, res, Schedule, "apiScheduleParent", true);
}

export async function apiScheduleChildren(req, res) {
  return getter(req, res, Schedule, "apiScheduleChildren", true, true);
}

export async function apiSchedulesPostPatch(req, res) {
  return poster(
    req,
    res,
    Schedule,
    "apiSchedulesPostPatch",
    false,
    null,
    null,
    false
  );
}

export async function apiSchedulesChildrenPatch(req, res) {
  return patcher(req, res, Schedule, "apiSchedulesChildrenPatch", true, true);
}
