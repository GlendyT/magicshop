import { ButtonPhotobooth } from "@/types/index";
import classNames from "classnames";

const Button = ({
  children,
  className,
  variant,
  type,
  onClick,
  ...rest
}: ButtonPhotobooth) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(
        className,
        "hover:shadow-inner px-4 py-2 text-sm rounded-3xl",
        {
          "bg-purple-700 text-white hover:bg-purple-700 hover:text-white":
            variant === "primary",
          "bg-red-700 text-white hover:bg-red-700 hover:text-white":
            variant === "secondary",
          "bg-white text-gray-900 hover:bg-white hover:text-blue-500":
            variant === "light",
        }
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
