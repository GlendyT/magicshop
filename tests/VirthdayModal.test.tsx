import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "@/app/(V)irthday/Modal";
import {  virthdayGift } from "@/app/(V)irthday/Data/imagesList";

const mockHandleDownloadImage = jest.fn();
jest.mock("@/hooks/useDownload", () => ({
  __esModule: true,
  default: () => ({
    handleDownloadImage: mockHandleDownloadImage,
  }),
}));

const mockHandleRestart = jest.fn();
jest.mock("@/hooks/useFlip", () => ({
  __esModule: true,
  default: () => ({
    handleRestart: mockHandleRestart,
  }),
}));

jest.mock("@/hooks/useRequestInfo", () => ({
  __esModule: true,
  default: () => ({
    usuario: {
      name: "Glendy",
      diseño: "pastel",
    },
  }),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

describe("Modal Component", () => {
  it("renders the modal with the user's name and selected image", () => {
    render(<Modal />);

    const userName = screen.getByText("Glendy");
    expect(userName).toBeInTheDocument();

    const selectedImage = virthdayGift.find((gift) => gift.name === "pastel");
    if (selectedImage) {
      const image = screen.getByAltText(selectedImage.name);
      expect(image).toHaveAttribute("src", selectedImage.image);
    }
  });
  it("calls handleDownloadImage when Download button is clicked", () => {
    render(<Modal />);

    const downloadBtn = screen.getByRole("button", { name: /download/i });
    fireEvent.click(downloadBtn);

    expect(mockHandleDownloadImage).toHaveBeenCalled();
  });
  });
  it("calls handleRestart when Restart button is clicked", () => {
    render(<Modal />);

    const restartBtn = screen.getByRole("button", { name: /restart/i });
    fireEvent.click(restartBtn);

    expect(mockHandleRestart).toHaveBeenCalled();
  });


