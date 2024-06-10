import { useForm } from "react-hook-form";
import Box from "./Box";
import RowInput from "./RowInput";

export default function UserForm() {
  const { register, handleSubmit } = useForm();

  return (
    <form action="" className="board">
      <Box>
        {/* <RowInput
          rowLabel="name"
          inputs={["firstName", "middleName", "lastName"]}
        ></RowInput> */}
        <RowInput
          rowLabel="moreInfo"
          inputType={["text", "date", "email"]}
          inputs={["position", "birthdate", "email"]}
        ></RowInput>
        {/* <RowInput
          rowLabel="address"
          inputs={["Street", "Purok", "Brgy", "City", "Province", "Country"]}
        ></RowInput>
        <RowInput
          rowLabel="moreInfo"
          inputs={["cellphoneNumbers", "password"]}
        ></RowInput>
        <RowInput
          rowLabel="moreInfo"
          inputs={[
            "contactPersonNameInEmergency",
            "contactPersonNumberInEmergency",
          ]}
        ></RowInput> */}
      </Box>
    </form>
  );
}
