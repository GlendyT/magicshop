import React from "react";
import { fireEvent, render, screen } from '@testing-library/react';
import Formulario from "@/hobipalooza/Formulario";
import useRequestInfo from "@/hooks/useRequestInfo";


jest.mock("@/utils/Fonts", () => ({
    __esModule: true,
    providence: { className: "providence" },
}))

jest.mock("@/utils/InputNameUtils", () => ({
    __esModule: true,
    default: (props: any) => (
        <input data-testid="input-namehobi" {...props} />
    )
}))


// jest.mock("@/utils/SelectUtils", () => ({
//     __esModule: true,
//     default: (props: any) => (
//         <select data-testid="select-utilshobi" {...props}>
//             <option value="">Test Option</option>
//         </select>
//     )
// }))

// jest.mock("@/utils/SelectUtils", () => ({
//     __esModule: true,
//     default: (props: any) => (
//         <select data-testid="selectsong-utilshobi" {...props}>
//             <option value="">Test Option</option>
//         </select>
//     )
// }))


// jest.mock("@/utils/ButtonUtils", () => ({
//     __esModule: true,
//     ButtonUtils: (props: any) => (
//         <button data-testid="button-utils" {...props}>
//             {props.label}
//         </button>
//     )
// }))

//TODO: Mock del hook

const mockHandleSubmit = jest.fn()

jest.mock("@/hooks/useRequestInfo", () => ({
    __esModule: true,
    default: jest.fn()
}))

describe("Formulario", () => {
    beforeEach(() => {
        (useRequestInfo as jest.Mock).mockReturnValue({
            handleSubmit: mockHandleSubmit,
            usuario: {
                name: "Test name",
                diseño: "Hope World",
                song: "Airplane"
            }
        })
    })

    it("renderiza correctamente todos los elementos", () => {
        render(<Formulario />)

        expect(screen.getByAltText(/hobipalooza/i)).toBeInTheDocument()
        expect(screen.getByTestId("form")).toBeInTheDocument()
        expect(screen.getByTestId("input-namehobi")).toBeInTheDocument()
        // expect(screen.getByTestId("select-utilshobi")).toBeInTheDocument()
        // expect(screen.getByTestId("selectsong-utilshobi")).toBeInTheDocument()
        // expect(screen.getByTestId("button-utils")).toBeInTheDocument()
    })

    it("llama a handle submit al enviar el formulario", () => {
        render(<Formulario />)
        const form = screen.getByTestId("form")
        fireEvent.submit(form)
        expect(mockHandleSubmit).toHaveBeenCalled()
    })

    // it("desactive el campo de select si no hay nombre", () => {
    //     (useRequestInfo as jest.Mock).mockReturnValue({
    //         handleSubmit: mockHandleSubmit,
    //         usuario: {
    //             name: "",
    //             // diseño: "",
    //             // song: ""
    //         }
    //     })

    //     render(<Formulario />)
    //     const select = screen.getByTestId("select-utilshobi")
    //     expect(select).toBeDisabled()
    // })

    //     it("desactive el campo de select si no diseño", () => {
    //     (useRequestInfo as jest.Mock).mockReturnValue({
    //         handleSubmit: mockHandleSubmit,
    //         usuario: {
    //             name: "Texto",
    //             diseño: "Hope World",
    //             song: ""
    //         }
    //     })

    //     render(<Formulario />)
    //     const select = screen.getByTestId("selectsong-utilshobi")
    //     expect(select).toBeDisabled()
    // })

    // it("desactiva el boton si no hay diseño", () => {
    //     (useRequestInfo as jest.Mock).mockReturnValue({
    //         handleSubmit: mockHandleSubmit,
    //         usuario: {
    //             name: "Texto",
    //             diseño: "Hope World",
    //             song: ""
    //         }
    //     })

    //     render(<Formulario />)
    //     const button = screen.getByTestId("button-utils")
    //     expect(button).toBeDisabled()
    // })

})