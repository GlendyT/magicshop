import React from "react";
import { SelectUtilsProps } from "../types";

const RadioOptionsUtils = ({
  id,
  name,
  options,
  className,
  checked,
  onChange,
  labelStyles,
  spanStyles,
  disabled,
}: SelectUtilsProps) => {
  return (
    <div className={`${className}`} data-testid="radio-options">
      {options.map((option) => {
        const isSelected = checked === option.name;
        return (
          <label
            key={option.id}
            htmlFor={`${id}-${option.id}`}
            className={`${labelStyles} ${disabled || option.disabled ? "cursor-not-allowed opacity-50" : ""
              }`}
            title={option.disabled ? 'COMING SOON' : undefined}
          >
            {option.name}
            <input
              id={`${id}-${option.id}`}
              name={name}
              type="radio"
              value={option.name}
              onChange={onChange}
              checked={checked === option.name}
              className="hidden"
              disabled={disabled || option.disabled}
            />
            <span
              className={`w-4 h-4 rounded ${spanStyles?.(option, isSelected) ?? ""
                }`}
            ></span>
          </label>
        );
      })}
    </div>
  );
};

export default RadioOptionsUtils;
