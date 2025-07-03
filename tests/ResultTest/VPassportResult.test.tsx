import { fireEvent, screen, render } from "@testing-library/react";
import Resultado from "@/vpassport/Resultado";
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

jest.mock("../../src/app/vpassport/Passport", () => () => (
  <div data-testid="Passport">Passport Component</div>
));

describe("Resultado Component", () => {
  const mockReset = jest.fn();
  const mockDownload = jest.fn();

  const mockImage = "https://example.com/image.jpg";

  beforeEach(() => {
    (useRequestInfo as jest.Mock).mockReturnValue({
      image: mockImage,
      handleResetContent: mockReset,
    });

    (useDownload as jest.Mock).mockReturnValue({
      handleDownloadImage: mockDownload,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the image and Passport component", () => {
    render(<Resultado />);

    expect(screen.getByAltText("vpassport")).toBeInTheDocument();
    expect(screen.getByTestId("Passport")).toBeInTheDocument();
  });

  it("should call handleDownloadImage on download button click", () => {
    render(<Resultado />);

    const downloadButton = screen.getByText("Download");
    fireEvent.click(downloadButton);

    expect(mockDownload).toHaveBeenCalled();
  });

  it("should call handleResetContent on restart button click", () => {
    render(<Resultado />);

    const restartButton = screen.getByText("Restart");
    fireEvent.click(restartButton);

    expect(mockReset).toHaveBeenCalled();
  });
});