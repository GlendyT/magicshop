import { fireEvent, render, screen  } from "@testing-library/react";
import Resultado from "@/hopeisback/Resultado";
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

jest.mock("../../src/app/hopeisback/Data/hobiPersonalized", () => ({
  hobiPersonalized: [
    {
      name: "Vertical Style",
      styles: [
        {
          name: "Default",
          image: "/Logos/hopedischarge.webp",
          color: "text-white",
        },
      ],
    },
    {
      name: "Square Style",
      styles: [
        {
          name: "Default",
          image: "/Logos/hopedischarge.webp",
          color: "text-white",
        },
      ],
    },
  ],
}));

describe("Resultado Component", () => {
  const mockReset = jest.fn();
  const mockDownload = jest.fn();

  beforeEach(() => {
    (useRequestInfo as jest.Mock).mockReturnValue({
      isMobile: false,
      usuario: { name: "Test User", content: "Test Content", diseño: "Default" },
      handleResetContent: mockReset,
    });

    (useDownload as jest.Mock).mockReturnValue({
      handleDownloadImage: mockDownload,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the image and user information", () => {
    const { getByAltText, getByText } = render(<Resultado />);

    expect(getByAltText("Default")).toBeInTheDocument();
    expect(getByText("Test User")).toBeInTheDocument();
    expect(getByText("from Test Content")).toBeInTheDocument();
  });

  it("should call handleDownloadImage on download button click", () => {
    const { getByText } = render(<Resultado />);

    const downloadButton = getByText("Download");
    fireEvent.click(downloadButton);

    expect(mockDownload).toHaveBeenCalled();
  });

  it("should call handleResetContent on restart button click", () => {
    const { getByText } = render(<Resultado />);

    const restartButton = getByText("restart");
    fireEvent.click(restartButton);

    expect(mockReset).toHaveBeenCalled();
  });
});