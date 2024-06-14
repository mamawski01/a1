import Form from "../reusable/components/Form";

const rowLabels = [
  "name",
  "workInfo",
  "address",
  "contactInfo",
  "governmentInfo",
  "emergencyInfo",
];

const inputs = [
  ["firstName", "middleName", "lastName"],
  ["position", "birthdate", "email"],
  ["street", "purok", "brgy", "city", "province", "country"],
  [
    "contactNumber1",
    "contactNumber2",
    "contactNumber3",
    "password",
    "repeatPassword",
  ],
  ["SSS", "PagIbig", "PhilHealth", "TIN"],
  ["contactPersonNameInEmergency", "contactPersonNumberInEmergency"],
];

const inputTypes = [
  [],
  ["option", "date", "email"],
  [],
  ["text", "text", "text", "password", "password"],
  [],
  [],
];

const options = [[], [["Sales", "Cashier", "Optician", "Optometrist"], [], []]];
export default function UserForm() {
  return (
    <Form
      rowLabels={rowLabels}
      inputs={inputs}
      inputTypes={inputTypes}
      options={options}
    ></Form>
  );
}
