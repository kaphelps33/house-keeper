import type { ComponentProps, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: ButtonVariant;
  children: ReactNode;
}

function Button({ variant = "primary", children, ...rest }: ButtonProps) {
  const variantStyling = () => {
    if (variant === "primary") {
      return "border-primary bg-primary text-off-white hover:border-dark-green shadow-sm";
    } else if (variant === "secondary") {
      return "bg-green border-green text-off-white hover:border-dark-green shadow-sm";
    } else if (variant === "danger") {
      return "bg-danger border-danger text-off-white hover:bg-red-900";
    }
  };
  return (
    <button
      className={`border rounded cursor-pointer h-9 leading-6.75 min-w-13.5 text-center select-none touch-manipulation whitespace-pre transition-[0.2s] duration-[ease] px-3 py-0 border-solid ${variantStyling} disabled:opacity-50 disabled:cursor-not-allowed`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
