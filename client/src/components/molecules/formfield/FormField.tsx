import Input from "../../atoms/input/Input";
import Label from "../../atoms/label/Label";

function FormField({
  children,
  id,
  placeholder,
  ...rest
}: {
  children: string;
  id: string;
  placeholder: string;
}) {
  return (
    <>
      <Label children={children} htmlFor={id} />
      <Input id={id} placeholder={placeholder} {...rest} />
    </>
  );
}

export default FormField;
