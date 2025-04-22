"use client";

import useFish from "@/hooks/useFish";
import Modal from "./Modal";
import Fishing from "./Fishing";
import Formulario from "./Formulario";
import Waves from "./Waves";

const Seokjin = () => {
  const { showModal, isWinner, isLoser, show } = useFish();
  return (
    <div className="bg-[#2b74ce] flex flex-col min-h-screen justify-center">
      <p className="text-lg font-extrabold text-center max-sm:text-xs">
        Let´s fish some music!
      </p>
      {isWinner || isLoser ? show ? <Modal /> : <Fishing /> : <Fishing />}

      {showModal && <Formulario />}
      <Waves />
    </div>
  );
};

export default Seokjin;
