import classNames from "classnames";
import { forwardRef } from "react";

export type ButtonVariant = 'primary' | 'secondary' | 'text';

interface ButtonProps {
  children: React.ReactNode,
  variant?: ButtonVariant
}

export const Button: React.FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      ...props
    }, ref
  ) => {

    const variantMap: { [key in ButtonVariant]: string } = {
      primary: 'bg-buttonBackground',
      secondary: '',
      text: ''
    }

    return (
      <button
        ref={ref}
        type="submit"
        className={classNames([
          'text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800',
          variantMap[variant],
        ])}
        {...props}
      />
    );
  }
);
