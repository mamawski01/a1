import PropTypes from "prop-types";
import { capitalizeFirstLetterEachWord } from "../utils/helpers";
import { PencilIcon } from "@heroicons/react/24/solid";
import Btn from "./Btn";

export default function Table({ data }) {
  // console.log(data);
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
                      {capitalizeFirstLetterEachWord(detail.detailsData) ? (
                        capitalizeFirstLetterEachWord(detail.detailsData)
                      ) : (
                        <Btn
                          text="Assign Attendance Id"
                          icon={[{ icon: <PencilIcon /> }]}
                          type="link"
                          color={"yellow"}
                          to={detail.userId}
                          //check kier the attandance id 106
                        ></Btn>
                      )}
                    </span>
                  </div>
                </th>
              ))}
          </tr>
        </thead>
      </table>
      <table className="w-full table-fixed">
        <thead>
          <tr className="">
            {data.data.content.map((content, i) => (
              <td key={i} className="flex flex-wrap">
                {content.contentLabels.map((content, i) => (
                  <div
                    key={i}
                    className="flex w-20 flex-wrap border p-1 text-center"
                  >
                    {content}
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
