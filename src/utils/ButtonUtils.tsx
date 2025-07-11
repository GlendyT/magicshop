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
      data-testid="button"
      className={`flex justify-center  gap-2 font-bold transition-all ${className} rounded-xl ${disableColors} `}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="flex flex-row items-center justify-center gap-2 ">
        {label} {icon}
      </span>
    </button>
  );
};
