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
  schedules,
  daysArr,
  index,
}) {
  const scheduleArr = schedules?.schedule.map((obj) => obj.date);

  const updated = daysArr.map((item) => {
    const ids = schedules?.schedule.find((date) => date.date === item)?._id;

    return ids;
  });
  console.log(updated);

  const submitBtnHidden = data[0].label.submitBtnHidden;

  const { register, handleSubmit } = useForm();
  async function onSubmit(data) {
    const finalData = { schedule: [{ ...data }] };
    updated[index]
      ? dataEdit(attendanceId, finalData, "id2nd")
      : dataSave(finalData, attendanceId);
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
              onMouseEnter={updated[index] ? null : handleSubmit(onSubmit)}
              onClick={updated[index] ? handleSubmit(onSubmit) : null}
            >
              {updated[index] ? "Update " : "Save "}
            </button>
            {updated[index] && updated[index]}
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
        inputType === "email" ||
        inputType === "password") && (
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

const arr = [
  {
    date: "24-07-03 Wed 03",
    timeIn: "9:00 am",
    timeOut: "6:00 pm",
    _id: {
      $oid: "66a0bd0a716259f5a5c5c6f3",
    },
  },
  {
    date: "24-07-06 Sat 06",
    timeIn: "9:00 am",
    timeOut: "6:00 pm",
    _id: {
      $oid: "66a0bd1f716259f5a5c5c717",
    },
  },
  {
    date: "24-07-09 Tue 09",
    timeIn: "9:00 am",
    timeOut: "6:00 pm",
    _id: {
      $oid: "66a0bf4fb69fe5dd4b94429d",
    },
  },
];

const checker = "24-07-03 Wed 03";

const result = arr.find((item) => item.date === checker)._id.$oid;

// console.log(result);
