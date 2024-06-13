import PropTypes from "prop-types";

export default function RowInput({
  inputType = [],
  inputs = [],
  orientation,
  rowLabel,
  options = [],
  register,
}) {
  function getGridDesign(inputLength) {
    if (inputLength > 1) return "grid-cols-4  sm:px-0  md:grid md:grid-cols-3";
    return "";
  }

  const gridDesign = getGridDesign(inputs.length);

  const font =
    rowLabel.charAt(0).toUpperCase() +
    rowLabel.slice(1).replace(/([A-Z])/g, " $1");

  return (
    <div className={`mt-6 ${gridDesign} items-center ${orientation} gap-x-2`}>
      <h1 className="col-span-full flex items-center text-xl font-bold">
        {font}:
      </h1>
      {inputs.map((input, i) => (
        <Input
          key={i}
          input={input}
          inputType={inputType[i]}
          options={options[i]}
          register={register}
        ></Input>
      ))}
    </div>
  );
}

RowInput.propTypes = {
  inputType: PropTypes.any,
  inputs: PropTypes.any,
  rowLabel: PropTypes.any,
  orientation: PropTypes.any,
  options: PropTypes.any,
  register: PropTypes.any,
};

function Input({ input = "", inputType = "text", options = [], register }) {
  const font =
    input.charAt(0).toUpperCase() + input.slice(1).replace(/([A-Z])/g, " $1");

  return (
    <div className="my-auto h-full w-full">
      <label htmlFor={input} className="font-bold" title={font}>
        {font}
      </label>
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
    </div>
  );
}

Input.propTypes = {
  input: PropTypes.any,
  inputType: PropTypes.any,
  options: PropTypes.any,
  register: PropTypes.any,
};
