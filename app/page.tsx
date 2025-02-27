"use client"
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
  
  const favorites = useSelector((state: { favorite: { value: Character[], showFavorites: boolean } }) => state.favorite.value);
  const showFavorites = useSelector((state: { favorite: { value: Character[], showFavorites: boolean } }) => state.favorite.showFavorites);

  useEffect(() => {
    if (data) {
      setCharacters(data.data.results);
    }
  }, [data]);

  const filterName = async (value: string) => {
    if (value.trim() === "") {
      setSearched(null);
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

  const displayedCharacters = showFavorites ? favorites : (searched ?? characters);

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
          <p className="mb-4">
            {displayedCharacters.length} {displayedCharacters.length === 1 ? "RESULT" : "RESULTS"}
          </p>

          <div className="gap-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
            {displayedCharacters.map((character) => (
              <CharacterCard
              key={character.id}
              id={character.id}
              name={character.name}
              image={`${character.thumbnail.path}/portrait_fantastic.${character.thumbnail.extension}`} 
              item={character}
            />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
