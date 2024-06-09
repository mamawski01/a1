import { useForm } from "react-hook-form";
import Label from "./Label";
import Input from "./Input";
import Row from "./Row";
import Box from "./Box";
import TextArea from "./TextArea";

export default function Form() {
  const { register, handleSubmit } = useForm();

  return (
    <form action="" className="board">
      <Box>
        <Row type="flex-col">
          <Label text="firstName"></Label>
          <Input text="firstName"></Input>
        </Row>
        <Row type="flex-col">
          <Label text="lastName"></Label>
          <Input text="lastName"></Input>
        </Row>
        <Row type="flex-col" span="col-span-3">
          <Label text="address"></Label>
          <TextArea text="address"></TextArea>
        </Row>
      </Box>
    </form>
  );
}
