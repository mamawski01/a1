import { apiAttendancesPost } from "../api/attendance";
import Form from "../reusable/components/Form";

export default function Upload() {
  return (
    <div className="flex flex-col gap-4">
      <Form
        dataSave={apiAttendancesPost}
        data={[
          {
            label: {
              rowLabels: "uploadAttendace",
              inputs: ["file"],
              isRequired: [false],
              inputTypes: ["file"],
              specifyFile: [".txt"],
              specialIns: ["attendance"],
            },
          },
        ]}
      ></Form>
    </div>
  );
}
