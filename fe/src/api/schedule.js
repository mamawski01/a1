import { updateRealtimeSchedule } from "../feIo/feIo";
import { getter, patcher, poster } from "./operators";

export async function apiSchedules() {
  return getter(
    "Schedules fetched",
    "/apiSchedules",
    updateRealtimeSchedule,
    false,
  );
}

// export async function apiScheduleParent(id) {
//   return getter(
//     "Single Parent Schedule",
//     "/apiScheduleParent/",
//     updateRealtimeSchedule,
//     true,
//     id,
//   );
// }

export async function apiSchedulesPostPatch(data, id) {
  return poster("Schedule created", "/apiSchedulesPostPatch", data, true, id);
}
