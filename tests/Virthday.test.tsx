import React from "react";
import { render, screen } from "@testing-library/react";
import Virthday from "@/app/(V)irthday/page";

// Mocks
jest.mock("../src/app/(V)irthday/Formulario", () => () => <div data-testid="formulario">Formulario</div>);
jest.mock("../src/app/(V)irthday/Resultado", () => ({ item }: any) => <div data-testid="resultado">{item.id2}</div>);
jest.mock("@/utils/Fonts", () => ({
  virthday: { className: "font-virthday" }
}));

// Este será sobrescrito dinámicamente
const mockUseFlip = jest.fn();
jest.mock("@/hooks/useFlip", () => ({
  __esModule: true,
  default: () => mockUseFlip()
}));

describe("Virthday Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the component with initial state", () => {
    mockUseFlip.mockReturnValue({
      items: [{ id2: "a" }, { id2: "b" }],
      timer: 50,
      timeExpired: false,
      handleStartGame: jest.fn(),
      handleRestart: jest.fn(),
      win: false
    });

    render(<Virthday />);
    expect(screen.getByText("Memory Game")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("start");
    expect(screen.getByText("Time")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getAllByTestId("resultado")).toHaveLength(2);
    expect(screen.queryByTestId("formulario")).not.toBeInTheDocument();
    expect(screen.getByTitle("Spotify Playlist")).toBeInTheDocument();
  });

  it("should show 'you lost - re-start' when timeExpired is true", () => {
    mockUseFlip.mockReturnValue({
      items: [],
      timer: 0,
      timeExpired: true,
      handleStartGame: jest.fn(),
      handleRestart: jest.fn(),
      win: false
    });

    render(<Virthday />);
    expect(screen.getByRole("button")).toHaveTextContent("you lost - re-start");
    expect(screen.getByText("Time´s up")).toBeInTheDocument();
  });

  it("should render Formulario when win is true", () => {
    mockUseFlip.mockReturnValue({
      items: [],
      timer: 25,
      timeExpired: false,
      handleStartGame: jest.fn(),
      handleRestart: jest.fn(),
      win: true
    });

    render(<Virthday />);
    expect(screen.getByTestId("formulario")).toBeInTheDocument();
  });

  it("should apply correct timer color class", () => {
    mockUseFlip.mockReturnValue({
      items: [],
      timer: 50,
      timeExpired: false,
      handleStartGame: jest.fn(),
      handleRestart: jest.fn(),
      win: false
    });

    render(<Virthday />);
    const timerBox = screen.getByText("Time").parentElement;
    expect(timerBox).toHaveClass("text-black");

    mockUseFlip.mockReturnValue({
      items: [],
      timer: 31,
      timeExpired: false,
      handleStartGame: jest.fn(),
      handleRestart: jest.fn(),
      win: false
    });

    render(<Virthday />);
    expect(screen.getByText("Time left").parentElement).toHaveClass("text-black");
  });
});
