import { fireEvent, render } from "@testing-library/react";
import Resultado from "@/lovenotes/Resultado";
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

jest.mock("../../src/app/lovenotes/Data/loveNotesImg", () => ({
  loveNotesImg: [
    {
      name: "Default",
      image: "/Logos/hopedischarge.webp",
      style: [
        {
          div1: "div1-class",
            div2: "div2-class",
            div3: "div3-class",
            to: "to-class",
            p: "p-class",
            from: "from-class",
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

  it("renders correctly with given user data", () => {
    const { getByText, getByAltText } = render(<Resultado />);
    expect(getByText(/To:/)).toBeInTheDocument();
    expect(getByText("Test User")).toBeInTheDocument();
    expect(getByText(/Love:/)).toBeInTheDocument();
    expect(getByText("Test Content")).toBeInTheDocument();
    expect(getByAltText("Default")).toBeInTheDocument();
  });

  it("calls handleDownloadImage when Download button is clicked", () => {
    const { getByText } = render(<Resultado />);
    const downloadButton = getByText("Download");
    fireEvent.click(downloadButton);
    expect(mockDownload).toHaveBeenCalledTimes(1);
  });

  it("calls handleResetContent when Restart button is clicked", () => {
    const { getByText } = render(<Resultado />);
    const restartButton = getByText("Restart");
    fireEvent.click(restartButton);
    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});    