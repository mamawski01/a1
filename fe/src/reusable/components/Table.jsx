import PropTypes from "prop-types";
import {
  capitalizeFirstLetterEachWord,
  getTimeDifference,
} from "../utils/helpers";
import {
  CalendarDaysIcon,
  FingerPrintIcon,
  IdentificationIcon,
  PencilIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Btn from "./Btn";
import dayjs from "dayjs";

export default function Table({ data, attendanceSetting }) {
  const breakTime = attendanceSetting[0]?.breakTime;

  const detailsData = data.data.details
    .map((detail) => detail.detailsData)
    .shift();

  const contentLabels = data.data.content[0].contentLabels;

  const userId = data.data.content.flatMap((content) =>
    content.contentData
      .filter((item) => item.UserId === detailsData)
      .filter((item) => dayjs(item.DateTime).format("YY-MM-DD dd DD")),
  );

  const contentArr = contentLabels.map((item) => {
    const userIdData = userId.filter((date) => {
      const formattedDate = dayjs(date.DateTime).format("YY-MM-DD ddd DD");
      return formattedDate === item;
    });

    const result = userIdData.reduce((acc, obj, i) => {
      acc.push(obj);
      const startTime = userIdData[0].DateTime;
      const endTime = obj.DateTime;
      const time = getTimeDifference(startTime, endTime);

      if (i % 2 === 1) {
        acc.push({
          timeDuty: (i === userIdData.length) - 1 && time,
          totalHoursDuty:
            i === userIdData.length - 1 &&
            getTimeDifference(startTime, endTime, breakTime),
        });
      } else if (i === userIdData.length - 1) {
        acc.push({
          timeDuty: "No time out!",
          DateTime: "",
          totalHoursDuty: getTimeDifference(startTime, endTime, breakTime),
        });
      }
      return acc;
    }, []);
    return [item, result];
  });

  return (
    <div>
      <table className="w-full table-fixed">
        <thead>
          <tr className="">
            {data.data.details
              .slice()
              .reverse()
              .map((detail, i) => (
                <th key={i} className="text-start">
                  <div className="flex items-center gap-1">
                    <span>{detail.detailsLabel}</span>
                    <span className="">
                      {capitalizeFirstLetterEachWord(detail.detailsData)}
                    </span>
                  </div>
                </th>
              ))}
            <th className="flex gap-2">
              <Btn
                text={`${detailsData ? "Edit Attendance Id" : "Assign Attendance Id"}`}
                icon={[
                  {
                    icon: detailsData ? (
                      <PencilIcon></PencilIcon>
                    ) : (
                      <IdentificationIcon />
                    ),
                  },
                ]}
                type="link"
                color={"yellow"}
                to={data.data.details[0].userId}
              ></Btn>
              <Btn
                text="Schedules"
                icon={[{ icon: <CalendarDaysIcon /> }]}
                type="link"
                color={"green"}
                to={"scheduleForm"}
              ></Btn>
            </th>
          </tr>
        </thead>
      </table>

      <table className="w-full table-fixed">
        <thead>
          <tr className="flex flex-wrap">
            {contentArr.map((content, i) => (
              <td
                key={i}
                className="flex flex-col text-nowrap border hover:bg-black"
              >
                <div
                  className={`w-44 border-b p-2 text-center font-medium ${
                    content[0].includes("Sun") ? "text-blue-600" : ""
                  }`}
                >
                  {content[0]}
                </div>
                <div className="border-b text-center font-bold text-cyan-500">
                  Schedule
                </div>
                <div className="text-center font-bold text-emerald-500">
                  Actual Duty
                </div>
                {content[1].length > 0 ? (
                  <div className="h-full p-1">
                    {content[1].map((item, i) => (
                      <div key={i} className="flex gap-2">
                        {item.DateTime ? (
                          <>
                            <div>{dayjs(item.DateTime).format("hh:mm a")}</div>
                            <div className="w-5">
                              {item.Mode === "FP" ? (
                                <FingerPrintIcon></FingerPrintIcon>
                              ) : (
                                <UserIcon></UserIcon>
                              )}
                            </div>
                            {i % 3 ? (
                              <div className="text-red-600">Out</div>
                            ) : (
                              <div className="text-green-600">In</div>
                            )}
                          </>
                        ) : (
                          <div className="flex h-full w-full flex-col border-t text-center">
                            <div>
                              {item.timeDuty.message ? (
                                item.timeDuty.message
                              ) : (
                                <p className="text-red-600">{item.timeDuty}</p>
                              )}
                            </div>
                            <div className="justify-self-end text-wrap font-bold">
                              {item.totalHoursDuty?.message &&
                                "Duty Hrs: " + item.totalHoursDuty.message}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center p-4">
                    No data
                  </div>
                )}
              </td>
            ))}
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  data: PropTypes.any,
  attendanceSetting: PropTypes.any,
};
