import { render, screen } from "@testing-library/react";
import Sugaverse from "@/sugaverse/page";
import useRequestInfo from "@/hooks/useRequestInfo";

// Mock de los componentes hijos
jest.mock("../../src/app/sugaverse/Formulario", () => () => <div>Formulario Component</div>);
jest.mock("../../src/app/sugaverse/Resultado", () => () => <div>Resultado Component</div>);

// Mock del hook personalizado
jest.mock("@/hooks/useRequestInfo");

describe("Sugaverse Component", () => {
  it("renders Formulario when cargando is true", () => {
    (useRequestInfo as jest.Mock).mockReturnValue({
      cargando: true,
      resultado: false,
    });

    render(<Sugaverse />);
    expect(screen.getByText("Formulario Component")).toBeInTheDocument();
  });

  it("renders Resultado when cargando is false and resultado exists", () => {
    (useRequestInfo as jest.Mock).mockReturnValue({
      cargando: false,
      resultado: { some: "data" },
    });

    render(<Sugaverse />);
    expect(screen.getByText("Resultado Component")).toBeInTheDocument();
  });

  it("renders nothing when cargando is false and resultado is falsy", () => {
    (useRequestInfo as jest.Mock).mockReturnValue({
      cargando: false,
      resultado: null,
    });

    const { container } = render(<Sugaverse />);
    expect(container).not.toHaveTextContent("Formulario Component");
    expect(container).not.toHaveTextContent("Resultado Component");
  });
});
