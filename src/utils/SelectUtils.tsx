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
  labelStyles,
  onChange,
}: SelectUtilsProps) => {
  const { usuarioGenerado } = useRequestInfo();
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className={`text-sm block ${labelStyles || ""}`}>
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange || usuarioGenerado}
        disabled={disabled}
        className={` capitalize ${className}`}
        data-testid="select"
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option
            key={option.id}
            value={option.name}
            className="text-black border border-t-black capitalize"
          >
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectUtils;
