import type { ComponentProps } from "react";

function Input({ ...rest }: ComponentProps<"input">) {
  return <input {...rest} />;
}

export default Input;
