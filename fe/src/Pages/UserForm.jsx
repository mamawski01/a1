import {
  apiUser,
  apiUserDeleteUser,
  apiUserPatchUser,
  apiUserPostUser,
} from "../api/api";
import Form from "../reusable/components/Form";
import { registerModel } from "../reusable/utils/model";

export default function UserForm() {
  return (
    <Form
      dataSave={apiUserPostUser}
      dataEdit={apiUserPatchUser}
      dataDelete={apiUserDeleteUser}
      dataDefaultVal={apiUser}
      data={registerModel()}
    ></Form>
  );
}
