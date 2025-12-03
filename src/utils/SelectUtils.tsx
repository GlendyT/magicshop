import useRequestInfo from "@/hooks/useRequestInfo";
import { SelectUtilsProps } from "../types";

const SelectUtils = ({
  id,
  name,
  label,
  value,
  options,
  disabled = false,
  className,
  onChange
}: SelectUtilsProps) => {
  const { usuarioGenerado } = useRequestInfo();
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm  block">
        {label}
      </label>
      <select
      
        id={id}
        name={name}
        value={value}
        onChange={onChange || usuarioGenerado}
        disabled={disabled}
        className={` ${className}`}
        data-testid="select"
      >
        {options.map((option) => (
          <option
            key={option.id}
            value={option.id}
            className="text-black border border-t-black"
          >
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectUtils;
