import { render, screen } from "@testing-library/react";
import HopeisBack from "@/hopeisback/page";
import useRequestInfo from "@/hooks/useRequestInfo";


jest.mock("../../src/app/hopeisback/Formulario", () => () => <div>Formulario Component</div>);
jest.mock("../../src/app/hopeisback/Resultado", () => () => <div>Resultado Component</div>);
jest.mock("../../src/app/hopeisback/Modal", () => () => <div>Modal Component</div>);


jest.mock("@/hooks/useRequestInfo");

describe("HopeisBack Component", () => {
  it("renders Formulario when cargando is true", () => {
    (useRequestInfo as jest.Mock).mockReturnValue({
      cargando: true,
      resultado: false,
      showModal: false,
      isMobile: false,
    });

    render(<HopeisBack />);
    expect(screen.getByText("Formulario Component")).toBeInTheDocument();
  });

  it("renders Resultado when cargando is false and resultado exists", () => {
    (useRequestInfo as jest.Mock).mockReturnValue({
      cargando: false,
      resultado: { some: "data" },
      showModal: false,
      isMobile: false,
    });

    render(<HopeisBack />);
    expect(screen.getByText("Resultado Component")).toBeInTheDocument();
  });

  it("renders Modal when showModal is true", () => {
    (useRequestInfo as jest.Mock).mockReturnValue({
      cargando: false,
      resultado: { some: "data" },
      showModal: true,
      isMobile: false,
    });

    render(<HopeisBack />);
    expect(screen.getByText("Modal Component")).toBeInTheDocument();
  });

  it("renders nothing when cargando is false and resultado is falsy", () => {
    (useRequestInfo as jest.Mock).mockReturnValue({
      cargando: false,
      resultado: null,
      showModal: false,
      isMobile: false,
    });

    const { container } = render(<HopeisBack />);
    expect(container).not.toHaveTextContent("Formulario Component");
    expect(container).not.toHaveTextContent("Resultado Component");
  });
});