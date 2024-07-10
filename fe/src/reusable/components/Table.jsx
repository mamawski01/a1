import PropTypes from "prop-types";
import { capitalizeFirstLetterEachWord } from "../utils/helpers";
import { PencilIcon } from "@heroicons/react/24/solid";
import Btn from "./Btn";
import dayjs from "dayjs";

export default function Table({ data }) {
  const detailsData = data.data.details
    .map((detail) => detail.detailsData)
    .shift();

  const userId = data.data.content.flatMap((content) =>
    content.contentData
      .filter((item) => item.UserId === detailsData)
      .filter((item) => dayjs(item.DateTime).format("YY-MM-DD ddd DD")),
  );

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
          <tr className="flex flex-col">
            {data.data.content.map((content, i) => (
              <td key={i} className="flex flex-wrap">
                {content.contentLabels.flatMap((userContent, i) => (
                  <div
                    key={i}
                    className="flex w-44 flex-col text-wrap border p-1 text-center"
                  >
                    <span className="h-fit border-b">{userContent}</span>
                    {userId[i]?.DateTime ? (
                      <span className="flex flex-col justify-start p-2">
                        {userId.map((content, i) => (
                          <span key={i} className="w-fit">
                            {dayjs(content.DateTime).format(
                              "YY-MM-DD dd DD",
                            ) === userContent ? (
                              <span className="flex justify-evenly gap-2">
                                <span>
                                  {dayjs(content.DateTime).format("hh:mm a")}
                                </span>
                                <span className="w-10 text-start">
                                  {content.Mode}
                                </span>
                                {i}
                              </span>
                            ) : null}
                          </span>
                        ))}
                      </span>
                    ) : (
                      "No data"
                    )}
                  </div>
                ))}
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

const arr1 = [
  "24-05-2022",
  "24-05-2022",
  "24-06-2022",
  "24-06-2022",
  "24-07-2022",
  "24-07-2022",
];

const arr2 = ["24-05-2022", "24-06-2022", "24-07-2022"];

const finalArr = arr1.reduce((acc, item) => {
  const existingItem = acc.find(([date]) => date === item);
  if (existingItem) {
    existingItem[1].push(item);
  } else {
    acc.push([item, [item]]);
  }
  return acc;
}, []);

console.log(finalArr);
