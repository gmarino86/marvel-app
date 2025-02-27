import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CharacterCard from "../components/CharacterCard";
import { add, remove } from "@/app/redux/favoriteSlice";
import { Character } from "../interfaces/caracter.interface";
import { URLType, Extension } from "../interfaces/caracter.interface";
import { MockStoreEnhanced } from "redux-mock-store"; 

interface RootState {
    favorite: {
        value: Character[];
    };
}

const mockStore = configureStore<RootState>([]);

describe("CharacterCard Component", () => {
    let store: MockStoreEnhanced; 

    beforeEach(() => {
        store = mockStore({
            favorite: { value: [{
                id: 1, name: "Spider-Man",
                description: "",
                modified: "",
                thumbnail: {
                    path: "https://example.com/spiderman",
                    extension: Extension.Jpg,
                },
                resourceURI: "",
                comics: { available: 0, collectionURI: "", items: [], returned: 0 },
                series: { available: 0, collectionURI: "", items: [], returned: 0 },
                stories: { available: 0, collectionURI: "", items: [], returned: 0 },
                events: { available: 0, collectionURI: "", items: [], returned: 0 },
                urls: []
            }] },
        });
        store.dispatch = jest.fn();
    });

    const character: Character = {
        id: 1,
        name: "Spider-Man",
        description: "Superhéroe con habilidades arácnidas.",
        modified: "2023-01-01T00:00:00Z",
        resourceURI: "http://example.com/spiderman",
        urls: [{ type: URLType.Wiki, url: "http://example.com/spiderman" }],
        thumbnail: {
            path: "https://example.com/spiderman",
            extension: Extension.Jpg,
        },
        comics: { available: 10, collectionURI: "", items: [], returned: 10 },
        stories: { available: 5, collectionURI: "", items: [], returned: 5 },
        events: { available: 2, collectionURI: "", items: [], returned: 2 },
        series: { available: 3, collectionURI: "", items: [], returned: 3 },
    };

    it("should render the character card correctly", () => {
        render(
            <Provider store={store}>
                <CharacterCard
                    id={character.id}
                    name={character.name}
                    image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    item={character}
                />
            </Provider>
        );

        // Verificar que se muestra el nombre
        expect(screen.getByText("Spider-Man")).toBeInTheDocument();

        const characterImage = screen.getByAltText("Spider-Man") as HTMLImageElement; 
        expect(characterImage.src).toContain("https://example.com/spiderman.jpg");

        // Verificar que el ícono de favoritos se muestra
        const favoriteIcon = screen.getByAltText("Heart Icon");
        expect(favoriteIcon).toBeInTheDocument();
    });

    it("should toggle favorite status on click", () => {
        render(
            <Provider store={store}>
                <CharacterCard 
                    id={character.id} 
                    name={character.name} 
                    image={`${character.thumbnail.path}.${character.thumbnail.extension}`} 
                    item={character} 
                />
            </Provider>
        );
        

        const favoriteIcon = screen.getByAltText("Heart Icon");

        // Simular click en el ícono de favoritos
        fireEvent.click(favoriteIcon);

        // Verificar que la acción dispatch fue llamada
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(remove(character));
    });

    it("should add to favorites if not already in the list", () => {
        store = mockStore({ favorite: { value: [] } });
        store.dispatch = jest.fn();

        render(
            <Provider store={store}>
                <CharacterCard 
                    id={character.id} 
                    name={character.name} 
                    image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    item={character} 
                />
            </Provider>
        );
        

        const favoriteIcon = screen.getByAltText("Heart Icon");

        // Simular click en el ícono de favoritos
        fireEvent.click(favoriteIcon);

        // Verificar que la acción dispatch fue llamada con `add`
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(add(character));
    });

    
});
