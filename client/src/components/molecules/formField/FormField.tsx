import Label from "../../atoms/label/Label";
import Input from "../../atoms/input/Input";

interface FormFieldProps {
  type: string;
  children: string;
  id: string;
  min?: number;
  max?: number;
  required: boolean;
}

function FormField({ type, children, id, min, max, required }: FormFieldProps) {
  return (
    <div>
      <Label children={children} id={id} htmlFor={id} />
      <Input
        type={type}
        id={id}
        name={id}
        min={min}
        max={max}
        required={required}
      />
    </div>
  );
}

export default FormField;
