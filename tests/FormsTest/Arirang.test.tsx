import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import FormularioArirang from "@/app/arirang/formulario";
import useRequestInfo from "@/hooks/useRequestInfo";
import useDarkMode from "@/hooks/useDarkMode";

jest.mock("@/utils/Fonts", () => ({
    __esModule: true,
    providence: { className: "providence" },
}));

jest.mock("@/utils/InputNameUtils", () => ({
    __esModule: true,
    default: (props: any) => <input data-testid="input" {...props} />,
}));

// mock combobox implementation so we can observe render and props
jest.mock("@/hooks/components/ui/combobox", () => ({
    __esModule: true,
    Combobox: ({ children, ...props }: any) => (
        <div data-testid="combobox" {...props}>
            {children}
        </div>
    ),
    ComboboxInput: (props: any) => <input data-testid="combobox-input" {...props} />,
    ComboboxContent: ({ children }: any) => (
        <div data-testid="combobox-content">{children}</div>
    ),
    ComboboxList: ({ children }: any) => (
        <div data-testid="combobox-list">{children}</div>
    ),
    ComboboxItem: ({ children, ...props }: any) => (
        <div data-testid="combobox-item" {...props}>
            {children}
        </div>
    ),
    ComboboxEmpty: () => <div data-testid="combobox-empty">No albums found.</div>,
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

jest.mock("@/hooks/useRequestInfo", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("@/hooks/useDarkMode", () => ({
    __esModule: true,
    default: jest.fn(),
}));


describe("FormularioArirang", () => {
    const mockHandleSubmit = jest.fn();
    const mockSetSelectedAlbum = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useRequestInfo as jest.Mock).mockReturnValue({
            handleSubmit: mockHandleSubmit,
            usuario: { name: "Glendy" },
            albums: [{ id: "1", name: "Album 1" }],
            selectedAlbum: "1",
            setSelectedAlbum: mockSetSelectedAlbum,
        });
        (useDarkMode as jest.Mock).mockReturnValue({ darkSide: false });
    });

    it("should render the form with correct elements", () => {
        render(<FormularioArirang />);
        expect(screen.getByTestId("form")).toBeInTheDocument();
        expect(screen.getByTestId("input")).toBeInTheDocument();
        expect(screen.getByTestId("combobox")).toBeInTheDocument();
        expect(screen.getByTestId("combobox-input")).toBeInTheDocument();
        expect(screen.getByTestId("button-utils")).toBeInTheDocument();
    });

    it("calls handleSubmit on form submission", () => {
        render(<FormularioArirang />);
        fireEvent.submit(screen.getByTestId("form"));
        expect(mockHandleSubmit).toHaveBeenCalled();
    });

    it("disables button when name or album is missing", () => {
        // no name and no selected album
        (useRequestInfo as jest.Mock).mockReturnValue({
            handleSubmit: mockHandleSubmit,
            usuario: { name: "" },
            albums: [],
            selectedAlbum: "",
            setSelectedAlbum: mockSetSelectedAlbum,
        });
        render(<FormularioArirang />);
        const button = screen.getByTestId("button-utils");
        expect(button).toBeDisabled();
    });
});
