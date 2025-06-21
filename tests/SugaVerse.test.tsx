import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Formulario from "@/sugaverse/Formulario";
import useRequestInfo from "@/hooks/useRequestInfo";

// Mock de Fonts
jest.mock("@/utils/Fonts", () => ({
    __esModule: true,
    dmmono: { className: "dmmono" },
    glich: { className: "glich" },
    pixel: { className: "pixel" },
}));

// Mock de componentes personalizados
jest.mock("@/utils/SelectUtils", () => ({
    __esModule: true,
    default: (props: any) => (
        <select data-testid="select" {...props}>
            <option value="">Test Option</option>
        </select>
    ),
}));

jest.mock("@/utils/TextAreaUtils", () => ({
    __esModule: true,
    default: (props: any) => (
        <textarea data-testid="textarea" {...props} />
    ),
}));

jest.mock("@/utils/InputNameUtils", () => ({
    __esModule: true,
    default: (props: any) => (
        <input data-testid="input" {...props} />
    ),
}));

jest.mock("@/utils/ButtonUtils", () => ({
    __esModule: true,
    ButtonUtils: (props: any) => (
        <button data-testid="button" {...props}>
            {props.label}
        </button>
    ),
}));

// Mock del hook
const mockHandleSubmit = jest.fn();

jest.mock("@/hooks/useRequestInfo", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("Formulario", () => {
    beforeEach(() => {
        (useRequestInfo as jest.Mock).mockReturnValue({
            handleSubmit: mockHandleSubmit,
            usuario: {
                content: "Test lyrics",
                diseño: "D-Day",
                name: "Glendy",
            },
        });
    });

    it("renderiza correctamente todos los elementos", () => {
        render(<Formulario />);

        expect(screen.getByText(/into the/i)).toBeInTheDocument();
        expect(screen.getByText(/suga-verse/i)).toBeInTheDocument();
        expect(
            screen.getByText(/create and share your lyrics/i)
        ).toBeInTheDocument();

        expect(screen.getByTestId("form")).toBeInTheDocument();
        expect(screen.getByTestId("textarea")).toBeInTheDocument();
        expect(screen.getByTestId("input")).toBeInTheDocument();
        expect(screen.getByTestId("select")).toBeInTheDocument();
        expect(screen.getByTestId("button")).toBeInTheDocument();
    });

    it("llama a handleSubmit al enviar el formulario", () => {
        render(<Formulario />);
        const form = screen.getByTestId("form");
        fireEvent.submit(form);
        expect(mockHandleSubmit).toHaveBeenCalled();
    });

    it("desactiva el campo de nombre si no hay contenido", () => {
        (useRequestInfo as jest.Mock).mockReturnValueOnce({
            handleSubmit: mockHandleSubmit,
            usuario: {
                content: "",
                diseño: "",
                name: "",
            },
        });

        render(<Formulario />);
        const input = screen.getByTestId("input");
        expect(input).toBeDisabled();
    });

    it("desactiva el select si no hay nombre", () => {
        (useRequestInfo as jest.Mock).mockReturnValueOnce({
            handleSubmit: mockHandleSubmit,
            usuario: {
                content: "Texto",
                diseño: "",
                name: "",
            },
        });

        render(<Formulario />);
        const select = screen.getByTestId("select");
        expect(select).toBeDisabled();
    });

    it("desactiva el botón si no hay diseño", () => {
        (useRequestInfo as jest.Mock).mockReturnValueOnce({
            handleSubmit: mockHandleSubmit,
            usuario: {
                content: "Texto",
                diseño: "",
                name: "Glendy",
            },
        });

        render(<Formulario />);
        const button = screen.getByTestId("button");
        expect(button).toBeDisabled();
    });
});
