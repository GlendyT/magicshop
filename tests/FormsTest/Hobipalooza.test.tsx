import React from "react";
import { fireEvent, render, screen } from '@testing-library/react';
import Formulario from "@/hobipalooza/Formulario";
import useRequestInfo from "@/hooks/useRequestInfo";

// ✅ Mocks de fuentes
jest.mock("@/utils/Fonts", () => ({
    __esModule: true,
    providence: { className: "providence" },
}));

// ✅ Mock de InputNameUtils (default export)
jest.mock("@/utils/InputNameUtils", () => ({
    __esModule: true,
    default: (props: any) => (
        <input data-testid="input" {...props} />
    )
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
    )
}));


// ✅ Mock de SelectAlbum (default export desde misma carpeta)
jest.mock("../../src/app/hobipalooza/SelectAlbum", () => ({
    __esModule: true,
    default: (props: any) => (
        <select data-testid="select-utilshobi" {...props}>
            <option value="">Option</option>
        </select>
    )
}));

// ✅ Mock del hook useRequestInfo
const mockHandleSubmit = jest.fn();

jest.mock("@/hooks/useRequestInfo", () => ({
    __esModule: true,
    default: jest.fn()
}));

describe("Formulario Hobipalooza", () => {
    beforeEach(() => {
        (useRequestInfo as jest.Mock).mockReturnValue({
            handleSubmit: mockHandleSubmit,
            usuario: {
                name: "Glendy",
                diseño: "Hope World",
                song: "Airplane"
            }
        });
    });

    it("renderiza correctamente todos los elementos", () => {
        render(<Formulario />);
        expect(screen.getByAltText(/hobipalooza/i)).toBeInTheDocument();
        expect(screen.getByTestId("form")).toBeInTheDocument();
        expect(screen.getByTestId("input")).toBeInTheDocument();
        expect(screen.getByTestId("select-utilshobi")).toBeInTheDocument();
        expect(screen.getByTestId("button-utils")).toBeInTheDocument();
    });

    it("llama a handleSubmit al enviar el formulario", () => {
        render(<Formulario />);
        const form = screen.getByTestId("form");
        fireEvent.submit(form);
        expect(mockHandleSubmit).toHaveBeenCalled();
    });

    it("desactiva el botón si no hay canción", () => {
        (useRequestInfo as jest.Mock).mockReturnValueOnce({
            handleSubmit: mockHandleSubmit,
            usuario: {
                name: "Glendy",
                diseño: "Hope World",
                song: "" // Sin canción
            }
        });

        render(<Formulario />);
        const button = screen.getByTestId("button-utils");
        expect(button).toBeDisabled();
    });
});
