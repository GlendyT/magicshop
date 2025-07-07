import { render, screen } from "@testing-library/react";
import RPS from "@/rps/page";
import useRequestInfo from "@/hooks/useRequestInfo";


jest.mock("../../src/app/rps/Formulario", () => () => <div data-testid="formulario">Formulario Component</div>);
jest.mock("../../src/app/rps/CardRPS", () => () => <div data-testid="card-rps">CardRPS Component</div>);

jest.mock("@/hooks/useRequestInfo");
describe("RPS Component", () => {
  it("renders Formulario when cargando is true", () => {
    (useRequestInfo as jest.Mock).mockReturnValue({
      cargando: true,
      resultado: false,
    });

    render(<RPS />);
    expect(screen.getByTestId("formulario")).toBeInTheDocument();
  });

  it("renders CardRPS when cargando is false and resultado exists", () => {
    (useRequestInfo as jest.Mock).mockReturnValue({
      cargando: false,
      resultado: { some: "data" },
    });

    render(<RPS />);
    expect(screen.getByTestId("card-rps")).toBeInTheDocument();
  });

  it("renders nothing when cargando is false and resultado is falsy", () => {
    (useRequestInfo as jest.Mock).mockReturnValue({
      cargando: false,
      resultado: null,
    });

    const { container } = render(<RPS />);
    expect(container).not.toHaveTextContent("Formulario Component");
    expect(container).not.toHaveTextContent("CardRPS Component");
  });
});