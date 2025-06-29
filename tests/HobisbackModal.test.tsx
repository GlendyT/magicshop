import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "@/hopeisback/Modal"; 

const mockGenerateWordDisplay = jest.fn(() => "-hope");
const mockHandleCorrectWord = jest.fn();
const mockSetInput = jest.fn();
const mockSetShowErrorMessage = jest.fn();
const mockSetShowModal = jest.fn();
const mockSetHasSubmitted = jest.fn();

jest.mock("@/hooks/useRequestInfo", () => ({
  __esModule: true,
  default: () => ({
    generateWordDisplay: mockGenerateWordDisplay,
    handleCorrectWord: mockHandleCorrectWord,
    input: "",
    setInput: mockSetInput,
    isCorrectGuess: false,
    showErrorMessage: false,
    currWord: "hope",
    setShowErrorMessage: mockSetShowErrorMessage,
    setShowModal: mockSetShowModal,
    setHasSubmitted: mockSetHasSubmitted,
  }),
}));

describe("Access Word Modal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders modal and displays the correct word part", () => {
    render(<Modal />);
    expect(screen.getByText("Access Word")).toBeInTheDocument();
    expect(screen.getByText(/I´m your hope, you are my hope, I´m j-/i)).toBeInTheDocument();
    expect(mockGenerateWordDisplay).toHaveBeenCalledWith("hope");
  });

  it("renders the input field and allows typing", () => {
    render(<Modal />);
    const input = screen.getByPlaceholderText("Write the correct word");
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "hope" } });
    expect(mockSetInput).toHaveBeenCalledWith("hope");
  });

  it("shows the default submit button label when no error", () => {
    render(<Modal />);
    expect(screen.getByRole("button", { name: /submit guess/i })).toBeInTheDocument();
  });

  it("shows error label when guess is wrong", () => {
    jest.mock("@/hooks/useRequestInfo", () => ({
      __esModule: true,
      default: () => ({
        generateWordDisplay: mockGenerateWordDisplay,
        handleCorrectWord: mockHandleCorrectWord,
        input: "",
        setInput: mockSetInput,
        isCorrectGuess: false,
        showErrorMessage: true,
        currWord: "hope",
        setShowErrorMessage: mockSetShowErrorMessage,
        setShowModal: mockSetShowModal,
        setHasSubmitted: mockSetHasSubmitted,
      }),
    }));

    jest.resetModules();
    const ModalWithError = require("../src/app/hopeisback/Modal").default;
    render(<ModalWithError />);
    expect(screen.getByRole("button", { name: /wrong, try again/i })).toBeInTheDocument();
  });

  it("shows success label and handles correct word click", () => {
    jest.mock("@/hooks/useRequestInfo", () => ({
      __esModule: true,
      default: () => ({
        generateWordDisplay: mockGenerateWordDisplay,
        handleCorrectWord: mockHandleCorrectWord,
        input: "hope",
        setInput: mockSetInput,
        isCorrectGuess: true,
        showErrorMessage: false,
        currWord: "hope",
        setShowErrorMessage: mockSetShowErrorMessage,
        setShowModal: mockSetShowModal,
        setHasSubmitted: mockSetHasSubmitted,
      }),
    }));

    jest.resetModules();
    const ModalWithSuccess = require("../src/app/hopeisback/Modal").default;
    render(<ModalWithSuccess />);

    const successButton = screen.getByRole("button", { name: /access granted!/i });
    expect(successButton).toBeInTheDocument();

    fireEvent.click(successButton);
    expect(mockSetShowModal).toHaveBeenCalledWith(false);
    expect(mockSetHasSubmitted).toHaveBeenCalledWith(true);
    expect(mockSetShowErrorMessage).toHaveBeenCalledWith(false);
  });
});
