import { ButtonProps } from "../types";

export const Button = ({
  label,
  onClick,
  className,
  icon,
  disabled,
  disableColors,
}: ButtonProps) => {
  return (
    <button
      className={`flex justify-center cursor-pointer gap-2 font-bold transition-colors  transition-all ${className} rounded-xl ${disableColors} `}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{label}</span>
      {icon && <span>{icon}</span>}
    </button>
  );
};
