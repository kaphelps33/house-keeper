import type { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  label: string;
}

function Button({ label, ...rest }: ButtonProps) {
  return <button {...rest}>{label}</button>;
}

export default Button;
