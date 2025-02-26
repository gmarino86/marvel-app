"use client"
import { useState, useEffect } from 'react';
import { Character } from './interfaces/caracter.interface';
import { fetchCharacters } from './actions/characterActions';
import CharacterCard from './components/CharacterCard';
import SearchBar from './components/SearchBar';
import { useQuery } from '@tanstack/react-query';

export default function Home() {

  const { isLoading, isFetching, data, refetch, error } = useQuery({
    queryKey: ['characters'],
    queryFn: fetchCharacters,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const [characters, setCharacters] = useState<Character[]>([]);
  
  useEffect(() => {
      setCharacters(data?.data.results || []);
  }, [data]);

  return (
    <div className="min-h-screen">
      {
        isLoading && (
          <div className="left-0 absolute bg-red-500 w-full h-[5.38px] animate-loading"></div>
        )
      }

      <main className="p-4">
        <div className="mb-4">
          <SearchBar />
        </div>
        
        <div>
          <p className="mb-4">{characters.length} {characters.length == 1 ? "RESULT" : "RESULTS"}</p>
          <div className="gap-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
            {characters.map((character) => (
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
