import { Link } from "react-router-dom";
import Logo from "../ui/Logo";
import Btn from "../ui/Btn";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Form from "../ui/Form";

export default function Header() {
  const [showForm, showFormSet] = useState(true);

  function handleShowForm() {
    showFormSet((show) => !show);
  }

  return (
    <header className="relative col-span-4 flex h-12 items-center border-b border-blue-500 bg-blue-950 p-1 text-center text-sky-100">
      <Link to={"/"}>
        <Logo></Logo>
      </Link>
      <Btn
        position=" absolute"
        right="right-2"
        text="Add Employee"
        onClick={handleShowForm}
      >
        <PlusIcon className="h-6 w-6"></PlusIcon>
      </Btn>
      {showForm && <Form></Form>}
    </header>
  );
}
