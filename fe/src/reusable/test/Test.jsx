import { apiTest } from "../../api/api";
import Form from "../components/Form";

const rowLabels = [
  // "name",
  // "workInfo",
  // "address",
  // "contactInfo",
  // "governmentInfo",
  // "emergencyInfo",
  "selectImage",
];

const inputs = [
  // ["firstName", "middleName", "lastName"],
  // ["position", "birthdate", "email"],
  // ["street", "purok", "brgy", "city", "province", "country"],
  // [
  //   "contactNumber1",
  //   "contactNumber2",
  //   "contactNumber3",
  //   "password",
  //   "repeatPassword",
  // ],
  // ["SSS", "PagIbig", "PhilHealth", "TIN"],
  // ["contactPersonNameInEmergency", "contactPersonNumberInEmergency"],
  ["image"],
];

const isRequired = [
  // [true, true, true],
  // [true, true, true],
  // [false, false, true, true, true, true],
  // [true, false, false, true, true],
  // [false, false, false, false],
  // [true, true],
  [true],
];

const inputTypes = [
  // [],
  // ["option", "date", "email"],
  // [],
  // ["text", "text", "text", "password", "password"],
  // [],
  // [],
  ["file"],
];

// const options = [[], [["Sales", "Cashier", "Optician", "Optometrist"], [], []]];

export default function Test() {
  return (
    <Form
      rowLabels={rowLabels}
      inputs={inputs}
      inputTypes={inputTypes}
      isRequired={isRequired}
      dataSave={apiTest}
    ></Form>
  );
}
