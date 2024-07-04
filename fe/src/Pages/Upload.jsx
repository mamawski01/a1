import { apiAttendancesPost } from "../api/api";
import Form from "../reusable/components/Form";

export default function Upload() {
  return (
    <Form
      dataSave={apiAttendancesPost}
      data={[
        {
          label: {
            rowLabels: "uploadAttendace",
            inputs: ["file"],
            isRequired: [false],
            inputTypes: ["file"],
            specifyFile: ["file"],
            specialIns: ["attendance"],
          },
        },
      ]}
    ></Form>
  );
}
