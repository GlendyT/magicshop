import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LinkRoutes } from "@/utils/Data/ListRoutes";
import Home from "app/page";

jest.mock("@/utils/Data/ListRoutes", () => ({
  __esModule: true,
  LinkRoutes: [
    { id: 1, name: "Link 1", path: "/link1", image: "/img1.png" },
    { id: 2, name: "Link 2", path: "/link2", image: "/img2.png" },
  ],
}));

jest.mock("@/hooks/useRequestInfo", () => ({
  __esModule: true,
  default: () => ({
    loading: false,
    setLoading: jest.fn(),
  }),
}));

jest.mock('embla-carousel-autoplay', () => ({
    __esModule: true,
    default: jest.fn(() => ({
      init: jest.fn(),
      destroy: jest.fn(),
      stop: jest.fn(),
      reset: jest.fn(),
    })),
}));

jest.mock('@/hooks/components/ui/carousel', () => ({
  __esModule: true,
  Carousel: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel">{children}</div>,
  CarouselContent: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-content">{children}</div>,
  CarouselItem: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-item">{children}</div>,
  CarouselNext: () => <button>Next</button>,
  CarouselPrevious: () => <button>Previous</button>,
}));


describe("Home component", () => {
  it("renders all link images", () => {
    render(<Home />);
    LinkRoutes.forEach((link) => {
      const images = screen.getAllByAltText(link.name);
      expect(images).toHaveLength(2);
    });
  });
});