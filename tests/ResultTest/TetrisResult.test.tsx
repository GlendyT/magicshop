import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Resultado from "@/app/tetris/Resultado";

// Mock dependencies
jest.mock("@/hooks/useTetris");
jest.mock("@/utils/FormatDates", () => ({
  formatDate: jest.fn((date) => `Formatted: ${date}`)
}));
jest.mock("../../src/app/tetris/ButtonControls", () => () => (
  <div data-testid="button-controls">Button Controls</div>
));
jest.mock(
  "../../src/utils/gift2/page.tsx",
  () =>
    ({ level, name, imageUrl, onClick, isLocked, canOpen }: any) =>
      (
        <div
          data-testid={`gift-${name}`}
          onClick={onClick}
          data-locked={isLocked}
          data-can-open={canOpen}
        >
          Gift {name}
        </div>
      )
);
jest.mock(
  "../../src/app/tetris/ImageModal",
  () =>
    ({ isOpen, imageUrl, onClose }: any) =>
      isOpen ? (
        <div data-testid="image-modal" onClick={onClose}>
          Modal {imageUrl}
        </div>
      ) : null
);

const mockUseTetris = require("@/hooks/useTetris")
  .default as jest.MockedFunction<any>;

const mockTetrisData = {
  gameOver: false,
  renderBoard: () => Array(20).fill(Array(10).fill(0)),
  level: 1,
  resetAll: jest.fn(),
  birthdaysLatest: [
    { shortAka: "RM", birthdaycard: "rm-card.jpg", date: "2024-09-12" },
    { shortAka: "Jin", birthdaycard: "jin-card.jpg", date: "2024-12-04" },
  ],
  isGiftLocked: jest.fn(() => false),
  canOpenGift: jest.fn(() => true),
  tableBoard: [
    { title: "Score", value: 1000 },
    { title: "Level", value: 1 },
  ],
};

describe("Resultado Component", () => {
  beforeEach(() => {
    mockUseTetris.mockReturnValue(mockTetrisData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders tetris board correctly", () => {
    render(<Resultado />);
    expect(screen.getByText("BTS-BTS-BTS-BTS-BTS")).toBeInTheDocument();
  });

  it("shows game over message when game is over", () => {
    mockUseTetris.mockReturnValue({ ...mockTetrisData, gameOver: true });
    render(<Resultado />);
    expect(screen.getByText("Game Over!")).toBeInTheDocument();
  });

  it("renders stats table correctly", () => {
    render(<Resultado />);
    expect(screen.getByText("Score")).toBeInTheDocument();
    expect(screen.getByText("1000")).toBeInTheDocument();
    expect(screen.getByText("Level")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("calls resetAll when restart button is clicked", () => {
    render(<Resultado />);
    fireEvent.click(screen.getByText("Restart All"));
    expect(mockTetrisData.resetAll).toHaveBeenCalled();
  });

  it("renders birthday gifts", () => {
    render(<Resultado />);
    expect(screen.getByTestId("gift-RM")).toBeInTheDocument();
    expect(screen.getByTestId("gift-Jin")).toBeInTheDocument();
  });

  it("opens image modal when gift is clicked", () => {
    render(<Resultado />);
    fireEvent.click(screen.getByTestId("gift-RM"));
    expect(screen.getByTestId("image-modal")).toBeInTheDocument();
  });

  it("closes image modal when clicked", () => {
    render(<Resultado />);
    fireEvent.click(screen.getByTestId("gift-RM"));
    fireEvent.click(screen.getByTestId("image-modal"));
    expect(screen.queryByTestId("image-modal")).not.toBeInTheDocument();
  });

  it("renders button controls", () => {
    render(<Resultado />);
    expect(screen.getByTestId("button-controls")).toBeInTheDocument();
  });

  it("displays unlock information text", () => {
    render(<Resultado />);
    expect(
      screen.getByText(/Custom cards unlock at Level 1/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Gifts for future birthdays/)).toBeInTheDocument();
  });
});
