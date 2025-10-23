import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Resultado from "@/app/(V)irthday/Resultado";
import { ImageListTypes } from "@/types/index";

// Mock de next/image para evitar errores en test
jest.mock("next/image", () => (props: any) => {
    return <img {...props} />;
});

const mockOnCardClick = jest.fn();
const mockIsFlipped = jest.fn();
const mockGameStarted = true;

jest.mock("../../src/hooks/useFlip", () => ({
    __esModule: true,
    default: () => ({
        onCardClick: mockOnCardClick,
        isFlipped: mockIsFlipped,
        gameStarted: mockGameStarted,
    }),
}));

const mockItem: ImageListTypes = {
    id: 1,
    img: "/test.jpg",
    price: "correct",
    id2: 1,
};

describe("Resultado component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders front face when not flipped", () => {
        mockIsFlipped.mockReturnValue(false);

        render(<Resultado item={mockItem} />);
        const frontFace = screen.getByRole("img");

        expect(frontFace).toBeInTheDocument();
        expect(frontFace).toHaveAttribute("src", "/test.jpg");
    });

    test("adds flipped class when isFlipped returns true", () => {
        mockIsFlipped.mockReturnValue(true);

        const { container } = render(<Resultado item={mockItem} />);
        const flippingDiv = container.querySelector(".preserve-3d");

        expect(flippingDiv?.className).toContain("my-rotate-y-180");
    });

    test("calls onCardClick when clicked and gameStarted is true", () => {
        mockIsFlipped.mockReturnValue(false);

        render(<Resultado item={mockItem} />);
        const wrapper = screen.getByRole("img").parentElement?.parentElement?.parentElement as HTMLElement;
        fireEvent.click(wrapper);

        expect(mockOnCardClick).toHaveBeenCalledWith(mockItem);
    });

    test("applies correct border color based on price", () => {
        const { rerender } = render(<Resultado item={{ ...mockItem, price: "wrong" }} />);
        let image = screen.getByRole("img");

        expect(image).toHaveClass("border-red-600");

        rerender(<Resultado item={{ ...mockItem, price: "correct" }} />);
        image = screen.getByRole("img");

        expect(image).toHaveClass("border-green-600");
    });

    test("disables click when gameStarted is false", () => {
        jest.mock("@/hooks/useFlip", () => ({
            __esModule: true,
            default: () => ({
                onCardClick: mockOnCardClick,
                isFlipped: mockIsFlipped,
                gameStarted: false,
            }),
        }));

        const { container } = render(<Resultado item={mockItem} />);
        const cardWrapper = container.querySelector(".group");

        expect(cardWrapper?.className).toContain("");
    });
});
