import { useEffect, useState } from "react";
import {
  apiAttendanceSettingPatch,
  apiAttendanceSettingPost,
  apiAttendanceSettings,
} from "../api/attendanceSetting";
import Form from "../reusable/components/Form";
import { feSocket } from "../feIo/feIo";
import Card from "../reusable/components/Card";
import { PencilIcon } from "@heroicons/react/24/solid";
import { attendanceSettingModel } from "../reusable/utils/model";

export default function AttendanceSettingForm() {
  const [data, dataSet] = useState([]);

  feSocket.on("dataReceivedAttendanceSetting", (data) => {
    dataSet(data);
  });

  useEffect(() => {
    async function fetchData() {
      const response = await apiAttendanceSettings();
      return response;
    }
    fetchData();
    //cleaning
    return () => {};
  }, []);
  return (
    <div>
      {data.length === 0 ? (
        <Form
          dataSave={apiAttendanceSettingPost}
          data={attendanceSettingModel()}
        ></Form>
      ) : (
        <div>
          {data
            .slice()
            .reverse()
            .map((data, i) => (
              <Card
                key={i}
                data={data}
                mainDescription={[
                  "Attendance Setting",
                  "Break Time: " + data.breakTime,
                  "Regular Rating: " + data.regularRating,
                  "Regular Holiday Rating: " + data.holidayRatingRegular,
                  "Special Holiday Rating: " + data.holidayRatingSpecial,
                  "Regular Duty Hours: " + data.regularDutyHours,
                ]}
                btn={[
                  {
                    btn: {
                      function: () => apiAttendanceSettingPatch(data._id),
                      to: "" + data._id,
                      text: "edit",
                      color: "yellow",
                      type: "link",
                      icon: { icon: <PencilIcon></PencilIcon> },
                    },
                  },
                ]}
              ></Card>
            ))}
        </div>
      )}
    </div>
  );
}
