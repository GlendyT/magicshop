import useRequestInfo from "@/hooks/useRequestInfo";
import { InputContentProps } from "../types";

const InputContentUtils = ({ placeholder, className, from }: InputContentProps) => {
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
      <label className={`flex float-start text-sm text-white `}>{from}</label>
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
        value={content}
        onChange={handleContentH}
        maxLength={maxCharLimitH}
        placeholder={placeholder}
        className={`${className}`}
        disabled={!name}
      />
    </div>
  );
};

export default InputContentUtils;
