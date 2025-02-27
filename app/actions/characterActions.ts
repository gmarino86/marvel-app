import { CharacterQuery } from "../interfaces/caracter.interface";
import { ComicsResultDB } from "../interfaces/comics.interface";
import api from "./api";

export const fetchCharacters = async () => {
  try {
    const response = await api.get<CharacterQuery>("/characters",{
        params: {
            limit: 50
        }
    });
    return response.data
  } catch (error) {
    console.error("Error fetching characters:", error);
    return null;
  }
};

export const fetchCharacterByName = async (searchText: string) => {
  try {
    const response = await api.get<CharacterQuery>("/characters",{
        params: {
          nameStartsWith: searchText,
        }
    });
    return response.data
  } catch (error) {
    console.error("Error fetching characters:", error);
    return null;
  }
};

export const fetchCharacterById = async (id: string) => {
  try {
    const response = await api.get<CharacterQuery>(`/characters/${id}`);
    return response.data
  } catch (error) {
    console.error("Error fetching characters:", error);
    return null;
  }
};

export const fetchComicsByCharacterId = async (id: string) => {
  try {
    const response = await api.get<ComicsResultDB>(`/characters/${id}/comics`);
    return response.data
  } catch (error) {
    console.error("Error fetching comics:", error);
    return null;
  }
};
