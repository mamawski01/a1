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
        options: [
          ["0hr:15min", "0hr:30min", "1hr:00min", "1hr:30min"],
          ["30%"],
          ["30%"],
        ],
      },
    },
    {
      label: {
        rowLabels: "",
        inputs: ["holidayRatingSpecial", "regularDutyHours", "overtimeStarts"],
        isRequired: [true, true, true],
        inputTypes: ["option", "option", "option"],
        options: [
          ["30%"],
          ["6hr:00min", "7hr:00min", "8hr:00min", "9hr:00min"],
          ["0hr:15min", "0hr:30min", "1hr:00min", "1hr:30min"],
        ],
      },
    },
  ];
}

export function timeArr(defVal) {
  let timeArray = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let minute of [0, 30]) {
      let period = hour < 12 ? "am" : "pm";
      let hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      let time = `${hour12.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")} ${period}`;
      timeArray.push(time);
    }
  }

  return [defVal, "day-off", ...timeArray];
}
