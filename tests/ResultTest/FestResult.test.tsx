import { fireEvent, render } from "@testing-library/react";
import Resultado from "@/festa/Resultado";
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

jest.mock("../../src/app/festa/data/festaBts", () => ({
    festaBts: [
        {
            name: "Square Style",
            styles: [
                {
                    id: 1,
                    name: "Default",
                    image: "/Logos/hopedischarge.webp",
                    color: "text-pink-500",
                },
            ],
        },
        {
            name: "Vertical Style",
            styles: [
                {
                    id: 1,
                    name: "Default",
                    image: "/Logos/hopedischarge.webp",
                    color: "text-pink-500",
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

    it("renders correctly with given user data", () => {
        const { getByText, getByAltText } = render(<Resultado />);
        expect(getByText("Test User")).toBeInTheDocument();
        expect(getByText("from Test Content")).toBeInTheDocument();
        expect(getByAltText("Default")).toBeInTheDocument();
    });

    it("should call handleDownloadImage on download button click", () => {
        const { getByText } = render(<Resultado />);
        const downloadButton = getByText("Download");
        fireEvent.click(downloadButton);
        expect(mockDownload).toHaveBeenCalled();
    });

    it("calls handleResetContent when reset button is clicked", () => {
        const { getByText } = render(<Resultado />);
        const resetButton = getByText("Restart");
        fireEvent.click(resetButton);
        expect(mockReset).toHaveBeenCalled();
    });
});