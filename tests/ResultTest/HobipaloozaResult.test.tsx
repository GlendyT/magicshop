import { fireEvent, screen, render } from "@testing-library/react";
import Resultado from "@/hobipalooza/Resultado";
import useRequestInfo from "@/hooks/useRequestInfo";
import useDownload from "@/hooks/useDownload";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} alt={props.alt} />;
  },
}));

jest.mock("@/hooks/useRequestInfo");
jest.mock("@/hooks/useDownload");

jest.mock("../../src/app/hobipalooza/HobiTitleAnimation", () => () => (
  <div data-testid="HobiTitleAnimation">Hobi Animation</div>
));

describe("Resultado Component", () => {
  const mockReset = jest.fn();
  const mockDownload = jest.fn();

  const mockUsuario = {
    name: "Glendy",
    diseño: "A2",
    song: "Hope World",
  };

  beforeEach(() => {
    (useRequestInfo as jest.Mock).mockReturnValue({
      usuario: mockUsuario,
      handleResetContent: mockReset,
    });

    (useDownload as jest.Mock).mockReturnValue({
      handleDownloadImage: mockDownload,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("debe renderizar los textos y datos del usuario", () => {
    render(<Resultado />);

    expect(screen.getByTestId("HobiTitleAnimation")).toBeInTheDocument();

    expect(
      screen.getByText("Don´t forget to scan your QR code for a surprise!")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Here it is your ticket, keep supporting j-hope´s work")
    ).toBeInTheDocument();

    expect(screen.getByText(/Name: Glendy/i)).toBeInTheDocument();
    expect(screen.getByText(/Row: A2/i)).toBeInTheDocument();
    expect(screen.getByText(/Seat: Hope World/i)).toBeInTheDocument();
  });

  it("debe ejecutar handleDownloadImage al hacer clic en Download", () => {
    render(<Resultado />);
    fireEvent.click(screen.getByRole("button", { name: /Download/i }));
    expect(mockDownload).toHaveBeenCalledTimes(1);
  });

  it("debe ejecutar handleResetContent al hacer clic en Restart", () => {
    render(<Resultado />);
    fireEvent.click(screen.getByRole("button", { name: /Restart/i }));
    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});
