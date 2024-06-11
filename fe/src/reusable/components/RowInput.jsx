import PropTypes from "prop-types";

export default function RowInput({ inputType, inputs, orientation, rowLabel }) {
  const gridDesign =
    inputs.length > 4 ? " grid-cols-2  sm:px-0  md:grid" : "lg:flex";

  const font =
    rowLabel.charAt(0).toUpperCase() +
    rowLabel.slice(1).replace(/([A-Z])/g, " $1");

  return (
    <div className={`mb-1 ${gridDesign} items-center gap-2 ${orientation} `}>
      <h1 className="col-span-full text-xl font-bold">{font}:</h1>
      {inputs.map((input, i) => (
        <Input key={i} input={input} inputType={inputType[i]}></Input>
      ))}
    </div>
  );
}

RowInput.propTypes = {
  children: PropTypes.any,
  data: PropTypes.any,
  inputType: PropTypes.any,
  inputs: PropTypes.any,
  rowLabel: PropTypes.any,
  span: PropTypes.any,
  orientation: PropTypes.any,
};

function Input({ input = "", inputType = "text" }) {
  console.log(inputType);
  const font =
    input.charAt(0).toUpperCase() + input.slice(1).replace(/([A-Z])/g, " $1");

  return (
    <div className="w-full">
      <label htmlFor={input} className="font-bold">
        {font}
      </label>
      {inputType === "textarea" ? (
        <textarea
          id={input}
          autoComplete="off"
          placeholder={font}
          className="w-full rounded-lg border border-gray-400 bg-slate-700 px-4 py-2 placeholder:text-sky-500 focus:outline-none focus:ring focus:ring-gray-500"
        ></textarea>
      ) : (
        <input
          type={inputType}
          placeholder={font}
          id={input}
          className="w-full rounded-lg border border-gray-400 bg-slate-700 px-4 py-2 placeholder:text-sky-500 hover:ring hover:ring-gray-500 focus:outline-none focus:ring focus:ring-gray-500"
          autoComplete="off"
        />
      )}
    </div>
  );
}

Input.propTypes = {
  i: PropTypes.any,
  input: PropTypes.any,
  inputType: PropTypes.any,
  type: PropTypes.any,
};
