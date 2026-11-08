import type { ComponentProps } from "react";

interface LabelProps extends ComponentProps<"label"> {
  label: string;
}

function Label({ label, ...rest }: LabelProps) {
  return <label {...rest}>{label}</label>;
}

export default Label;
