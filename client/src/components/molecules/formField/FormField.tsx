import Label from "../../atoms/label/Label";
import Input from "../../atoms/input/Input";

interface FormFieldProps {
  label: string;
  id: string;
  min?: number;
  max?: number;
  required: boolean;
}

function FormField({ label, id, min, max, required }: FormFieldProps) {
  return (
    <div>
      <Label label={label} id={id} htmlFor={id} />
      <Input id={id} name={id} min={min} max={max} required={required} />
    </div>
  );
}

export default FormField;
