import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

describe('SearchBar Component', () => {
    it('should render the search bar', () => {
        render(<SearchBar onSubmit={() => {}} />);
        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('placeholder', 'SEARCH A CHARACTER...');
    });

    it('should call the onSubmit function when the form is submitted', () => {
        const onSubmit = jest.fn();
        render(<SearchBar onSubmit={onSubmit} />);

        const input = screen.getByRole('textbox');
        const form = screen.getByTestId('search-form'); // 🔹 Buscar el formulario por data-testid

        fireEvent.change(input, { target: { value: 'Spider-Man' } });
        fireEvent.submit(form);

        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith('Spider-Man');
    });

    it('should not call onSubmit if input is empty', () => {
        const onSubmit = jest.fn();
        render(<SearchBar onSubmit={onSubmit} />);

        const form = screen.getByTestId('search-form'); // 🔹 Buscar el formulario por data-testid
        fireEvent.submit(form);

        expect(onSubmit).not.toHaveBeenCalled();
    });
});
