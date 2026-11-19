import type { ComponentProps } from "react";

interface LabelProps extends ComponentProps<"label"> {
  children: string;
}

function Label({ children, ...rest }: LabelProps) {
  return <label {...rest}>{children}</label>;
}

export default Label;
