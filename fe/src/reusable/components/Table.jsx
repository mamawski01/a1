import PropTypes from "prop-types";
import {
  capitalizeFirstLetterEachWord,
  getTimeDifference,
} from "../utils/helpers";
import { PencilIcon } from "@heroicons/react/24/solid";
import Btn from "./Btn";
import dayjs from "dayjs";

export default function Table({ data }) {
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
      const timeRes = getTimeDifference(startTime, endTime);
      if (i % 2 === 1) {
        acc.push({
          timeDuty: timeRes,
        });
      } else if (i === userIdData.length - 1) {
        acc.push({
          timeDuty: "No time out!",
          DateTime: "",
          totalHoursDuty: timeRes,
        });
      }
      return acc;
    }, []);
    return [item, result];
  });

  /////////
  const test = contentArr.map((item) => item[1]);
  const arr = test[0];
  // console.log(arr);

  const result2 = arr.reduce((acc, obj, i) => {
    acc.push(obj);
    const startTimeMain = arr[0].DateTime;
    const endTimeMain = obj.DateTime;

    if (i % 2 === 1) {
      const startTime = arr[i - 1].DateTime;

      const endTime = obj.DateTime;
      acc.push({
        timeDuty: getTimeDifference(startTime, endTime),
      });
    } else if (i === arr.length - 1) {
      acc.push({
        timeDuty: "No time out!",
        DateTime: "",
        totalHoursDuty: getTimeDifference(startTimeMain, endTimeMain),
      });
    }
    return acc;
  }, []);
  // console.log(result2);
  ////////////////

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

            <th>
              <Btn
                text="Assign Attendance Id"
                icon={[{ icon: <PencilIcon /> }]}
                type="link"
                color={"yellow"}
                to={data.data.details[0].userId}
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
                <p
                  className={`w-44 border-b p-2 text-center font-medium ${
                    content[0].includes("Sun") ? "text-blue-600" : ""
                  }`}
                >
                  {content[0]}
                </p>
                {content[1].length > 0 ? (
                  <div className="p-1">
                    {content[1].map((item, i) => (
                      <div key={i} className="flex gap-2">
                        {item.DateTime ? (
                          <>
                            <div>{dayjs(item.DateTime).format("hh:mm a")}</div>
                            <div className="w-10">{item.Mode}</div>
                            {i % 3 ? (
                              <div className="text-red-600">Out</div>
                            ) : (
                              <div className="text-green-600">In</div>
                            )}
                          </>
                        ) : (
                          <div className="w-full border-t text-center">
                            <div>
                              {item.timeDuty.message
                                ? item.timeDuty.message
                                : item.timeDuty}
                            </div>
                            <div className="">
                              {item.totalHoursDuty?.message}
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
};

//////////
////////////

[
  {
    _id: "668bb8bf4b2a435801ad5015",
    No: "13",
    DevNo: "1",
    UserId: "3",
    Name: "RHEA JOY GUZON",
    Mode: "FP",
    DateTime: "2024-07-01 08:53:42",
    __v: 0,
  },
  {
    _id: "668bb8bf4b2a435801ad5016",
    No: "14",
    DevNo: "1",
    UserId: "3",
    Name: "RHEA JOY GUZON",
    Mode: "FACE",
    DateTime: "2024-07-01 08:57:08",
    __v: 0,
  },
  { timeDuty: "hh:mm:ss" },
  {
    _id: "668bb8bf4b2a435801ad501e",
    No: "22",
    DevNo: "1",
    UserId: "3",
    Name: "RHEA JOY GUZON",
    Mode: "FACE",
    DateTime: "2024-07-01 18:01:56",
    __v: 0,
  },
  { timeDuty: "No time Out Since only Time In is present" },
];
