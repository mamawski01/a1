import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

import { formatFontLabel } from "../utils/helpers";

export default function Input({
  data = [],
  dataSave = null,
  dataEdit = null,
  dataDelete = null,
  dataDefaultVal = null,
  attendanceId,
}) {
  const submitBtnHidden = data[0].label.submitBtnHidden;

  const { register, handleSubmit } = useForm();

  async function onSubmit(data) {
    const finalData = { schedule: [{ ...data }] };
    console.log(finalData);
    dataSave(finalData, attendanceId);
  }

  return (
    <div>
      {data.map((rowLabel, i) => (
        <form key={i} encType="multipart/form-data" className="flex gap-x-1">
          <RowInput
            rowLabel={rowLabel.label.rowLabels}
            inputs={rowLabel.label.inputs}
            inputTypes={rowLabel.label.inputTypes}
            specifyFile={rowLabel.label.specifyFile}
            options={rowLabel.label.options}
            isRequired={rowLabel.label.isRequired}
            register={register}
            rowLabelsHidden={rowLabel.label.rowLabelsHidden}
            inputsHidden={rowLabel.label.inputsHidden}
            inputsDefault={rowLabel.label.inputsDefault}
          ></RowInput>
          <div className={` ${submitBtnHidden && "hidden"}`}>
            <button
              className="px-1 hover:rounded-md hover:bg-slate-600"
              type="submit"
              onMouseEnter={handleSubmit(onSubmit)}
            >
              Submit
            </button>
          </div>
        </form>
      ))}
    </div>
  );
}

Input.propTypes = {
  data: PropTypes.any,
  dataSave: PropTypes.any,
  dataEdit: PropTypes.any,
  dataDefaultVal: PropTypes.any,
  dataDelete: PropTypes.any,
};

function RowInput({
  rowLabel = "",
  register = "",
  inputs = "",
  inputTypes = "",
  specifyFile = "",
  options = "",
  rowLabelsHidden = false,
  inputsHidden = [],
  inputsDefault = [],
}) {
  const font = formatFontLabel(rowLabel);
  return (
    <div className="flex">
      <h1 className={`${rowLabelsHidden && "hidden"}`} title={font}>
        {font}
      </h1>
      {inputs.map((input, i) => (
        <InputDetails
          key={i}
          input={input}
          inputType={inputTypes[i]}
          specifyFile={specifyFile[i]}
          options={options[i]}
          register={register}
          inputsHidden={inputsHidden[i]}
          inputsDefault={inputsDefault[i]}
          rowLabelsHidden={rowLabelsHidden}
        ></InputDetails>
      ))}
    </div>
  );
}

RowInput.propTypes = {
  inputTypes: PropTypes.any,
  inputs: PropTypes.any,
  options: PropTypes.any,
  register: PropTypes.any,
  rowLabel: PropTypes.any,
  specifyFile: PropTypes.any,
  rowLabelsHidden: PropTypes.any,
  inputsHidden: PropTypes.any,
  inputsDefault: PropTypes.any,
};

function InputDetails({
  input = "",
  inputType = "text",
  specifyFile = "",
  options = [],
  register,
  inputsHidden = false,
  inputsDefault = null,
  rowLabelsHidden = false,
}) {
  const font = formatFontLabel(input);

  const style =
    "w-full rounded-md border border-gray-400 bg-slate-700 placeholder:text-sky-500 hover:ring hover:ring-gray-500 focus:outline-none focus:ring focus:ring-gray-500";

  return (
    <div className={`my-auto w-full ${inputsHidden && "hidden"}`}>
      <label
        htmlFor={input}
        className={`font-bold ${rowLabelsHidden && "hidden"}`}
        title={font}
      >
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
            {...register(input)}
            defaultValue={inputsDefault}
          />

          {specifyFile === "file" && <input></input>}
        </>
      )}

      {inputType === "option" && (
        <select
          id={input}
          className={`${style}`}
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
    </div>
  );
}

InputDetails.propTypes = {
  input: PropTypes.any,
  inputType: PropTypes.any,
  options: PropTypes.any,
  register: PropTypes.any,
  specifyFile: PropTypes.any,
  inputsHidden: PropTypes.any,
  inputsDefault: PropTypes.any,
  rowLabelsHidden: PropTypes.any,
};
