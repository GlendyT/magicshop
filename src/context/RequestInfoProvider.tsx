"use client";

import {
  ChangeEvent,
  createContext,
  FormEvent,
  useEffect,
  useState,
} from "react";
import {
  BTSFlowerKey,
  RequestInfoContextType,
  RequestInfoProviderProps,
  UsuarioType,
} from "../types";
import { btsImg, membersBts } from "@/valentineday/membersBts";
import { citiesVisited } from "@/vpassport/Data/citiesVisited";

const RequestInfoContext = createContext<RequestInfoContextType>(null!);

const RequestInfoProvider = ({ children }: RequestInfoProviderProps) => {
  const [usuario, setUsuario] = useState<UsuarioType>({
    name: "",
    content: "",
    diseño: "",
    song: "",
  });
  const [resultado, setResultado] = useState<UsuarioType | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [charCount, setCharCount] = useState<number>(
    usuario.content.length || 0
  );
  const [charCountFrom, setCharCountFrom] = useState<number>(
    usuario.name.length || 0
  );
  const [currWord] = useState<string>("hope");
  const [input, setInput] = useState<string>("");
  const [isCorrectGuess, setIsCorrectGuess] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [selectedMembers, setSelectedMembers] = useState<string | null>(null);
  // const [cardData, setCardData] = useState<{ image: string } | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  const maxCharLimit = 281;
  const maxCharLimitH = 21;
  const maxFromLimitH = 16;

  const generateWordDisplay = (currWord: string) => {
    return isCorrectGuess ? currWord : "_".repeat(currWord.length).trim();
  };

  const handleCorrectWord = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) {
      return;
    }
    const guessedWord = input.toLowerCase();
    const correct = guessedWord === currWord.toLowerCase();
    setIsCorrectGuess(correct);
    setHasSubmitted(true);
    setInput("");

    if (!correct) {
      setShowErrorMessage(true);
    }
  };

  useEffect(() => {
    if (showErrorMessage) {
      const timer = setTimeout(() => {
        setShowErrorMessage(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showErrorMessage]);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };
  useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Add event listener

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup
    };
  }, []);

  const handleContent = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const inputValue = e.target.value;
    if (inputValue.length <= maxCharLimit) {
      setCharCount(inputValue.length);
      usuarioGenerado(e);
    }
  };

  const handleContentH = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length <= maxCharLimitH) {
      setCharCount(inputValue.length);
      usuarioGenerado(e);
    }
  };

  const handleNameH = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length <= maxFromLimitH) {
      setCharCountFrom(inputValue.length);
      usuarioGenerado(e);
    }
  };

  const isMaxCharLimitReached = charCount === maxCharLimit;
  const isMaxCharLimitReachedH = charCount === maxCharLimitH;
  const isMaxFromLimitReachedH = charCountFrom === maxFromLimitH;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(false);
    generarUsuario(usuario);
  };

  const usuarioGenerado = (
    e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const usuarioGenerado1 = (e: ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value as BTSFlowerKey;

    const selectedStyles = membersBts[key];
    const selectedImage = btsImg[key];

    setUsuario((prev) => ({
      ...prev,
      diseño: key,
      image: selectedImage,
      estilos: selectedStyles,
    }));
  };

  const generarUsuario = (dato: UsuarioType) => {
    setCargando(true);
    try {
      setResultado(dato);
      setCargando(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetContent = () => {
    setCargando(true);
    setUsuario({ name: "", content: "", diseño: "", song: "" });
    setCharCount(0);
    setCharCountFrom(0);
  };

  const randomIndex = Math.floor(Math.random() * citiesVisited.length);
  const randomCity = citiesVisited[randomIndex];
  const { image, stamp } = randomCity;

  return (
    <RequestInfoContext.Provider
      value={{
        usuario,
        resultado,
        cargando,
        error,
        charCount,
        charCountFrom,
        currWord,
        input,
        isCorrectGuess,
        hasSubmitted,
        showModal,
        showErrorMessage,
        isMobile,
        selectedMembers,
        showForm,
        setUsuario,
        setResultado,
        setCargando,
        setError,
        setCharCount,
        setCharCountFrom,
        setInput,
        setIsCorrectGuess,
        setHasSubmitted,
        setShowModal,
        setShowErrorMessage,
        setIsMobile,
        setSelectedMembers,
        setShowForm,
        maxCharLimit,
        maxCharLimitH,
        maxFromLimitH,
        image,
        stamp,
        //TODO: FUNCTIONS
        generateWordDisplay,
        handleCorrectWord,
        handleResize,
        handleContent,
        handleContentH,
        handleNameH,
        handleSubmit,
        usuarioGenerado1,
        usuarioGenerado,
        handleResetContent,
        isMaxCharLimitReached,
        isMaxCharLimitReachedH,
        isMaxFromLimitReachedH,
      }}
    >
      {children}
    </RequestInfoContext.Provider>
  );
};

export { RequestInfoProvider };
export default RequestInfoContext;
