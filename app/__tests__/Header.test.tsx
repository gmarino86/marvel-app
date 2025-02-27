import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Header from '../components/Header';

const mockStore = configureStore([]);

describe('Header Component', () => {
    let store: any;

    beforeEach(() => {
        store = mockStore({
            favorite: { value: [{ id: 1, name: "Spider-Man" }], showFavorites: false },
        });
        store.dispatch = jest.fn();
    });

    it('should render the header with logo and favorite icon', () => {
        render(
            <Provider store={store}>
                <Header />
            </Provider>
        );

        // Verificar que el logo se renderiza
        const logo = screen.getByAltText('Logo Marvel');
        expect(logo).toBeInTheDocument();

        // Verificar que el icono de favoritos se renderiza
        const favoriteIcon = screen.getByAltText('Favorite');
        expect(favoriteIcon).toBeInTheDocument();

        // Verificar que el número de favoritos es correcto
        const favoriteCount = screen.getByText('1');
        expect(favoriteCount).toBeInTheDocument();
    });

    it('should toggle favorite icon when showFavorites is true', () => {
        store = mockStore({
            favorite: { value: [{ id: 1, name: "Spider-Man" }], showFavorites: true },
        });
    
        render(
            <Provider store={store}>
                <Header />
            </Provider>
        );
    
        // Verificar que el icono cambió a "heart-icon-fill.png"
        const filledHeartIcon = screen.getByAltText('Favorite');
        expect(filledHeartIcon.getAttribute('src')).toContain('/icon/heart-icon-fill.png'); 
    });
    

    it('should dispatch toggleShowFavorites when clicking the favorite icon', () => {
        render(
            <Provider store={store}>
                <Header />
            </Provider>
        );

        const favoriteIcon = screen.getByAltText('Favorite');
        fireEvent.click(favoriteIcon);

        // Verificar que toggleShowFavorites fue despachado
        expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
});
