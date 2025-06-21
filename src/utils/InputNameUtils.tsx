import useRequestInfo from "@/hooks/useRequestInfo";
import { InputNameProps } from "../types";

const InputNameUtils = ({
  placeholder,
  className = "",
  from,
  disabled,
}: InputNameProps) => {
  const {
    usuario,
    handleNameH,
    maxFromLimitH,
    isMaxFromLimitReachedH,
    charCountFrom,
  } = useRequestInfo();
  const { name } = usuario;
  return (
    <div className="">
      <label className={`flex float-start text-sm mb-2 text-white `}>
        {from}
      </label>
      <div
        className={`text-xs mb-2 float-end ${
          isMaxFromLimitReachedH ? "text-red-600 font-extrabold" : "text-white"
        }`}
      >
        {isMaxFromLimitReachedH && (
          <span className="text-red-600">Too long!</span>
        )}{" "}
        {charCountFrom}/15
      </div>
      <input
        id="name"
        name="name"
        value={name}
        onChange={handleNameH}
        maxLength={maxFromLimitH}
        placeholder={placeholder}
        className={`rounded w-full py-2 px-3 transition-all leading-tight focus:outline-none focus:shadow-outline resize-none border disabled:border-gray-600 ${
          isMaxFromLimitReachedH
            ? "border-red-800 text-red-600"
            : "border-gray-400"
        } ${className}`}
        disabled={disabled}
      />
    </div>
  );
};

export default InputNameUtils;
