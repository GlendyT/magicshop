import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "@/seokjin/Modal";

jest.mock("next/image", () => (props: any) => {
  return <img {...props} alt={props.alt || "mocked image"} />;
});

const mockHandleDownloadImage = jest.fn();
jest.mock("@/hooks/useDownload", () => ({
  __esModule: true,
  default: () => ({
    handleDownloadImage: mockHandleDownloadImage,
  }),
}));

jest.mock("@/hooks/useRequestInfo", () => ({
  __esModule: true,
  default: () => ({
    usuario: {
      name: "Test User",
    },
  }),
}));

const mockHandleCloseandRestart = jest.fn();
jest.mock("@/hooks/useFish", () => ({
  __esModule: true,
  default: () => ({
    isWinner: true,
    isLoser: false,
    handleCloseandRestart: mockHandleCloseandRestart,
  }),
}));

describe("Modal component", () => {
  it("should render modal and show user's name", () => {
    render(<Modal />);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();

    const nameText = screen.getByText("Test User");
    expect(nameText).toBeInTheDocument();
  });
  it("should call handleDownloadImage when download button is clicked", () => {
    render(<Modal />);

    const downloadButton = screen.getByRole("button", { name: /download/i });
    fireEvent.click(downloadButton);

    expect(mockHandleDownloadImage).toHaveBeenCalled();
  });
  });
  it("should call handleCloseandRestart when play again is clicked", () => {
    render(<Modal />);

    const playAgainButton = screen.getByRole("button", { name: /play again/i });
    fireEvent.click(playAgainButton);

    expect(mockHandleCloseandRestart).toHaveBeenCalled();
  });
  it("should not render 'Play again' button if not winner or loser", () => {
    jest.mock("@/hooks/useFish", () => ({
      __esModule: true,
      default: () => ({
        isWinner: false,
        isLoser: false,
        handleCloseandRestart: jest.fn(),
      }),
    }));

    jest.resetModules();
    const ModalWithNoWinOrLose = require("../src/app/seokjin/Modal").default;

    render(<ModalWithNoWinOrLose />);
    const playAgain = screen.queryByRole("button", { name: /play again/i });

    expect(playAgain).not.toBeInTheDocument();
  });

