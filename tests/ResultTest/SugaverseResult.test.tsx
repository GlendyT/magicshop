import { render, screen, fireEvent } from "@testing-library/react";
import Resultado from "@/sugaverse/Resultado";
import useRequestInfo from "@/hooks/useRequestInfo";
import useDownload from "@/hooks/useDownload";
import { sugaStyles } from "@/sugaverse/Data/sugaStyles";


jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} alt={props.alt} />;
  },
}));

jest.mock("@/hooks/useRequestInfo");
jest.mock("@/hooks/useDownload");

describe("Resultado Component", () => {
  const mockReset = jest.fn();
  const mockDownload = jest.fn();

  const mockUsuario = {
    name: "Glendy",
    content: "¡Bienvenido a casa!",
    diseño: sugaStyles[0].name, 
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

  it("debe renderizar correctamente el contenido y los botones", () => {
    render(<Resultado />);

    expect(screen.getByText(mockUsuario.content)).toBeInTheDocument();
    expect(screen.getByText(mockUsuario.name)).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /Download/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Restart/i })).toBeInTheDocument();
  });

  it("debe llamar a handleDownloadImage al hacer clic en 'Download'", () => {
    render(<Resultado />);
    fireEvent.click(screen.getByRole("button", { name: /Download/i }));
    expect(mockDownload).toHaveBeenCalledTimes(1);
  });

  it("debe llamar a handleResetContent al hacer clic en 'Restart'", () => {
    render(<Resultado />);
    fireEvent.click(screen.getByRole("button", { name: /Restart/i }));
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it("no debe renderizar nada si el diseño no es válido", () => {
    (useRequestInfo as jest.Mock).mockReturnValue({
      usuario: { ...mockUsuario, diseño: "diseño_inexistente" },
      handleResetContent: mockReset,
    });

    render(<Resultado />);
    expect(screen.queryByText(mockUsuario.content)).not.toBeInTheDocument();
    expect(screen.queryByText(mockUsuario.name)).not.toBeInTheDocument();
  });
});
