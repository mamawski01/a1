import { useForm } from "react-hook-form";
import Box from "../reusable/components/Box";
import RowInput from "../reusable/components/RowInput";

export default function UserForm() {
  const { register, handleSubmit } = useForm();

  return (
    <form
      action=""
      className="md:left-16; absolute inset-0 left-0 top-12 z-50 h-[calc(100vh-3.75rem)] overflow-y-auto bg-slate-200/10 p-2 backdrop-blur-sm"
    >
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
