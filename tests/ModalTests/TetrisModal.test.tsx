import { render, screen, fireEvent } from '@testing-library/react';
import ImageModal from '@/app/tetris/ImageModal';
import useDownload from '@/hooks/useDownload';
import useRequestInfo from '@/hooks/useRequestInfo';

jest.mock('@/hooks/useDownload');
jest.mock('@/hooks/useRequestInfo');
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height }: any) => (
    <img src={src} alt={alt} width={width} height={height} />
  ),
}));

const mockUseDownload = useDownload as jest.MockedFunction<typeof useDownload>;
const mockUseRequestInfo = useRequestInfo as jest.MockedFunction<typeof useRequestInfo>;

describe('ImageModal', () => {
  const mockHandleDownloadImage = jest.fn();
  const mockOnClose = jest.fn();
  
  beforeEach(() => {
    mockUseDownload.mockReturnValue({
      handleDownloadImage: mockHandleDownloadImage,
    });
    mockUseRequestInfo.mockReturnValue({
      usuario: { name: 'Test User', content: '', diseño: '' },
    } as any);
    jest.clearAllMocks();
  });

  it('renders nothing when isOpen is false', () => {
    render(
      <ImageModal isOpen={false} imageUrl="/test.jpg" onClose={mockOnClose} />
    );
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('renders modal when isOpen is true', () => {
    render(
      <ImageModal isOpen={true} imageUrl="/test.jpg" onClose={mockOnClose} />
    );
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByAltText('Freebie')).toBeInTheDocument();
  });

  it('displays user name', () => {
    render(
      <ImageModal isOpen={true} imageUrl="/test.jpg" onClose={mockOnClose} />
    );
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('calls handleDownloadImage when Download button is clicked', () => {
    render(
      <ImageModal isOpen={true} imageUrl="/test.jpg" onClose={mockOnClose} />
    );
    fireEvent.click(screen.getByText('Download'));
    expect(mockHandleDownloadImage).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Close button is clicked', () => {
    render(
      <ImageModal isOpen={true} imageUrl="/test.jpg" onClose={mockOnClose} />
    );
    fireEvent.click(screen.getByText('Close'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('sets body overflow to hidden when modal opens', () => {
    render(
      <ImageModal isOpen={true} imageUrl="/test.jpg" onClose={mockOnClose} />
    );
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('resets body overflow when modal closes', () => {
    const { rerender } = render(
      <ImageModal isOpen={true} imageUrl="/test.jpg" onClose={mockOnClose} />
    );
    rerender(
      <ImageModal isOpen={false} imageUrl="/test.jpg" onClose={mockOnClose} />
    );
    expect(document.body.style.overflow).toBe('unset');
  });
});