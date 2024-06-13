import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";

import Box from "../reusable/components/Box";
import RowInput from "../reusable/components/RowInput";
import Links from "../reusable/components/Links";
import useRegisterUser from "../reusable/hooks/useRegisterUser";

export default function UserForm() {
  const { register, handleSubmit } = useForm();
  const { registerUserRequest } = useRegisterUser();

  const location = useLocation();
  const url = location.pathname;

  function onSubmit(data) {
    console.log(data);
    registerUserRequest(data);
    return;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      action=""
      className="absolute inset-0 left-0 top-14 overflow-y-auto bg-slate-200/10 p-2 backdrop-blur-sm"
    >
      <Box>
        <div className="flex justify-end">
          <Links
            text={["Exit"]}
            hidden={[false]}
            to={["/"]}
            url={url}
            color={["red"]}
            icons={[
              {
                icons: <XMarkIcon></XMarkIcon>,
              },
            ]}
          ></Links>
        </div>
        <RowInput
          rowLabel="name"
          inputs={["firstName", "middleName", "lastName"]}
          register={register}
        ></RowInput>
        <RowInput
          rowLabel="workInfo"
          inputType={["option", "date", "email"]}
          inputs={["position", "birthdate", "email"]}
          options={[["Sales", "Cashier", "Optician", "Optometrist"], [], []]}
          register={register}
        ></RowInput>
        <RowInput
          rowLabel="address"
          inputs={["street", "purok", "brgy", "city", "province", "country"]}
          register={register}
        ></RowInput>
        <RowInput
          rowLabel="contactInfo"
          inputType={["text", "text", "text", "password", "password"]}
          inputs={[
            "contactNumber1",
            "contactNumber2",
            "contactNumber3",
            "password",
            "repeatPassword",
          ]}
          register={register}
        ></RowInput>
        <RowInput
          rowLabel="governmentInfo"
          inputs={["SSS", "PagIbig", "PhilHealth", "TIN"]}
          register={register}
        ></RowInput>
        <RowInput
          rowLabel="emergencyInfo"
          inputs={[
            "contactPersonNameInEmergency",
            "contactPersonNumberInEmergency",
          ]}
          register={register}
        ></RowInput>
        <button> click</button>
        <button type="reset"> reset</button>
      </Box>
    </form>
  );
}
