"use client"
import { useState, useEffect } from 'react';
import { Character } from './interfaces/caracter.interface';
import { fetchCharacterByName, fetchCharacters } from './actions/characterActions';
import CharacterCard from './components/CharacterCard';
import SearchBar from './components/SearchBar';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const { isLoading, data } = useQuery({
    queryKey: ['characters'],
    queryFn: fetchCharacters,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const [characters, setCharacters] = useState<Character[]>([]);
  const [searched, setSearched] = useState<Character[] | null>(null);

  useEffect(() => {
    if (data) {
      setCharacters(data.data.results);
    }
  }, [data]);

  const filterName = async (value: string) => {
    if (value.trim() === "") {
      setSearched(null); // Mostrar todos los personajes si el input está vacío
      return;
    }
    
    try {
      const response = await fetchCharacterByName(value);
      setSearched(response?.data.results || []);
    } catch (error) {
      console.error("Error fetching characters:", error);
      setSearched([]);
    }
  };

  return (
    <div className="min-h-screen">
      {isLoading && (
        <div className="left-0 absolute bg-red-500 w-full h-[5.38px] animate-loading"></div>
      )}

      <main className="p-4">
        <div className="mb-4">
          <SearchBar onSubmit={filterName} />
        </div>

        <div>
          <p className="mb-4">{(searched ?? characters).length} {(searched ?? characters).length === 1 ? "RESULT" : "RESULTS"}</p>
          <div className="gap-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
            {(searched ?? characters).map((character) => (
              <CharacterCard
                key={character.id}
                id={character.id}
                name={character.name}
                image={character.thumbnail.path + "/portrait_fantastic" + "." + character.thumbnail.extension}
                item={character}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
