import { ChangeEvent, FormEvent, ReactNode } from "react";

export type UsuarioType = {
  name: string;
  content: string;
  diseño: string;
  song?: string;
};

export type RequestInfoProviderProps = {
  children: ReactNode;
};

export type RequestInfoContextType = {
  usuario: UsuarioType;
  resultado: UsuarioType | null;
  cargando: boolean;
  error: boolean;
  charCount: number;
  charCountFrom: number;
  currWord: string;
  input: string;
  isCorrectGuess: boolean;
  hasSubmitted: boolean;
  showModal: boolean;
  showErrorMessage: boolean;
  isMobile: boolean;
  selectedMembers: string | null;
  // cardData: string | null;
  showForm: boolean;
  setUsuario: (usuario: UsuarioType) => void;
  setResultado: (resultado: UsuarioType) => void;
  setCargando: (cargando: boolean) => void;
  setError: (error: boolean) => void;
  setCharCount: (charCount: number) => void;
  setCharCountFrom: (charCountFrom: number) => void;
  setInput: (input: string) => void;
  setIsCorrectGuess: (isCorrectGuess: boolean) => void;
  setHasSubmitted: (hasSubmitted: boolean) => void;
  setShowModal: (showModal: boolean) => void;
  setShowErrorMessage: (showErrorMessage: boolean) => void;
  setIsMobile: (isMobile: boolean) => void;
  setSelectedMembers: (selectedMembers: string | null) => void;
  //  setCardData: (cardData: string | null) => void;
  setShowForm: (showForm: boolean) => void;
  maxCharLimit: number;
  maxCharLimitH: number;
  maxFromLimitH: number;
  generateWordDisplay: (currWord: string) => string;
  handleCorrectWord: (e: FormEvent<HTMLFormElement>) => void;
  handleResize: () => void;
  handleContent: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  handleContentH: (e: ChangeEvent<HTMLInputElement>) => void;
  handleNameH: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  usuarioGenerado: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;

  usuarioGenerado1: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleResetContent: () => void;
  //handleSubmit1: (e: FormEvent<HTMLFormElement>) => void;
  isMaxCharLimitReached: boolean;
  isMaxCharLimitReachedH: boolean;
  isMaxFromLimitReachedH: boolean;
  image: string;
  stamp: string;
};

export type BtsPhrases = {
  title: string;
  from: string;
  image: string;
};
export type ButtonProps = {
  label: string;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode | undefined;
  disabled?: boolean;
  disableColors?: string;
};

export type DownloadContextType = {
  handleDownloadImage: () => Promise<void>;
};

export type DownloaderProviderProps = {
  children: ReactNode;
};

export type ButtonPhotobooth = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "light";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export type ModalProps = {
  open: boolean;
  children: ReactNode;
};

export type ImageProviderProps = {
  children: ReactNode;
  max_zoom?: number;
  min_zoom?: number;
  zoom_step?: number;
  max_rotation?: number;
  min_rotation?: number;
  rotation_step?: number;
};

type Crop = { x: number; y: number };
type CropArea = { width: number; height: number; x: number; y: number };

export type ImageCropContextType = {
  image: string | null;
  setImage: (image: string | null) => void;
  crop: Crop;
  setCrop: (crop: Crop) => void;

  rotation: number;
  setRotation: (zoom: number) => void;

  zoom: number;
  setZoom: (zoom: number) => void;
  croppedAreaPixels: CropArea | null;
  setCroppedAreaPixels: (pixels: CropArea) => void;

  onCropComplete: (_croppedArea: unknown, croppedAreaPixels: CropArea) => void;
  getProcessedImage: () => Promise<File | undefined>;

  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleRotateCw: () => void;
  handleRotateAntiCw: () => void;

  max_zoom: number;
  min_zoom: number;
  zoom_step: number;
  max_rotation: number;
  min_rotation: number;
  rotation_step: number;

  resetStates: () => void;
};

export type btsPersonalizedBGProps = {
  id: number;
  name: string;
  image: string;
};

export type PixelCrop = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Flip = {
  horizontal: boolean;
  vertical: boolean;
};

export type CroppedImageResult = {
  file: Blob;
  url: string;
} | null;

