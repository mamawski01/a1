import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

import { feSocket } from "../feIo/feIo";
import { apiConfirmUsers } from "../api/confirmUser";
import { capitalizeFirstLetterEachWord } from "../reusable/utils/helpers";
import Input from "../reusable/components/Input";
import { apiSchedules, apiSchedulesPostPatch } from "../api/schedule";
import { timeArr } from "../reusable/utils/model";

export default function ScheduleForm() {
  const [confirmUsers, confirmUsersSet] = useState([]);
  feSocket.on("dataReceivedConfirmUser", (data) => {
    confirmUsersSet(data);
  });

  useEffect(() => {
    async function fetchConfirmUsers() {
      const response = await apiConfirmUsers();
      return response;
    }
    fetchConfirmUsers();
    //cleaning
    return () => {};
  }, []);

  const [schedules, schedulesSet] = useState([]);
  console.log(schedules);

  feSocket.on("dataReceivedSchedule", (data) => {
    schedulesSet(data);
  });

  useEffect(() => {
    async function fetchschedules() {
      const response = await apiSchedules();
      return response;
    }
    fetchschedules();
    //cleaning
    return () => {};
  }, []);

  const [value, setValue] = useState({
    startDate: dayjs().startOf("month").format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
  });
  const [daysArr, daysArrSet] = useState(defaultDates());
  function whileDate(startDate, endDate) {
    const dateStrings = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateString = dayjs(currentDate).format("YY-MM-DD ddd DD");
      dateStrings.push(dateString);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateStrings;
  }
  function handleValueChange(newValue) {
    setValue(newValue);

    const startDate = new Date(newValue.startDate);
    const endDate = new Date(newValue.endDate);

    daysArrSet(whileDate(startDate, endDate));
  }

  function defaultDates() {
    // const startDate = value.startDate;
    const startDate = dayjs().$d;
    const endDate = dayjs().$d;

    return whileDate(startDate, endDate);
  }

  return (
    <div className="">
      <div className="flex items-center justify-center">
        <div className="w-60">
          <label htmlFor="datePicker"></label>
          <Datepicker
            value={value}
            onChange={handleValueChange}
            inputId="datePicker"
          />
        </div>
      </div>
      <h1 className="pb-2 text-center text-lg font-bold">
        Start date: {value.startDate} / End date: {value.endDate}
      </h1>
      <h1 className="font-bold">Schedule</h1>
      <div className="flex flex-wrap gap-5">
        {daysArr
          .slice()
          .reverse()
          .map((date, i) => (
            <div className="flex flex-wrap border" key={i}>
              <div>
                <div className="w-full text-center">{date}</div>
                <div className="flex gap-1 border-t">
                  <div className="border-r p-1">
                    Id
                    <div className="flex flex-col gap-2 border-t p-1">
                      {confirmUsers
                        .slice()
                        .reverse()
                        .map((user, i) => (
                          <div key={i}>{user.attendanceId}</div>
                        ))}
                    </div>
                  </div>
                  <div className="border-r p-1">
                    Name
                    <div className="flex flex-col gap-2 border-t p-1">
                      {confirmUsers
                        .slice()
                        .reverse()
                        .map((user, i) => (
                          <div key={i}>
                            {capitalizeFirstLetterEachWord(user.firstName)}
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="border-r p-1">
                    Time In Time Out
                    <div className="flex flex-col gap-2 border-t">
                      {confirmUsers
                        .slice()
                        .reverse()
                        .map((user, i) => (
                          <Input
                            key={i}
                            i={i}
                            dataSave={apiSchedulesPostPatch}
                            attendanceId={user.schedules}
                            data={[
                              {
                                label: {
                                  rowLabels: "Time In / Time Out",
                                  rowLabelsHidden: true,
                                  submitBtnHidden: false,
                                  inputs: ["timeIn", "timeOut", "date"],
                                  inputsHidden: [false, false, true],
                                  inputsDefault: [null, null, daysArr],
                                  inputTypes: ["option", "option", "text"],
                                  options: [
                                    timeArr("9:00 am"),
                                    timeArr("6:00 pm"),
                                    [""],
                                  ],
                                },
                              },
                            ]}
                          ></Input>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
