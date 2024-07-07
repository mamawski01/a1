import PropTypes from "prop-types";
export default function Table({ data }) {
  console.log(data.data.content);
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
                  <span>{detail.detailsLabel}</span>
                  <span>{detail.detailsData}</span>
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
