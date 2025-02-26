"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query';
import { fetchCharacterById } from '@/app/actions/characterActions'
import { Character } from '@/app/interfaces/caracter.interface';

const CharacterScreen = () => {
  const { id } = useParams()
  let characterId = 0
  const [character, setcharacter] = useState<Character>()

  if (id && typeof id === 'string') {
    characterId = parseInt(id)
  }

  const { isLoading, isFetching, data, refetch, error } = useQuery({
    queryKey: ['characters', characterId],
    queryFn: () => fetchCharacterById(characterId),
    staleTime: 1000 * 60 * 60 * 24,
  });

  useEffect(() => {
    setcharacter(data?.data.results[0])
  }, [data]);

  return (
    <div>
      {isLoading ? (
        <div className="left-0 absolute bg-red-500 w-full h-[5.38px] animate-loading"></div>
      ) : (
        <div className="bg-black">
          <div className="bg-black xl:m-auto xl:max-w-[960px] h-[607.89px] md:h-[278px] xl:h-[320px] text-white" >
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className='col-span-1 h-[397.89px] md:h-[278px] xl:h-[320px]'>
                  <img 
                    src={character?.thumbnail.path + "/portrait_uncanny" + "." + character?.thumbnail.extension} 
                    alt={character?.name}
                    className='w-full h-full object-cover' 
                  />
                </div>

                <div className='col-span-2 p-4 md:p-12'>
                  <div className="w-full h-full">
                    <div className="flex justify-between items-center">
                      <h2 className='font-bold text-4xl uppercase'>{character?.name}</h2>
                      <img src="/icon/heart-icon-empty.png" alt="Favorite" className='w-[24px] h-[21.68px]'/>
                    </div>
                    <p className='py-6 text-base'>{character?.description.length == 0 ? "Sin descripción" : character?.description}</p>
                  </div>
                </div>

              </div>
          </div>
          <div className="relative flex flex-row-reverse">
            <div className="right-0 bottom-0 absolute bg-white w-[20px] h-[20px] rotate-45 translate-x-1/2 translate-y-1/2 transform" />
          </div>

        </div>
      )}
    </div>
  )

}


export default CharacterScreen