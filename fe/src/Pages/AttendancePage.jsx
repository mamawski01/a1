import {
  apiConfirmUserDelete,
  apiConfirmUserPatchUser,
  getConfirmUser,
} from "../api/api";
import Form from "../reusable/components/Form";
import { registerModel } from "../reusable/utils/model";

export default function AttendancePage() {
  return (
    <Form
      dataEdit={apiConfirmUserPatchUser}
      dataDelete={apiConfirmUserDelete}
      dataDefaultVal={getConfirmUser}
      data={registerModel()}
    ></Form>
  );
}
