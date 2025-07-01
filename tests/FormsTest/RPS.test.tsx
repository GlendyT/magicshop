import React from "react";
import { fireEvent, render, screen } from "@testing-library/react"
import Formulario from "@/rps/Formulario";
import useRequestInfo from "@/hooks/useRequestInfo";

jest.mock("@/utils/Fonts", () => ({
    __esModule: true,
    rock: { className: "rock" },
}))


jest.mock("@/utils/InputNameUtils", () => ({
    __esModule: true,
    default: (props: any) => <input data-testid="input" {...props} />
}))

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
                diseño: "diseño1",
            },
        });
    });

    it("should render the form with correct elements", () => {
        render(<Formulario />);
        expect(screen.getByTestId("form")).toBeInTheDocument();
        expect(screen.getByTestId("input")).toBeInTheDocument();
        expect(screen.getByTestId("radio-options")).toBeInTheDocument();
        expect(screen.getByTestId("button-utils")).toBeInTheDocument();
    });

    it("llama a handleSubmit al enviar el formulario", () => {
        render(<Formulario />);
        const form = screen.getByTestId("form");
        fireEvent.submit(form);
        expect(mockHandleSubmit).toHaveBeenCalled();
    });

    it("botón está deshabilitado si no hay diseño", () => {
        (useRequestInfo as jest.Mock).mockReturnValue({
            handleSubmit: mockHandleSubmit,
            isMobile: false,
            isMaxCharLimitReachedH: false,
            usuarioGenerado: jest.fn(),
            usuario: {
                name: "Glendy",
                diseño: "",
            },
        });

        render(<Formulario />);
        const button = screen.getByTestId("button-utils");
        expect(button).toBeDisabled();
    });
})