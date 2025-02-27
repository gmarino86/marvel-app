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


  const filterName = (value: string) => {
    const { data } = useQuery({
      queryKey: ['characters', 'name', value],
      queryFn: () => fetchCharacterByName(value),
      staleTime: 1000 * 60 * 60 * 24,
    });
    setSearched(data?.data.results || []);
    console.log("searched", searched);
  }

  const [characters, setCharacters] = useState<Character[]>([]);
  const [searched, setSearched] = useState<Character[]>([]);

  useEffect(() => {
    if (data) {
      setCharacters(data.data.results);
    }
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
          
          <SearchBar 
            onSubmit={(value) => {
              filterName(value);
            }
          }

          />
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
