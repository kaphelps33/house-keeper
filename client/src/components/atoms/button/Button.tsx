import type { ComponentProps, ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const variantClasses = {
  primary: styles.primary,
  secondary: styles.secondary,
  danger: styles.danger
};

function Button({ variant = "primary", children, ...rest }: ButtonProps) {
  return (
    <button className={`${styles.button} ${variantClasses[variant]}`} {...rest}>
      {children}
    </button>
  );
}

export default Button;
