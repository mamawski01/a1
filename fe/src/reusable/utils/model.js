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
        inputs: [
          "position",
          "status",
          "birthdate",
          "email",
          "employmentDate",
          "wage",
        ],
        isRequired: [true, true, true, true, true, true],
        inputTypes: ["option", "option", "date", "email", "date", "text"],
        options: [
          ["sales", "cashier", "optician", "optometrist"],
          ["single", "married", "widowed", "divorced"],
          [],
        ],
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

export function attendanceSettingModel() {
  return [
    {
      label: {
        rowLabels: "attendanceSetting",
        inputs: ["breakTime", "regularRating", "holidayRatingRegular"],
        isRequired: [true, true, true],
        inputTypes: ["option", "option", "option"],
        options: [["15mins", "30mins", "1hr", "1hr:30mins"], ["30%"], ["30%"]],
      },
    },
    {
      label: {
        rowLabels: "",
        inputs: ["holidayRatingSpecial", "regularDutyHours"],
        isRequired: [true, true],
        inputTypes: ["option", "option"],
        options: [["30%"], ["6", "7", "8", "9"]],
      },
    },
  ];
}
