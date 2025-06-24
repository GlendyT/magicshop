import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Formulario from "@/hopeisback/Formulario";
import useRequestInfo from "@/hooks/useRequestInfo";

jest.mock("@/utils/Fonts", () => ({
    __esModule: true,
    providence: { className: "providence" },
}));

jest.mock("@/utils/InputNameUtils", () => ({
    __esModule: true,
    default: (props: any) => <input data-testid="input" {...props} />,
}));

jest.mock("@/utils/InputContentUtils", () => ({
    __esModule: true,
    default: (props: any) => (
        <input
            data-testid="input-content"
            value={props.value}
            onChange={props.onChange || (() => { })}
            disabled={props.disabled}
            className={props.className}
        />
    ),
}));

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
}))

const mockHandleSubmit = jest.fn();

jest.mock("@/hooks/useRequestInfo", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("Formulario Hobisback", () => {
    beforeEach(() => {
        (useRequestInfo as jest.Mock).mockReturnValue({
            handleSubmit: mockHandleSubmit,
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

    it("desactive el campo de contenido si no hay nombre", () => {
        (useRequestInfo as jest.Mock).mockReturnValue({
            handleSubmit: mockHandleSubmit,
            usuario: {
                name: "",
                content: "",
                diseño: ""

            }
        })

        render(<Formulario />)
        const input = screen.getByTestId("input-content");
        expect(input).toBeDisabled();
    })
});
