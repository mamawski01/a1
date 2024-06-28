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
  ["image", "name"],
];

const isRequired = [
  // [true, true, true],
  // [true, true, true],
  // [false, false, true, true, true, true],
  // [true, false, false, true, true],
  // [false, false, false, false],
  // [true, true],
  [true, false],
];

const inputTypes = [
  // [],
  // ["option", "date", "email"],
  // [],
  // ["text", "text", "text", "password", "password"],
  // [],
  // [],
  ["file", "text"],
];

// const options = [[], [["Sales", "Cashier", "Optician", "Optometrist"], [], []]];

// const uppy = new Uppy()
//   .use(Dashboard, { inline: true, target: "body" })
//   .use(XHRUpload, {
//     endpoint: "http://localhost:7000/apiTest",
//     fieldName: "image",
//     formData: true,
//   })
//   .use(Webcam, { target: Dashboard });

export default function Test() {
  return (
    <>
      {/* <div className="bg-slate-500" id="drag"></div> */}
      <Form
        // dataSave={apiUserPostUser}
        // dataEdit={apiUserPatchUser}
        // dataDefaultVal={apiUser}
        data={[
          {
            label: {
              rowLabels: "selectImage",
              inputs: ["image", "name"],
              isRequired: [true, true],
              inputTypes: ["file"],
            },
          },
        ]}
      ></Form>
    </>
  );
}
