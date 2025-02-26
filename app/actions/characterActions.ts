import { CharacterLimit50 } from "../interfaces/caracter.interface";
import api from "./api";

export const fetchCharacters = async () => {
  try {
    const response = await api.get<CharacterLimit50>("/characters",{
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
