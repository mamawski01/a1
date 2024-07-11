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
  // console.log(contentLabels);

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

    const timeDuty =
      userIdData.length > 1
        ? {
            timeDuty: getTimeDifference(
              userIdData[0].DateTime,
              userIdData[userIdData.length - 1].DateTime,
            ),
          }
        : { timeDuty: "No data" };

    // if (userIdData.length > 0) {
    //   return [...userIdData, timeDuty];
    // }
    console.log(timeDuty);

    return [item, userIdData];
  });
  console.log(contentArr);

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
                //check kier the attandance id 106
              ></Btn>
            </th>
          </tr>
        </thead>
      </table>

      <table className="w-full table-fixed">
        <thead>
          {/* <tr className="flex flex-wrap">
            {contentArr.map((content, i) => (
              <td key={i} className="flex flex-col text-nowrap border">
                <p className="w-44 border-b p-2 text-center font-medium">
                  {content[0]}
                </p>
                {content[1].length > 0 ? (
                  <div className="p-1">
                    {content[1].map((item, i) => (
                      <div key={i} className="flex gap-1">
                        <div>{dayjs(item.DateTime).format("hh:mm a")}</div>
                        <div className="w-10">{item.Mode}</div>
                        <div>
                          {i % 2 === 0 ? (
                            <span className="text-green-600">In</span>
                          ) : (
                            <span className="text-red-600">Out</span>
                          )}
                        </div>
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
          </tr> */}
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  data: PropTypes.any,
};

const arr1 = [
  [
    {
      Name: "KIER TIBERIO",
      Mode: "FACE",
      DateTime: "2024-06-29 11:01:30",
      __v: 0,
    },
    {
      Name: "KIER TIBERIO",
      Mode: "FACE",
      DateTime: "2024-06-29 11:03:05",
      __v: 0,
    },
  ],
  [
    {
      Name: "KIER TIBERIO",
      Mode: "FACE",
      DateTime: "2024-07-29 11:08:21",
      __v: 0,
    },
    {
      Name: "KIER TIBERIO",
      Mode: "FACE",
      DateTime: "2024-07-29 11:10:30",
      __v: 0,
    },
  ],
  [],
  [
    {
      Name: "KIER TIBERIO",
      Mode: "FACE",
      DateTime: "2024-09-29 11:15:05",
      __v: 0,
    },
    {
      Name: "KIER TIBERIO",
      Mode: "FACE",
      DateTime: "2024-09-29 11:20:21",
      __v: 0,
    },
    {
      Name: "KIER TIBERIO",
      Mode: "FACE",
      DateTime: "2024-09-29 11:50:21",
      __v: 0,
    },
  ],
];

//////////

const result = arr1.map((subArr) => {
  // console.log(subArr);

  if (subArr.length > 0) {
    const timeDuty =
      subArr.length > 1
        ? {
            timeDuty: getTimeDifference(
              subArr[0].DateTime,
              subArr[subArr.length - 1].DateTime,
            ),
          }
        : { timeDuty: "No time Out!" };

    return [...subArr, timeDuty];
  }

  return subArr;
});

// console.log(result);

[
  [
    {
      Name: "KIER TIBERIO",
      Mode: "FACE",
      DateTime: "2024-06-29 11:01:30",
      __v: 0,
    },
    {
      Name: "KIER TIBERIO",
      Mode: "FACE",
      DateTime: "2024-06-29 11:03:05",
      __v: 0,
    },
    { timeDuty: "0hr, 1min, 35sec" },
  ],
  [
    {
      Name: "KIER TIBERIO",
      Mode: "FACE",
      DateTime: "2024-07-29 11:08:21",
      __v: 0,
    },
    {
      Name: "KIER TIBERIO",
      Mode: "FACE",
      DateTime: "2024-07-29 11:10:30",
      __v: 0,
    },
    { timeDuty: "0hr, 2min, 9sec" },
  ],
  [],
  [
    {
      Name: "KIER TIBERIO",
      Mode: "FACE",
      DateTime: "2024-09-29 11:15:05",
      __v: 0,
    },
    {
      Name: "KIER TIBERIO",
      Mode: "FACE",
      DateTime: "2024-09-29 11:20:21",
      __v: 0,
    },
    { timeDuty: "0hr, 5min, 16sec" },
  ],

  [
    {
      Name: "KIER TIBERIO",
      Mode: "FACE",
      DateTime: "2024-09-29 11:50:21",
      __v: 0,
    },
    { timeDuty: "No time Out!" },
  ],
];
