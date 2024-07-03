import Form from "../reusable/components/Form";

export default function Upload() {
  return (
    <Form
      dataSave={null}
      data={[
        {
          label: {
            rowLabels: "uploadAttendace",
            inputs: ["file"],
            isRequired: [false],
            inputTypes: ["file"],
            specifyFile: ["file"],
          },
        },
      ]}
    ></Form>
  );
}
