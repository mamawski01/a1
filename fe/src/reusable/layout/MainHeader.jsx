import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

import Logo from "../../ui/Logo";
import Btn from "../components/Btn";
import UserForm from "../../project/UserForm";

export default function MainHeader() {
  const [showForm, showFormSet] = useState(false);

  function handleShowForm() {
    showFormSet((show) => !show);
  }

  return (
    <header className="mainHeader">
      <div className="mainSubHeader">
        <Link to={"/"}>
          <Logo></Logo>
        </Link>
        <Btn right="right-2" text="Add Employee" onClick={handleShowForm}>
          <PlusIcon className="h-6 w-6"></PlusIcon>
        </Btn>
        {showForm && <UserForm></UserForm>}
      </div>
    </header>
  );
}
