import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import useRequestInfo from "@/hooks/useRequestInfo";
import Formulario from "@/app/tetris/Formulario";

jest.mock("@/utils/InputNameUtils", () => ({
  __esModule: true,
  default: (props: any) => <input data-testid="input" {...props} />,
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

const mockHandleSubmit = jest.fn();

jest.mock("@/hooks/useRequestInfo", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Formulario Tetris", () => {
  beforeEach(() => {
    (useRequestInfo as jest.Mock).mockReturnValue({
      handleSubmit: mockHandleSubmit,
      usuario: {
        name: "Glendy",
      },
    });
  });
  it("should render the form with correct elements", () => {
    render(<Formulario />);
    expect(screen.getByText("Play Time")).toBeInTheDocument();
    expect(screen.getByTestId("form")).toBeInTheDocument();
    expect(screen.getByTestId("input")).toBeInTheDocument();
    expect(screen.getByTestId("button-utils")).toBeInTheDocument();
  });

  it("calls handleSubmit when the form is submitted", () => {
    render(<Formulario />);
    const form = screen.getByTestId("form");
    fireEvent.submit(form);
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it("disables the button when name is empty", () => {
    (useRequestInfo as jest.Mock).mockReturnValue({
      handleSubmit: mockHandleSubmit,
      usuario: {
        name: "",
      },
    });

    render(<Formulario />);
    const button = screen.getByTestId("button-utils");
    expect(button).toBeDisabled();
  });
});
