import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  PencilIcon,
  PlusIcon,
  SparklesIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

import { convertToJson, formatFontLabel } from "../utils/helpers";
import Btn from "./Btn";
import { useEffect, useState } from "react";

export default function Form({
  data = [],
  dataSave = null,
  dataEdit = null,
  dataDelete = null,
  dataDefaultVal = null,
}) {
  const specialIns = data[0].label?.specialIns?.[0];
  const { id } = useParams();
  const [editData, editDataSet] = useState({});

  const edit = Boolean(editData?._id);

  const { register, handleSubmit, formState, reset } = useForm();

  useEffect(() => {
    async function fetchData() {
      if (id) {
        const response = await dataDefaultVal(id);
        const finalData = response?.data?.data;
        editDataSet(finalData);
        reset(finalData);
        return response;
      }
    }
    fetchData();
    //cleaning
    return () => {};
  }, [id, reset, dataDefaultVal]);

  const { errors } = formState;

  const navigate = useNavigate();
  const [image, imageSet] = useState("");

  async function onSubmit(data) {
    if (data.password !== data.repeatPassword) {
      toast.error("Passwords do not match");
      return null;
    }
    if (data.password === data.repeatPassword) {
      if (specialIns === "attendance") {
        const response = await dataSave(await convertToJson(data.file[0]));
        if (response.data) {
          // navigate(-1);
        }
      } else if (specialIns === "schedule") {
        // const response = await
        convertToJson(data.file[0]);
      } else {
        const finalData = data;
        for (const key in finalData) {
          if (typeof finalData[key] === "string") {
            finalData[key] = finalData[key].trim();
          }
        }
        const response = edit
          ? await dataEdit(editData._id, finalData)
          : await dataSave(finalData);
        if (response.data) {
          // navigate(-1);
        }
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
      className="container2"
    >
      <div className="flex flex-col md:grid">
        <div className="flex justify-end">
          {
            <Btn
              text={"exit"}
              color={"red"}
              type="button"
              icon={[
                {
                  icon: <XMarkIcon></XMarkIcon>,
                },
              ]}
              onClick={() => navigate(-1)}
            ></Btn>
          }
        </div>
        <div className="[&>*:nth-child(even)]:bg-slate-500/5">
          {data.map((rowLabel, i) => (
            <RowInput
              key={i}
              rowLabel={rowLabel.label.rowLabels}
              inputs={rowLabel.label.inputs}
              inputTypes={rowLabel.label.inputTypes}
              specifyFile={rowLabel.label.specifyFile}
              options={rowLabel.label.options}
              isRequired={rowLabel.label.isRequired}
              register={register}
              errors={errors}
              image={image}
              imageSet={imageSet}
              editData={editData}
            ></RowInput>
          ))}
        </div>
        {
          <div className="mt-6 flex justify-evenly">
            <Btn
              color="blue"
              text={edit ? "update" : "Save"}
              icon={
                edit
                  ? [
                      {
                        icon: <PencilIcon></PencilIcon>,
                      },
                    ]
                  : [
                      {
                        icon: <PlusIcon></PlusIcon>,
                      },
                    ]
              }
              type="submit"
            ></Btn>
            <Btn
              color={"yellow"}
              type="reset"
              text={"Clear"}
              icon={[
                {
                  icon: <SparklesIcon></SparklesIcon>,
                },
              ]}
              onClick={() => {
                toast.success("Form cleared successfully");
                imageSet("");
                reset({});
              }}
            ></Btn>
            {edit && dataDelete && (
              <Btn
                text={"delete"}
                color={"red"}
                type="button"
                icon={[
                  {
                    icon: <TrashIcon></TrashIcon>,
                  },
                ]}
                onClick={() => dataDelete(editData._id)}
              ></Btn>
            )}
            <Btn
              text={"exit"}
              color={"red"}
              type="button"
              icon={[
                {
                  icon: <XMarkIcon></XMarkIcon>,
                },
              ]}
              onClick={() => navigate(-1)}
            ></Btn>
          </div>
        }
      </div>
    </form>
  );
}

Form.propTypes = {
  data: PropTypes.any,
  dataSave: PropTypes.any,
  dataEdit: PropTypes.any,
  dataDefaultVal: PropTypes.any,
  dataDelete: PropTypes.any,
  singleInput: PropTypes.any,
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
  specifyFile = "",
  options = "",
  isRequired = "",
  errors = "",
  image = "",
  imageSet = "",
  editData = "",
}) {
  const gridDesign = getGridDesign(inputs.length);
  const font = formatFontLabel(rowLabel);

  return (
    <div className={`${gridDesign} mt-6 items-center gap-x-2`}>
      <h1
        className="col-span-full flex items-center text-xl font-bold"
        title={font}
      >
        {font}
      </h1>
      {inputs.map((input, i) => (
        <Input
          key={i}
          input={input}
          inputType={inputTypes[i]}
          specifyFile={specifyFile[i]}
          options={options[i]}
          isRequired={isRequired[i]}
          register={register}
          errors={errors}
          image={image}
          imageSet={imageSet}
          editData={editData[input]}
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
  image: PropTypes.any,
  imageSet: PropTypes.any,
  editData: PropTypes.any,
  specifyFile: PropTypes.any,
};

function Input({
  input = "",
  inputType = "text",
  specifyFile = "",
  options = [],
  isRequired = false,
  register,
  errors,
  image,
  imageSet,
  editData = "",
}) {
  const font = formatFontLabel(input);
  const validate = isRequired && {
    required: `This field is required: ${font}`,
  };
  function getImagePreview(e) {
    if (inputType === "file" && e?.target?.files[0]) {
      return imageSet(URL.createObjectURL(e.target.files[0]) || editData);
    }
  }
  const style =
    "w-full rounded-lg border border-gray-400 bg-slate-700 px-4 py-2 placeholder:text-sky-500 hover:ring hover:ring-gray-500 focus:outline-none focus:ring focus:ring-gray-500";

  return (
    <div className="my-auto h-full w-full">
      <label htmlFor={input} className="font-bold" title={font}>
        {font}
      </label>
      {(inputType === "text" ||
        inputType === "date" ||
        inputType === "email" ||
        inputType === "password") && (
        <>
          <input
            type={inputType}
            placeholder={font}
            id={input}
            name={input}
            className={`${style} ${inputType === "file" && "cursor-pointer"}`}
            autoComplete="off"
            title={font}
            {...register(input, validate)}
          />

          {specifyFile === "file" && <input></input>}
        </>
      )}
      {specifyFile === "image" && (
        <>
          <input
            type={inputType}
            placeholder={font}
            id={input}
            name={input}
            className={`${style} ${inputType === "file" && "cursor-pointer"}`}
            title={font}
            {...register(input, validate)}
            onChange={(e) => getImagePreview(e)}
            accept={".png,.jpg,.jpeg"}
          ></input>
          <img
            src={image || editData || "/Asset2.png"}
            alt=""
            className="mx-auto mt-2 h-auto w-2/6"
          />
        </>
      )}
      {[".txt", ".xlsx"].includes(specifyFile) && (
        <input
          type={inputType}
          placeholder={font}
          id={input}
          name={input}
          className={`${style} ${inputType === "file" && "cursor-pointer"}`}
          title={font}
          {...register(input, validate)}
          accept={specifyFile}
        ></input>
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
  image: PropTypes.any,
  imageSet: PropTypes.any,
  editData: PropTypes.any,
  specifyFile: PropTypes.any,
};
