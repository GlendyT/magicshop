import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ButtonUtils } from "@/utils/ButtonUtils";

describe("Button Utils", () => {
  it("renders the label", () => {
    render(<ButtonUtils label="Click me" onClick={() => {}} />);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<ButtonUtils label="Test" onClick={handleClick} />);
    fireEvent.click(screen.getByText("Test"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders an icon when provided", () => {
    render(
      <ButtonUtils
        label="With icon"
        onClick={() => {}}
        icon={<svg data-testid="icon" />}
      />
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is true", () => {
    render(<ButtonUtils label="Disabled" onClick={() => {}} disabled />);
    expect(screen.getByText("Disabled").closest("button")).toBeDisabled();
  });

  it("applies className and disabledColors props", () => {
    render(
      <ButtonUtils
        label="Classes"
        onClick={() => {}}
        className="test-class"
        disableColors="disable-color"
      />
    );
    const button = screen.getByText("Classes").closest("button");
    expect(button).toHaveClass("test-class");
    expect(button).toHaveClass("disable-color");
  });
});
