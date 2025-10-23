import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Formulario from "@/hopeisback/Formulario";
import useRequestInfo from "@/hooks/useRequestInfo";

// Mocks de fuentes
jest.mock("@/utils/Fonts", () => ({
    __esModule: true,
    providence: { className: "providence" },
}));

// Mock del input de nombre
jest.mock("@/utils/InputNameUtils", () => ({
    __esModule: true,
    default: (props: any) => <input data-testid="input" {...props} />,
}));

// Mock del input de contenido
jest.mock("@/utils/InputContentUtils", () => ({
    __esModule: true,
    default: (props: any) => (
        <input
            data-testid="input-content"
            value={props.value || ""}
            onChange={props.onChange || (() => { })}
            disabled={props.disabled}
            className={props.className}
        />
    ),
}));

// Mock del botón
jest.mock("@/utils/ButtonUtils", () => ({
    __esModule: true,
    ButtonUtils: (props: any) => (
        <button
            data-testid="button-utils"
            onClick={props.onClick}
            className={`${props.className} ${props.disableColors}`}
            disabled={props.disabled}
        >
            {props.label}
        </button>
    ),
}));

// Mock de radio options
jest.mock("@/utils/RadioOptionsUtils", () => ({
    __esModule: true,
    default: (props: any) => (
        <div data-testid="radio-options">
            {props.options.map((option: any) => (
                <label key={option.id}>
                    <input
                        type="radio"
                        name={props.name}
                        value={option.name}
                        checked={props.checked === option.name}
                        onChange={props.onChange || (() => { })}
                        disabled={props.disabled || option.disabled}
                    />
                    {option.name}
                </label>
            ))}
        </div>
    ),
}));

// Mock de hook
const mockHandleSubmit = jest.fn();
jest.mock("@/hooks/useRequestInfo", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("Formulario", () => {
    beforeEach(() => {
        (useRequestInfo as jest.Mock).mockReturnValue({
            handleSubmit: mockHandleSubmit,
            isMobile: false,
            isMaxCharLimitReachedH: false,
            usuarioGenerado: jest.fn(),
            usuario: {
                name: "Glendy",
                content: "guatemala",
                diseño: "diseño1",
            },
        });
    });

    it("should render the form with correct elements", () => {
        render(<Formulario />);
        expect(screen.getByTestId("form")).toBeInTheDocument();
        expect(screen.getByTestId("input")).toBeInTheDocument();
        expect(screen.getByTestId("input-content")).toBeInTheDocument();
        expect(screen.getByTestId("radio-options")).toBeInTheDocument();
        expect(screen.getByTestId("button-utils")).toBeInTheDocument();
    });

    it("llama a handleSubmit al enviar el formulario", () => {
        render(<Formulario />);
        const form = screen.getByTestId("form");
        fireEvent.submit(form);
        expect(mockHandleSubmit).toHaveBeenCalled();
    });

    it("mantiene habilitado el campo de contenido si hay nombre", () => {
        (useRequestInfo as jest.Mock).mockReturnValue({
            handleSubmit: mockHandleSubmit,
            isMobile: false,
            isMaxCharLimitReachedH: false,
            usuarioGenerado: jest.fn(),
            usuario: {
                name: "Glendy", // ✅
                content: "guatemala",
                diseño: "",
            },
            charCount: 10,
            handleContentH: jest.fn(),
            maxCharLimitH: 20,
        });

        render(<Formulario />);
        const content = screen.getByTestId("input-content");
        expect(content).toBeEnabled();
    });


    it("muestra mensaje especial cuando hay diseño seleccionado", () => {
        render(<Formulario />);
        expect(screen.getByText(/Let's welcome Hobi/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Welcome home, Jung Hoseok!/i)
        ).toBeInTheDocument();
    });

    it("no muestra mensaje especial si no hay diseño", () => {
        (useRequestInfo as jest.Mock).mockReturnValue({
            handleSubmit: mockHandleSubmit,
            isMobile: false,
            isMaxCharLimitReachedH: false,
            usuarioGenerado: jest.fn(),
            usuario: {
                name: "Glendy",
                content: "guatemala",
                diseño: "",
            },
        });

        render(<Formulario />);
        expect(
            screen.queryByText(/Let's welcome Hobi/i)
        ).not.toBeInTheDocument();
    });

    it("botón está deshabilitado si no hay diseño", () => {
        (useRequestInfo as jest.Mock).mockReturnValue({
            handleSubmit: mockHandleSubmit,
            isMobile: false,
            isMaxCharLimitReachedH: false,
            usuarioGenerado: jest.fn(),
            usuario: {
                name: "Glendy",
                content: "guatemala",
                diseño: "",
            },
        });

        render(<Formulario />);
        const button = screen.getByTestId("button-utils");
        expect(button).toBeDisabled();
    });
});
