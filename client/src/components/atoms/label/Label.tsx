import type { ComponentProps } from "react";

interface LabelProps extends ComponentProps<"label"> {
  children: string;
  htmlFor: string;
}

function Label({ children, htmlFor, ...rest }: LabelProps) {
  return (
    <label {...rest} htmlFor={htmlFor} className="font-semibold text-xs">
      {children}
    </label>
  );
}

export default Label;
