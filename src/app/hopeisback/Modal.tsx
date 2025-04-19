import useRequestInfo from "@/hooks/useRequestInfo";
import { Button } from "@/utils/Button";

const Modal = () => {
  const {
    generateWordDisplay,
    handleCorrectWord,
    input,
    setInput,
    isCorrectGuess,
    showErrorMessage,
    currWord,
    setShowErrorMessage,
    setShowModal,
    setHasSubmitted,
  } = useRequestInfo();
  const handleCheckCorrectWord = () => {
    if (!isCorrectGuess) {
      setShowErrorMessage(true);
    } else {
      setShowModal(false);
      setHasSubmitted(true);
      setShowErrorMessage(false);
    }
  };
  return (
    <>
      <div className="justify-center items-center flex fixed inset-10 z-40">
        <div className="relative w-auto my-6 mx-auto">
          <div className=" pb-4 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center justify-between p-5 border-b boder-solid border-blue-200 rounded-t">
              <h1 className="text-xl font-bold">Access Word</h1>
            </div>
            <div className="relative p-2 flex-auto">
              <p className="my-4 text-lg leading-relazed">
                I´m your hope, you are my hope, I´m j-
                {generateWordDisplay(currWord)}
              </p>
            </div>
            <form
              onSubmit={handleCorrectWord}
              className="flex gap-4 items-center justify-center"
            >
              <input
                id="input"
                name="input"
                type="text"
                value={input}
                maxLength={4}
                placeholder="Write the correct word"
                onChange={(e) => setInput(e.target.value)}
                className={`text-center outline py-2 ${
                  isCorrectGuess ? "hidden" : ""
                }`}
              />

              <Button
                label={
                  isCorrectGuess
                    ? "Access Granted! Click here"
                    : showErrorMessage
                    ? "Wrong, Try Again"
                    : "Submit Guess"
                }
                onClick={isCorrectGuess ? handleCheckCorrectWord : undefined}
                className={` text-white py-2 px-2 ${
                  isCorrectGuess
                    ? "bg-purple-900"
                    : showErrorMessage
                    ? "bg-red-500"
                    : "bg-emerald-500 active:bg-emerald-600"
                }`}
              />
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-30 fixed inset-10 z-30 bg-purple-950"></div>
    </>
  );
};

export default Modal;
