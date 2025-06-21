import useRequestInfo from "@/hooks/useRequestInfo";
import { SelectUtilsProps } from "../types";

const SelectUtils = ({
  id,
  name,
  label,
  value,
  options,
  disabled = false,
  placeholder = "",
  className,
}: SelectUtilsProps) => {
  const { usuarioGenerado } = useRequestInfo();
  return (
    <>
      <label htmlFor={id} className="text-sm text-white block">
        {label}
      </label>
      <select
      
        id={id}
        name={name}
        value={value}
        onChange={usuarioGenerado}
        disabled={disabled}
        className={` ${className}`}
        data-testid="select"
      >
        <option value="" className="text-black">
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={option.id}
            value={option.name}
            className="text-black border border-t-black"
          >
            {option.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectUtils;
