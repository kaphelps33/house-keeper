import type { ComponentProps } from "react";

function Input({ id, placeholder, ...rest }: ComponentProps<"input">) {
  return (
    <input
      {...rest}
      id={id}
      placeholder={placeholder}
      className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 mb-4 rounded focus:outline-none focus:ring-2"
    />
  );
}

export default Input;
