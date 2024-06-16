import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";

import Links from "./Links";
import { formatFontLabel } from "../utils/helpers";
import Btn from "./Btn";

export default function Form({
  rowLabels = [],
  inputs = [],
  inputTypes = [],
  options = [],
  mutate = null,
  isPending = false,
  isRequired = [],
}) {
  const { register, handleSubmit } = useForm();

  const location = useLocation();
  const url = location.pathname;
  const navigate = useNavigate();

  function onSubmit(data) {
    navigate(-1);
    mutate(data);
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="container mx-auto w-fit overflow-y-auto rounded-lg bg-slate-200/10 p-2 backdrop-blur-sm md:w-5/6 md:p-4 lg:w-4/6 lg:p-8"
    >
      <div className="sm:flex md:grid">
        <div className="flex justify-end">
          <Links
            text={["exit"]}
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
        <div className="[&>*:nth-child(even)]:bg-slate-500/5">
          {rowLabels.map((rowLabel, i) => (
            <RowInput
              key={i}
              rowLabel={rowLabel}
              register={register}
              inputs={inputs[i]}
              inputTypes={inputTypes[i]}
              options={options[i]}
              isRequired={isRequired[i]}
            ></RowInput>
          ))}
        </div>
        <div className="mt-6 flex justify-evenly">
          <Btn color="blue" isPending={isPending}>
            Submit
          </Btn>
          <Btn color={"yellow"} type="reset">
            Clear
          </Btn>
        </div>
      </div>
    </form>
  );
}

Form.propTypes = {
  rowLabels: PropTypes.any,
  inputs: PropTypes.any,
  inputTypes: PropTypes.any,
  options: PropTypes.any,
  mutate: PropTypes.any,
  isPending: PropTypes.any,
  isRequired: PropTypes.any,
};

function getGridDesign(inputLength) {
  if (inputLength > 1) return " grid-cols-4  sm:px-0  md:grid md:grid-cols-3";
  return "";
}

function RowInput({
  rowLabel = "",
  register = "",
  inputs = "",
  inputTypes = "",
  options = "",
  isRequired = "",
}) {
  const gridDesign = getGridDesign(inputs.length);
  const font = formatFontLabel(rowLabel);

  return (
    <div className={`${gridDesign} mt-6 items-center gap-x-2`}>
      <h1
        className="col-span-full flex items-center text-xl font-bold"
        title={font}
      >
        {font}:
      </h1>
      {inputs.map((input, i) => (
        <Input
          key={i}
          input={input}
          inputType={inputTypes[i]}
          options={options[i]}
          isRequired={isRequired[i]}
          register={register}
        ></Input>
      ))}
    </div>
  );
}

RowInput.propTypes = {
  register: PropTypes.any,
  rowLabel: PropTypes.any,
  inputs: PropTypes.any,
  inputTypes: PropTypes.any,
  options: PropTypes.any,
  isRequired: PropTypes.any,
};

function Input({
  input = "",
  inputType = "text",
  options = [],
  isRequired = false,
  register,
}) {
  const font = formatFontLabel(input);
  const validate = isRequired ? { required: "This field is required" } : {};
  console.log(validate);
  return (
    <div className="my-auto h-full w-full">
      <label htmlFor={input} className="font-bold" title={font}>
        {font}
      </label>
      {(inputType === "text" ||
        inputType === "date" ||
        inputType === "email" ||
        inputType === "password") && (
        <input
          type={inputType}
          placeholder={font}
          id={input}
          className="w-full rounded-lg border border-gray-400 bg-slate-700 px-4 py-2 placeholder:text-sky-500 hover:ring hover:ring-gray-500 focus:outline-none focus:ring focus:ring-gray-500"
          autoComplete="off"
          title={font}
          {...register(input)}
        />
      )}
      {inputType === "option" && (
        <select
          id={input}
          className="w-full rounded-lg border border-gray-400 bg-slate-700 px-4 py-2 text-white hover:border-gray-500 focus:border-gray-500 focus:outline-none focus:ring focus:ring-gray-500"
          title={font}
          {...register(input)}
        >
          {options.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
      {inputType === "textarea" && (
        <textarea
          id={input}
          autoComplete="off"
          placeholder={font}
          className="w-full rounded-lg border border-gray-400 bg-slate-700 px-4 py-2 placeholder:text-sky-500 focus:outline-none focus:ring focus:ring-gray-500"
          title={font}
          {...register(input)}
        ></textarea>
      )}
    </div>
  );
}

Input.propTypes = {
  input: PropTypes.any,
  inputType: PropTypes.any,
  options: PropTypes.array,
  register: PropTypes.any,
  isRequired: PropTypes.any,
};
