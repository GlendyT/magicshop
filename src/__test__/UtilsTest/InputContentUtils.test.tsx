import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import InputContentUtils from "@/utils/InputContentUtils";
import useRequestInfo from "@/hooks/useRequestInfo";

jest.mock("@/hooks/useRequestInfo");

const mockHandleContentH = jest.fn();
const mockUseRequestInfo = useRequestInfo as jest.Mock;

const defaultMockReturn = {
  isMaxCharLimitReachedH: false,
  charCount: 5,
  usuario: { content: "hello", name: "Test User" },
  handleContentH: mockHandleContentH,
  maxCharLimitH: 20,
};

describe("InputContentUtils", () => {
  beforeEach(() => {
    mockHandleContentH.mockClear();
    mockUseRequestInfo.mockReturnValue(defaultMockReturn);
  });

  it("renders label and input correctly", () => {
    render(
      <InputContentUtils
        placeholder="Enter text"
        className="test-input"
        from="You"
      />
    );
    expect(screen.getByText("You")).toBeInTheDocument();
    const input = screen.getByPlaceholderText("Enter text") as HTMLInputElement;
    expect(input).toHaveValue("hello");
    expect(input).toHaveClass("test-input");
    expect(input).not.toBeDisabled();
  });

  it("calls handleContentH on input change", () => {
    render(<InputContentUtils placeholder="ph" className="" from="label" />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "new value" } });
    expect(mockHandleContentH).toHaveBeenCalled();
  });

  it("shows character count", () => {
    render(<InputContentUtils placeholder="ph" className="" from="label" />);
    expect(screen.getByText(/5\/20/)).toBeInTheDocument();
  });

  it("shows 'Too long!' and styles in red when char limit is reached", () => {
    mockUseRequestInfo.mockReturnValue({
      ...defaultMockReturn,
      isMaxCharLimitReachedH: true,
      charCount: 21,
    });
    render(<InputContentUtils placeholder="ph" className="" from="label" />);
    expect(screen.getByText("Too long!")).toBeInTheDocument();
    expect(screen.getByText(/21\/20/)).toHaveClass("text-red-500");
  });

  it("disables input if usuario.name is falsy", () => {
    mockUseRequestInfo.mockReturnValue({
      ...defaultMockReturn,
      usuario: { content: "hey", name: "" },
    });
    render(<InputContentUtils placeholder="ph" className="" from="label" />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });
});
