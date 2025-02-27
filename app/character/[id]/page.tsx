"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchCharacterById } from "@/app/actions/characterActions";
import { Character } from "@/app/interfaces/caracter.interface";
import ComicsCarousel from "../../components/ComicList";
import { useSelector, useDispatch } from "react-redux";
import { add, remove } from "@/app/redux/favoriteSlice";
import Image from "next/image";

const CharacterScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { isLoading, data } = useQuery({
    queryKey: ["characters", id],
    queryFn: () => fetchCharacterById(id as string),
    staleTime: 1000 * 60 * 60 * 24,
  });

  const [character, setCharacter] = useState<Character | null>(null);

  const favorites = useSelector(
    (state: { favorite: { value: Character[] } }) => state.favorite.value
  );

  const isFavorite = favorites.some((fav) => fav.id === Number(id));

  useEffect(() => {
    if (data) {
      setCharacter(data.data.results[0]);
    }
  }, [data]);

  const toggleFavorite = () => {
    if (character) {
      if (isFavorite) {
        dispatch(remove(character));
      } else {
        dispatch(add(character));
      }
    }
  };

  return (
    <div>
      {isLoading && !character ? (
        <div className="left-0 absolute bg-red-500 w-full h-[5.38px] animate-loading"></div>
      ) : (
        <div className="containerCharacter">
          <div className="bg-black">
            <div className="xl:m-auto xl:max-w-[960px] h-[607.89px] md:h-[278px] xl:h-[320px] text-white">
              <div className="grid grid-cols-1 md:grid-cols-3">

                {/* ✅ Reemplazo de <img> por <Image> con "fill" */}
                <div className="relative col-span-1 h-[397.89px] md:h-[278px] xl:h-[320px]">
                  {character?.thumbnail && (
                    <Image
                      src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
                      alt={character.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
                      className="rounded-md object-cover"
                      priority
                    />
                  )}
                </div>

                <div className="col-span-2 p-4 md:p-12">
                  <div className="flex justify-between items-start w-full">
                    <h2 className="font-bold text-4xl uppercase">{character?.name}</h2>
                    <button onClick={toggleFavorite} className="ml-4">
                      <div className="relative w-[24px] h-[24px]">
                        <Image
                          src={isFavorite ? "/icon/heart-icon.png" : "/icon/heart-icon-fill.png"}
                          alt="Favorite"
                          fill
                          sizes="24px" // ✅ Solución para el warning
                          className="object-contain hover:scale-110 transition-transform"
                          priority
                        />
                      </div>
                    </button>



                  </div>
                  <p className="py-6 text-base">
                    {character?.description.length === 0
                      ? "Sin descripción"
                      : character?.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative flex flex-row-reverse">
              <div className="right-0 bottom-0 absolute bg-white w-[20px] h-[20px] rotate-45 translate-x-1/2 translate-y-1/2 transform" />
            </div>
          </div>

          {character && (
            <div className="pt-6 w-full">
              <div className="m-auto p-4 max-w-[960px]">
                <h2 className="pb-4 font-bold text-4xl uppercase">Comics</h2>
                <ComicsCarousel characterId={character.id.toString()} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CharacterScreen;
