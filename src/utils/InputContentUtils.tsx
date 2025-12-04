import useRequestInfo from "@/hooks/useRequestInfo";
import { InputContentProps } from "../types";

const InputContentUtils = ({ placeholder, className, from, value, onChange, disabled }: InputContentProps) => {
  const {
    isMaxCharLimitReachedH,
    charCount,
    usuario,
    handleContentH,
    maxCharLimitH,
  } = useRequestInfo();
  const { content, name } = usuario;
  return (
    <div className="">
      <label className={`flex float-start text-sm `}>{from}</label>
      <div
        className={`text-xs text-end  ${
          isMaxCharLimitReachedH ? "text-red-500 font-extrabold" : "text-white"
        }`}
      >
        {isMaxCharLimitReachedH && (
          <span className="text-red-500">Too long!</span>
        )}{" "}
        {charCount}/20
      </div>
      <input
        id="content"
        name="content"
        type="text"
        value={value || content}
        onChange={onChange ? (e) => onChange(e.target.value) : handleContentH}
        maxLength={maxCharLimitH}
        placeholder={placeholder}
        className={`${className}`}
        disabled={disabled !== undefined ? disabled : !name}
        data-testid="input-content"
      />
    </div>
  );
};

export default InputContentUtils;