export type PhotoboothContextType = {
  openModal: boolean;
  changeColor: boolean;
  photo2Complete: boolean;
  preview1: string | null;
  preview2: string | null;
  preview3: string | null;
  setPreview1: (preview: string | null) => void;
  setPreview2: (preview: string | null) => void;
  setPreview3: (preview: string | null) => void;
  setOpenModal: (openModal: boolean) => void;
  setChangeColor: (changeColor: boolean) => void;
  imageSaved: boolean;
  setImageSaved: (imageSaved: boolean) => void;
  setPhoto2Complete: (photo2Complete: boolean) => void;
  handleFileChangePhoto1: (event: ChangeEvent<HTMLInputElement>) => void;
  handleFileChangePhoto2: (event: ChangeEvent<HTMLInputElement>) => void;
  handleFileChangePhoto3: (event: ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  resetPhotos: () => void;
  backgroundImage: string | null;
  setBackgroundImage?: (backgroundImage: string | null) => void;
  handleSelection: (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => void; // Optional
};
export type PhotoboothProviderProps = {
  children: ReactNode;
};

export type BTSFlowerKey =
  | "btsflower"
  | "rmflower"
  | "jinflower"
  | "sugaflower"
  | "jhopeflower"
  | "jiminflower"
  | "vflower"
  | "jungkookflower";

export type MemberDetails = Record<
  BTSFlowerKey,
  {
    div1: string;
    div2: string;
    div3: string;
    p: string;
    to: string;
    from: string;
  }
>;

export type InputNameProps = {
  placeholder: string;
  className: string;
  from?: string;
  disabled?: boolean;
};

export type Divs = {
  div1: string;
  div2: string;
  div3: string;
  p: string;
  to?: string;
  from?: string;
};

export type SugaStyle = {
  id: number;
  name: string;
  image: string;
  style: Divs[];
};

export type LoveNotesTypes = SugaStyle;

export type hobiSongs = {
  id: number;
  title: string;
};

export type hobiMusicTypes = {
  id: number;
  name: string;
  songs: hobiSongs[];
};

export type citiesVisitedTypes = {
  id: number;
  name: string;
  image: string;
  stamp: string;
};

export type PassportItem = {
  label: string;
  value: string;
};

export type PassportDetailsProps = {
  items: PassportItem[];
};

export type SquareVerStyles = {
  id: number;
  name: string;
  image: string;
  color: string;
};

export type hobiPersonalizedTypes = {
  id: number;
  name: string;
  styles: SquareVerStyles[];
};

export type ImageListTypes = {
  id: number;
  img: string;
  price: string;
  id2: number;
  isMatched?: boolean;
};

export type FlipContextProps = {
  timer: number;
  setTimer: (value: number) => void;
  items: ImageListTypes[];
  setItems: (value: ImageListTypes[]) => void;
  prev: number;
  setPrev: (value: number) => void;
  gameOver: boolean;
  setGameOver: (value: boolean) => void;
  win: boolean;
  setWin: (value: boolean) => void;
  timeExpired: boolean;
  setTimeExpired: (value: boolean) => void;
  showAccessModal: boolean;
  setShowAccessModal: (value: boolean) => void;
  restart: boolean;
  setRestart: (value: boolean) => void;
  gameStarted: boolean;
  setGameStarted: (value: boolean) => void;
  handleUnlockClick: () => void;
  handleRestart: () => void;
  handleStartGame: () => void;
  startTimer: () => void;
  handleClick: (id: number) => void;
  isFlipped: (item: ImageListTypes) => string | boolean;
  onCardClick: (item: ImageListTypes) => void;
};
export type FlipProviderProps = {
  children: ReactNode;
};

export type VirthdayGiftProps = {
  id: number;
  name: string;
  image: string;
  style: string;
};

export type FishJinTypes = {
  id: number;
  word: string;
  clue: string;
  image: string;
};
export type FishProviderProps = {
  children: ReactNode;
};
export type FishContextType = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  correctGuessCount: number;
  correctLetters: string[];
  incorrectGuesses: string[];
  isLoser: boolean;
  isWinner: boolean;
  wordToGuess: string;
  guessedLetters: string[];
  addGuessedLetter: (letter: string) => void;
  handleClick: (key: string) => void;
  pressedLetter: string | null;
  reveal: boolean;
  activeLetters: string[];
  disabled: boolean;
  inactiveLetters: string[];
  handleStartOver: () => void;
  wordData: FishJinTypes;
  setShow: (value: boolean) => void;
  show: boolean;
};

export type OptionTypes = {
  id: number;
  name: string;
  emoji: string;
  beats: number[];
};

export type membersBTSTypes = {
  id: number;
  name: string;
  emoji: string;
};


export type RPSProviderProps = {
  children: ReactNode;
};


export type RPSContextType = {
  userChoice: number | null;
  computerChoice: number | null;
  userMessage: string | null;
  computerMessage: string | null;
  result: number | null;
  disabled: boolean;
  handlePlay: (choice: number) => void;
  reset: () => void;
  options: OptionTypes[];
  turns: number;
  maxTurns: number;
  userWins: number;
  computerWins: number;
  setComputerMessage: (message: string) => void;
  resetAll: () => void;
};
