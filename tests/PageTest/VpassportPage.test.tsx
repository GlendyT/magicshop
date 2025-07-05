import { render, screen } from "@testing-library/react";
import Vpassport from "@/vpassport/page";
import useRequestInfo from "@/hooks/useRequestInfo";


jest.mock("../../src/app/vpassport/Formulario", () => () => <div>Formulario Component</div>);
jest.mock("../../src/app/vpassport/Resultado", () => () => <div>Resultado Component</div>);

jest.mock("@/hooks/useRequestInfo");

describe("Vpassport Component", () => {
  it("renders Formulario when cargando is true", () => {
    (useRequestInfo as jest.Mock).mockReturnValue({
      cargando: true,
      resultado: false,
      isMobile: false,
    });

    render(<Vpassport />);
    expect(screen.getByText("Formulario Component")).toBeInTheDocument();
  });

  it("renders Resultado when cargando is false and resultado exists", () => {
    (useRequestInfo as jest.Mock).mockReturnValue({
      cargando: false,
      resultado: { some: "data" },
      isMobile: false,
    });

    render(<Vpassport />);
    expect(screen.getByText("Resultado Component")).toBeInTheDocument();
  });

  it("renders nothing when cargando is false and resultado is falsy", () => {
    (useRequestInfo as jest.Mock).mockReturnValue({
      cargando: false,
      resultado: null,
      isMobile: false,
    });

    const { container } = render(<Vpassport />);
    expect(container).not.toHaveTextContent("Formulario Component");
    expect(container).not.toHaveTextContent("Resultado Component");
  });
});