import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Polaroid from '@/app/polaroid/page'

jest.mock('next/image', () => (props: Record<string, any>) => <img {...props} />)


const handleDownloadImageMock = jest.fn<void, []>()

jest.mock('@/hooks/useDownload', () => ({
    __esModule: true,
    default: () => ({ handleDownloadImage: handleDownloadImageMock }),
}))


jest.mock('@/app/polaroid/btsPhrase', () => ({
    btsPhrase: [
        {
            image: 'test-image.jpg',
            title: 'Mock Title',
            from: 'Mock From',
        },
    ],
}))


interface ButtonUtilsProps {
    label: string
    onClick: () => void
    className?: string
}

jest.mock('@/utils/ButtonUtils', () => ({

    ButtonUtils: ({ label, onClick, className }: ButtonUtilsProps) => (
        <button onClick={onClick} className={className}>
            {label}
        </button>
    ),
}))

jest.mock('@/utils/Fonts', () => ({
    antonio: { className: 'antonio' },
    jinora: { className: 'jinora' },
    libre: { className: 'libre' },
}))

describe('Polaroid Component', () => {
    beforeAll(() => {
        jest.spyOn(Math, 'random').mockReturnValue(0)
    })

    afterAll(() => {
        jest.restoreAllMocks()
    })

    beforeEach(() => {
        handleDownloadImageMock.mockClear()
    })

    it('renderiza la imagen principal con el src correcto', () => {
        render(<Polaroid />)
        const img = screen.getByAltText('btsphrase')
        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute('src', 'test-image.jpg')
    })

    it('muestra el título y el nombre de quien lo dijo', () => {
        render(<Polaroid />)
        expect(screen.getByText(/Special thanks to/i)).toBeInTheDocument()
        expect(screen.getByText('Mock Title ,')).toBeInTheDocument()
        expect(screen.getByText('- Mock From')).toBeInTheDocument()
    })

    it('al hacer click en Download dispara handleDownloadImage', () => {
        render(<Polaroid />)
        const btn = screen.getByRole('button', { name: /download/i })
        fireEvent.click(btn)
        expect(handleDownloadImageMock).toHaveBeenCalledTimes(1)
    })
})