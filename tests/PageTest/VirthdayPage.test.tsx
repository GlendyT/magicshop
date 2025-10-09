import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Virthday from "@/app/(V)irthday/page";
import { ImageListTypes } from "@/types/index";

// Mock de Resultado y Formulario
jest.mock("../../src/app/(V)irthday/Resultado", () => (props: any) => (
  <div data-testid="resultado">Resultado - {props.item.id2}</div>
));
jest.mock("../../src/app/(V)irthday/Formulario", () => () => (
  <div data-testid="formulario">Formulario Component</div>
));

// Mock de next/font para evitar errores
jest.mock("../../src/utils/Fonts", () => ({
  virthday: { className: "virthday" },
}));

// Mock del hook useFlip
const mockHandleStartGame = jest.fn();
const mockHandleRestart = jest.fn();
const mockItems: ImageListTypes[] = [
  { id2: 1, img: "/img1.jpg", price: "correct", id: 1 },
  { id2: 2, img: "/img2.jpg", price: "wrong", id: 2 },
];

jest.mock("../../src/hooks/useFlip", () => ({
  __esModule: true,
  default: () => ({
    items: mockItems,
    timer: 50,
    timeExpired: false,
    win: false,
    handleStartGame: mockHandleStartGame,
    handleRestart: mockHandleRestart,
  }),
}));

describe("Virthday component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders title and button", () => {
    render(<Virthday />);

    expect(screen.getByText("Memory Game")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /start/i })).toBeInTheDocument();
  });

  test("renders all Resultado items", () => {
    render(<Virthday />);
    const resultados = screen.getAllByTestId("resultado");
    expect(resultados.length).toBe(mockItems.length);
  });

  test("disables button if game hasn't ended and timer !== 50", () => {
    // Cambiar timer a 45 para simular botón deshabilitado
    const useFlip = require("../../src/hooks/useFlip").default;
    jest.spyOn(require("../../src/hooks/useFlip"), "default").mockImplementation(() => ({
      items: mockItems,
      timer: 45,
      timeExpired: false,
      win: false,
      handleStartGame: mockHandleStartGame,
      handleRestart: mockHandleRestart,
    }));

    render(<Virthday />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  test("calls handleStartGame when 'start' button is clicked", () => {
    jest.spyOn(require("../../src/hooks/useFlip"), "default").mockImplementation(() => ({
      items: mockItems,
      timer: 50,
      timeExpired: false, // Ensure button is enabled
      win: false,
      handleStartGame: mockHandleStartGame,
      handleRestart: mockHandleRestart,
    }));

    render(<Virthday />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockHandleStartGame).toHaveBeenCalled();
  });

  test("calls handleRestart when timeExpired is true", () => {
    jest.mocked(require("../../src/hooks/useFlip").default).mockReturnValue({
      items: mockItems,
      timer: 0,
      timeExpired: true,
      win: false,
      handleStartGame: mockHandleStartGame,
      handleRestart: mockHandleRestart,
    });

    render(<Virthday />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockHandleRestart).toHaveBeenCalled();
  });

  test("renders Formulario component when win is true", () => {
    jest.mocked(require("../../src/hooks/useFlip").default).mockReturnValue({
      items: mockItems,
      timer: 10,
      timeExpired: false,
      win: true,
      handleStartGame: mockHandleStartGame,
      handleRestart: mockHandleRestart,
    });

    render(<Virthday />);
    expect(screen.getByTestId("formulario")).toBeInTheDocument();
  });

});
