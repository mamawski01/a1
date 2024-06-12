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
        <Logo></Logo>
        <Btn text="Add Employee" onClick={handleShowForm}></Btn>
        {showForm && <UserForm></UserForm>}
      </div>
    </header>
  );
}
