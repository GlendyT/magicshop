import { render, screen } from "@testing-library/react";
import Lovenotes from "@/lovenotes/page";
import useRequestInfo from "@/hooks/useRequestInfo";


jest.mock("../../src/app/lovenotes/Formulario", () => () => <div>Formulario Component</div>);
jest.mock("../../src/app/lovenotes/Resultado", () => () => <div>Resultado Component</div>);


jest.mock("@/hooks/useRequestInfo");

describe("Lovenotes Component", () => {
  it("renders Formulario when cargando is true", () => {
    (useRequestInfo as jest.Mock).mockReturnValue({
      cargando: true,
      resultado: false,
    });

    render(<Lovenotes />);
    expect(screen.getByText("Formulario Component")).toBeInTheDocument();
  });

  it("renders Resultado when cargando is false and resultado exists", () => {
    (useRequestInfo as jest.Mock).mockReturnValue({
      cargando: false,
      resultado: { some: "data" },
    });

    render(<Lovenotes />);
    expect(screen.getByText("Resultado Component")).toBeInTheDocument();
  });

  it("renders nothing when cargando is false and resultado is falsy", () => {
    (useRequestInfo as jest.Mock).mockReturnValue({
      cargando: false,
      resultado: null,
    });

    const { container } = render(<Lovenotes />);
    expect(container).not.toHaveTextContent("Formulario Component");
    expect(container).not.toHaveTextContent("Resultado Component");
  });
});