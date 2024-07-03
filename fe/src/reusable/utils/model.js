export function registerModel() {
  return [
    {
      label: {
        rowLabels: "name",
        inputs: ["firstName", "middleName", "lastName"],
        isRequired: [true, true, true],
      },
    },
    {
      label: {
        rowLabels: "workInfo",
        inputs: ["position", "birthdate", "email", "employmentDate"],
        isRequired: [true, true, true, true],
        inputTypes: ["option", "date", "email", "date"],
        options: [["sales", "cashier", "optician", "optometrist"], [], []],
      },
    },
    {
      label: {
        rowLabels: "address",
        inputs: ["street", "purok", "brgy", "city", "province", "country"],
        isRequired: [false, false, true, true, true, true],
      },
    },
    {
      label: {
        rowLabels: "contactInfo",
        inputs: [
          "contactNumber1",
          "contactNumber2",
          "contactNumber3",
          "password",
          "repeatPassword",
        ],
        isRequired: [true, false, false, true, true],
        inputTypes: ["text", "text", "text", "password", "password"],
      },
    },
    {
      label: {
        rowLabels: "governmentInfo",
        inputs: ["SSS", "PagIbig", "PhilHealth", "TIN"],
        isRequired: [false, false, false, false],
      },
    },
    {
      label: {
        rowLabels: "emergencyInfo",
        inputs: [
          "contactPersonNameInEmergency",
          "contactPersonNumberInEmergency",
        ],
        isRequired: [true, true],
        options: [["Sales", "Cashier", "Optician", "Optometrist"], [], []],
      },
    },
    {
      label: {
        rowLabels: "selectImage",
        inputs: ["image"],
        isRequired: [true],
        inputTypes: ["file"],
        specifyFile: ["image"],
      },
    },
  ];
}
