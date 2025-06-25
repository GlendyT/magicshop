import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Formulario from "@/lovenotes/Formulario";
import useRequestInfo from "@/hooks/useRequestInfo";

jest.mock("@/utils/Fonts", () => ({
    __esModule: true,
    montserrat: { classNamer: "montserrat" }
}))

jest.mock("@/utils/InputNameUtils", () => ({
    __esModule: true,
    default: (props: any) => <input data-testid="input" {...props} />
}))

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
    )
}))

jest.mock("@/utils/ButtonUtils", () => ({
    __esModule: true,
    ButtonUtils: (props: any) => (
        <button
            data-testid="button-utils"
            onClick={props.onClick}
            className={`${props.className} ${props.disableColors}`}
            disabled={props.disabled}
        >{props.label}</button>
    )
}))

const mockHandleSubmit = jest.fn()
jest.mock("@/hooks/useRequestInfo", () => ({
    __esModule: true,
    default: jest.fn()
}))

describe("Formulario", () => {
    beforeEach(() => {
        (useRequestInfo as jest.Mock).mockReturnValue({
            handleSubmit: mockHandleSubmit,
            isMaxCharLimitReachedH: false,
            usuarioGenerado: jest.fn(),
            usuario: {
                name: "Glendy",
                content: "guatemala",
                diseño: "diseño1"
            }
        })
    })
    it("should render the form with correct elements", () => {
        render(<Formulario />)
        expect(screen.getByTestId("form")).toBeInTheDocument()
        expect(screen.getByTestId("input")).toBeInTheDocument()
        expect(screen.getByTestId("input-content")).toBeInTheDocument()
        expect(screen.getByTestId("button-utils")).toBeInTheDocument()
    })

    it("llama a handleSubmit al enviar al formulario", () => {
        render(<Formulario />)
        const form = screen.getByTestId("form")
        fireEvent.submit(form)
        expect(mockHandleSubmit).toHaveBeenCalled()
    })

    it("mantiene habilitado el cambio de contentido si hay nombre", () => {
        (useRequestInfo as jest.Mock).mockReturnValue({
            handleSubmit: mockHandleSubmit,
            isMaxCharLimitReachedH: false,
            usuarioGenerado: jest.fn(),
            usuario: {
                name: "Glendy",
                content: "guatemala",
                diseño: ""
            },
            charCount: 10,
            handleContentH: jest.fn(),
            maxCharLimitH: 20,
        })

        render(<Formulario />)
        const content = screen.getByTestId("input-content")
        expect(content).not.toBeDisabled()
    })

    it("boton esta deshabilitado si no hay diseño", () => {
        (useRequestInfo as jest.Mock).mockReturnValue({
            handleSubmit: mockHandleSubmit,
            isMaxCharLimitReachedH: false,
            usuarioGenerado: jest.fn(),
            usuario: {
                name: "Glendy",
                content: "guatemala",
                diseño: "",
            }
        })

        render(<Formulario />)
        const button = screen.getByTestId("button-utils")
        expect(button).toBeDisabled()
    })
})

