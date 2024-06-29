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

export function onHoverBgColor(color) {
  if (color === "red") return "hover:bg-red-700";
  if (color === "blue") return "hover:bg-blue-700";
  if (color === "yellow") return "hover:bg-yellow-600";
  if (color === "green") return "hover:bg-green-600";
  return "hover:bg-gray-700";
}
