import Swal from "sweetalert2";

export function swalAlert() {
  const confirmDelete = Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    customClass: {
      popup: "bg-slate-100/80 backdrop-blur-sm",
    },
  });
  return confirmDelete;
}

export function calculateAge(birthdate) {
  const birthDate = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export function formatFontLabel(font = "") {
  return (
    font.charAt(0).toUpperCase() + font.slice(1).replace(/([A-Z])/g, " $1")
  );
}

export function formatFontInput(font = "") {
  return (
    font.charAt(0).toUpperCase() + font.slice(1).replace(/([A-Z])/g, " $1")
  );
}

export function capitalizeFirstLetterEachWord(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function onHoverBgColor(color) {
  if (color === "red") return "hover:bg-red-700";
  if (color === "blue") return "hover:bg-blue-700";
  if (color === "yellow") return "hover:bg-yellow-600";
  if (color === "green") return "hover:bg-green-600";
  return "hover:bg-gray-700";
}

export function convertToJson(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      const content = e.target.result;
      const lines = content.split("\n");
      const newArray = lines.map((element) => element.replace("\r", ""));
      const headers = newArray.map((element) => element.split("\t"));
      const jsonData = headers.map((row) => {
        const obj = {};
        row.forEach((value, i) => {
          const key = headers[0][i];
          obj[key] = value;
        });
        return obj;
      });
      resolve(jsonData.splice(1, jsonData.length - 2));
    };

    reader.onerror = function (e) {
      reject(e);
    };

    reader.readAsText(file);
  });
}

[
  {
    No: "123",
    DevNo: "123",
    UserId: "123",
    Name: "123",
    Mode: "123",
    DateTime: "123",
  },
  {
    No: "123",
    DevNo: "123",
    UserId: "123",
    Name: "123",
    Mode: "123",
    DateTime: "123",
  },
  {
    No: "124",
    DevNo: "123",
    UserId: "123",
    Name: "123",
    Mode: "123",
    DateTime: "123",
  },
];
