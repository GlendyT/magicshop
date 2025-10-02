import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LinkRoutes } from '@/utils/Data/ListRoutes';
import Home from 'app/page';

jest.mock('@/utils/Data/ListRoutes', () => ({
  commonClasses: 'rounded-xl',
  LinkRoutes: [
    { id: 1, name: 'Link 1', path: '/link1', image: '/img1.png' },
    { id: 2, name: 'Link 2', path: '/link2', image: '/img2.png' },
  ],
}));

jest.mock('@/hooks/useRequestInfo', () => ({
  __esModule: true,
  default: () => ({
    loading: false,
    setLoading: jest.fn(),
  }),
}));

describe('Home component', () => {
  it('renders all link images', () => {
    render(<Home />);
    LinkRoutes.forEach((link) => {
      const images = screen.getAllByAltText(link.name);
      expect(images.length).toBeGreaterThan(0);
    });
  });
});
