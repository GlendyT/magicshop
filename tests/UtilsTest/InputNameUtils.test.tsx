import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import InputNameUtils from "@/utils/InputNameUtils";
import useRequestInfo from "@/hooks/useRequestInfo";

jest.mock("@/hooks/useRequestInfo");

const mockHandleNameH = jest.fn();
const mockUseRequestInfo = useRequestInfo as jest.Mock;

const defaultMockReturn = {
  isMaxFromLimitReachedH: false,
  charCountFrom: 5,
  usuario: { name: "Hoseok" },
  handleNameH: mockHandleNameH,
  maxFromLimitH: 16,
};

describe("InputNmaeUtils", () => {
  beforeEach(() => {
    mockHandleNameH.mockClear();
    mockUseRequestInfo.mockReturnValue(defaultMockReturn);
  });

  it("renders label and input correctly", () => {
    render(
      <InputNameUtils
        placeholder="Enter text"
        className="test-input"
        from="You"
      />
    );
    expect(screen.getByText("You")).toBeInTheDocument();
    const input = screen.getByPlaceholderText("Enter text") as HTMLInputElement;
    expect(input).toHaveValue("Hoseok");
    expect(input).toHaveClass("test-input");
    expect(input).toBeEnabled();
  });
});
