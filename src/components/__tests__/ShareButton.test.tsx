import { render, screen, fireEvent } from '@testing-library/react';
import { ShareButton } from '../ShareButton';
import { describe, it, expect, vi } from 'vitest';

describe('ShareButton', () => {
    const mockRector = {
        id: 'rector_1',
        nombre: 'Rector Test',
        periodo: '2020-2024'
    };

    it('renders correctly', () => {
        render(<ShareButton rector={mockRector} />);
        const button = screen.getByLabelText('Compartir');
        expect(button).toBeInTheDocument();
    });

    it('shows sharing options when clicked (fallback)', () => {
        // Mock navigator.share to be undefined to force fallback menu
        Object.defineProperty(navigator, 'share', {
            value: undefined,
            configurable: true
        });

        render(<ShareButton rector={mockRector} />);
        const button = screen.getByLabelText('Compartir');
        fireEvent.click(button);

        expect(screen.getByText('Compartir')).toBeInTheDocument();
        expect(screen.getByText('WhatsApp')).toBeInTheDocument();
        expect(screen.getByText('Twitter')).toBeInTheDocument();
    });
});
