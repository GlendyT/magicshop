import { render, screen } from "@testing-library/react";
import Seokjin from "@/seokjin/page";

jest.mock("../../src/app/seokjin/Modal", () => () => <div data-testid="modal">Modal Component</div>);
jest.mock("../../src/app/seokjin/Formulario", () => () => <div data-testid="formulario">Formulario Component</div>);
jest.mock("../../src/app/seokjin/Fishing", () => () => <div data-testid="fishing">Fishing Component</div>);
jest.mock("../../src/app/seokjin/Waves", () => () => <div data-testid="waves">Waves Component</div>);

const mockUseFish = jest.fn();
jest.mock("@/hooks/useFish", () => () => mockUseFish());

jest.mock("@/utils/Fonts", () => ({
    pressgame: { className: "mocked-font-class" }
}));

describe("Seokjin Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders the main title", () => {
        mockUseFish.mockReturnValue({
            showModal: false,
            isWinner: false,
            show: false,
        });

        render(<Seokjin />);
        expect(screen.getByText("Let´s fish some music!")).toBeInTheDocument();
    });

    it("renders Fishing when isWinner is false", () => {
        mockUseFish.mockReturnValue({
            showModal: false,
            isWinner: false,
            show: false,
        });

        render(<Seokjin />);
        expect(screen.getByTestId("fishing")).toBeInTheDocument();
    });

    it("renders Modal when isWinner is true and show is true", () => {
        mockUseFish.mockReturnValue({
            showModal: false,
            isWinner: true,
            show: true,
        });

        render(<Seokjin />);
        expect(screen.getByTestId("modal")).toBeInTheDocument();
    });

    it("renders Fishing when isWinner is true but show is false", () => {
        mockUseFish.mockReturnValue({
            showModal: false,
            isWinner: true,
            show: false,
        });

        render(<Seokjin />);
        expect(screen.getByTestId("fishing")).toBeInTheDocument();
    });

    it("renders Formulario when showModal is true", () => {
        mockUseFish.mockReturnValue({
            showModal: true,
            isWinner: false,
            show: false,
        });

        render(<Seokjin />);
        expect(screen.getByTestId("formulario")).toBeInTheDocument();
    });

    it("does not render Formulario when showModal is false", () => {
        mockUseFish.mockReturnValue({
            showModal: false,
            isWinner: false,
            show: false,
        });

        render(<Seokjin />);
        expect(screen.queryByTestId("formulario")).not.toBeInTheDocument();
    });

    it("always renders Waves component", () => {
        mockUseFish.mockReturnValue({
            showModal: false,
            isWinner: false,
            show: false,
        });

        render(<Seokjin />);
        expect(screen.getByTestId("waves")).toBeInTheDocument();
    });

    it("applies correct CSS classes", () => {
        mockUseFish.mockReturnValue({
            showModal: false,
            isWinner: false,
            show: false,
        });

        render(<Seokjin />);
        const container = screen.getByText("Let´s fish some music!").closest("div");
        expect(container).toHaveClass("bg-[#2b74ce]", "flex", "flex-col", "min-h-screen", "justify-center", "mocked-font-class");
    });
});
  