import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PlusIcon, SparklesIcon, XMarkIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

import { formatFontLabel } from "../utils/helpers";
import Btn from "./Btn";
import { useState } from "react";

export default function Form({
  rowLabels = [],
  inputs = [],
  inputTypes = [],
  options = [],
  isRequired = [],
  dataSave = null,
}) {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const navigate = useNavigate();

  async function onSubmit(data) {
    if (data.password !== data.repeatPassword) {
      toast.error("Passwords do not match");
      return null;
    } else if (data.password === data.repeatPassword) {
      const response = await dataSave(data);
      if (response.data) {
        // navigate(-1);
      }
    }
  }

  function onError() {
    toast.error("Form submission failed. Missing fields required.");
  }

  return (
    <form
      encType="multipart/form-data"
      onSubmit={handleSubmit(onSubmit, onError)}
      className="container mx-auto w-fit overflow-y-auto rounded-lg bg-slate-200/10 p-2 backdrop-blur-sm md:w-5/6 md:p-4 lg:w-4/6 lg:p-8"
    >
      <div className="sm:flex md:grid">
        <div className="flex justify-end">
          <Btn
            text={"exit"}
            color={"red"}
            icons={[
              {
                icons: <XMarkIcon></XMarkIcon>,
              },
            ]}
            onClick={() => navigate(-1)}
          ></Btn>
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
              errors={errors}
            ></RowInput>
          ))}
        </div>
        <div className="mt-6 flex justify-evenly">
          <Btn
            color="blue"
            text={"Save"}
            icons={[
              {
                icons: <PlusIcon></PlusIcon>,
              },
            ]}
            type="submit"
          ></Btn>
          <Btn
            color={"yellow"}
            type="reset"
            text={"Clear"}
            icons={[
              {
                icons: <SparklesIcon></SparklesIcon>,
              },
            ]}
            onClick={() => {
              toast.success("Form cleared successfully");
            }}
          ></Btn>
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
  isRequired: PropTypes.any,
  dataSave: PropTypes.any,
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
  errors = "",
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
          errors={errors}
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
  errors: PropTypes.any,
};

function Input({
  input = "",
  inputType = "text",
  options = [],
  isRequired = false,
  register,
  errors,
}) {
  const font = formatFontLabel(input);
  const validate = isRequired && {
    required: `This field is required: ${font}`,
  };
  const [image, imageSet] = useState("");
  function getImagePreview(e) {
    if (inputType === "file" && e.target.files[0]) {
      return imageSet(URL.createObjectURL(e.target.files[0]));
    }
  }
  return (
    <div className="my-auto h-full w-full">
      <label htmlFor={input} className="font-bold" title={font}>
        {font}
      </label>
      {(inputType === "text" ||
        inputType === "date" ||
        inputType === "email" ||
        inputType === "file" ||
        inputType === "password") && (
        <>
          <input
            type={inputType}
            placeholder={font}
            id={input}
            name={input}
            className={`w-full rounded-lg border border-gray-400 bg-slate-700 px-4 py-2 placeholder:text-sky-500 hover:ring hover:ring-gray-500 focus:outline-none focus:ring focus:ring-gray-500 ${inputType === "file" && "cursor-pointer"}`}
            autoComplete="off"
            title={font}
            {...register(input, validate)}
            onChange={(e) => getImagePreview(e)}
            accept=".png,.jpg,.jpeg"
          />
          {inputType === "file" && (
            <img src={image} alt="" className="mx-auto mt-2 h-auto w-2/6" />
          )}
        </>
      )}
      {inputType === "option" && (
        <select
          id={input}
          className="w-full rounded-lg border border-gray-400 bg-slate-700 px-4 py-2 text-white hover:border-gray-500 focus:border-gray-500 focus:outline-none focus:ring focus:ring-gray-500"
          title={font}
          {...register(input, validate)}
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
          {...register(input, validate)}
        ></textarea>
      )}
      {errors?.[input]?.message && (
        <p className="font-bold text-red-500">{errors?.[input]?.message}</p>
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
  errors: PropTypes.any,
};
