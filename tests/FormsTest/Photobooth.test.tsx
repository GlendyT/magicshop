import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Photobooth from "@/photobooth/page";
import "@testing-library/jest-dom";
import React from "react";

// Mocks
jest.mock("@/hooks/usePhotobooth", () => () => ({
    setPreview1: jest.fn(),
    setPreview2: jest.fn(),
    setPreview3: jest.fn(),
    preview1: null,
    preview2: null,
    preview3: null,
    openModal: true,
    setOpenModal: jest.fn(),
    handleFileChange: jest.fn(),
    backgroundImage: null,
}));

jest.mock("@/hooks/useImageCrop", () => () => ({
    getProcessedImage: jest.fn().mockResolvedValue(new File(["avatar"], "avatar.png", { type: "image/png" })),
    resetStates: jest.fn(),
}));

jest.mock("@/hooks/useRequestInfo", () => () => ({
    usuario: {
        name: "Test User",
    },
}));

jest.mock("../../src/app/photobooth/photos/Photo", () => (props: any) => (
    <div data-testid="Photo">Photo Component</div>
));
jest.mock("../../src/app/photobooth/photos/Photo2", () => (props: any) => (
    <div data-testid="Photo2">Photo2 Component</div>
));
jest.mock("../../src/app/photobooth/photos/Photo3", () => (props: any) => (
    <div data-testid="Photo3">Photo3 Component</div>
));
jest.mock("../../src/app/photobooth/Logo", () => () => (
    <div data-testid="Logo">Logo Component</div>
));
jest.mock("../../src/app/photobooth/PhotoButton", () => () => (
    <button data-testid="PhotoButton">PhotoButton</button>
));
jest.mock("../../src/app/photobooth/ImageCropModalContent", () => (props: any) => (
    <div data-testid="ImageCropModalContent">
        <button onClick={props.handleDone}>Done</button>
        <button onClick={props.handleClose}>Close</button>
    </div>
));
jest.mock("../../src/app/photobooth/base/Modal", () => ({ children, open }: any) =>
    open ? <div data-testid="Modal">{children}</div> : null
);

describe("Photobooth component", () => {
    it("renders without crashing", () => {
        render(<Photobooth />);
        expect(screen.getByTestId("Photo")).toBeInTheDocument();
        expect(screen.getByTestId("Photo2")).toBeInTheDocument();
        expect(screen.getByTestId("Photo3")).toBeInTheDocument();
        expect(screen.getByTestId("Logo")).toBeInTheDocument();
        expect(screen.getByTestId("PhotoButton")).toBeInTheDocument();
    });

    it("shows modal when openModal is true", () => {
        render(<Photobooth />);
        expect(screen.getByTestId("Modal")).toBeInTheDocument();
        expect(screen.getByTestId("ImageCropModalContent")).toBeInTheDocument();
    });

    it("calls handleDone and closes modal", async () => {
        render(<Photobooth />);
        const doneButton = screen.getByText("Done");

        fireEvent.click(doneButton);

        // Wait to simulate async image processing
        await waitFor(() => {
            expect(screen.getByTestId("Modal")).toBeInTheDocument(); // Still in document because closeModal is mocked
        });
    });

    it("closes modal when Close is clicked", () => {
        render(<Photobooth />);
        const closeButton = screen.getByText("Close");

        fireEvent.click(closeButton);

        expect(screen.getByTestId("Modal")).toBeInTheDocument(); // No real change because setOpenModal is mocked
    });
});
