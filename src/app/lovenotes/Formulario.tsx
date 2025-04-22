import useRequestInfo from "@/hooks/useRequestInfo";
import InputName from "@/utils/InputName";
import VStyleOptions from "./VStyleOptions";
import { Button } from "@/utils/Button";

const Formulario = () => {
  const {
    handleSubmit,
    isMaxCharLimitReachedH,
    charCount,
    usuario,
    handleContentH,
    maxCharLimitH,
  } = useRequestInfo();
  const { content, name, diseño } = usuario;
  return (
    <div className="shadow-2xl relative flex flex-col w-full backdrop-blur-xl bg-pink-100/10 outline-none focus:outline-none rounded-lg p-5">
      <div className="flex items-center justify-center mt-5">
        <h3 className="text-2xl font-bold font-purple-800">
          Valentine´s Day with BTS and ARMY
        </h3>
      </div>
      <form className="mt-5 flex flex-col gap-6" onSubmit={handleSubmit}>
        <InputName
          from="To"
          placeholder="Whom"
          className=" border border-white rounded w-full py-2 px-3 text-white transition-all leading-tight placeholder-gray-100 focus:outline-none focus:shadow-outline resize-none"
        />
        <div className="">
          <label className="flex float-start text-sm mb-2 text-white">
            From
          </label>
          <div
            className={`text-xs mb-2 float-end  ${
              isMaxCharLimitReachedH
                ? "text-red-600 font-extrabold"
                : "text-white"
            }`}
          >
            {isMaxCharLimitReachedH && (
              <span className="text-red-600 font-extrabold">Too long!</span>
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
            placeholder="Your Name"
            className={` appearance-none  transition-all  border-white border disabled:border-gray-300 disabled:text-gray-100 rounded w-full py-2 px-3 text-white focus:outline-none focus:shadow-outline resize-none ${
              isMaxCharLimitReachedH
                ? "border-red-500 text-red-500"
                : "border-gray-300"
            }`}
            disabled={!name}
          />
        </div>
        <VStyleOptions />
        <Button
          label="Create Post"
          className={`w-full p-3 uppercase disabled:cursor-not-allowed  ${
            diseño
              ? "bg-purple-800 text-white"
              : "bg-purple-500/30 text-gray-200"
          }`}
          disabled={!diseño}
        />
      </form>
    </div>
  );
};

export default Formulario;
