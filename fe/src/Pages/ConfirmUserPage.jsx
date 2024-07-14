import {
  apiConfirmUser,
  apiConfirmUserDelete,
  apiConfirmUserPatchUser,
} from "../api/confirmUser";
import Form from "../reusable/components/Form";
import { registerModel } from "../reusable/utils/model";

export default function ConfirmUserPage() {
  return (
    <Form
      dataEdit={apiConfirmUserPatchUser}
      dataDelete={apiConfirmUserDelete}
      dataDefaultVal={apiConfirmUser}
      data={registerModel()}
    ></Form>
  );
}
