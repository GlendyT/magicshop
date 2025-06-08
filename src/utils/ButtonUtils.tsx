import { ButtonProps } from "../types";

export const ButtonUtils = ({
  label,
  onClick,
  className,
  icon,
  disabled,
  disableColors,
}: ButtonProps) => {
  return (
    <button
      className={`flex justify-center  gap-2 font-bold transition-all ${className} rounded-xl ${disableColors} `}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{label}</span>
      {icon && <span>{icon}</span>}
    </button>
  );
};
