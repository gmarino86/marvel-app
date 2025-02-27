import { useState, useEffect } from "react";
import Image from "next/image";
import { Comic } from "../interfaces/comics.interface";
import { fetchComicsByCharacterId } from "../actions/characterActions";
import { useQuery } from "@tanstack/react-query";

interface Props {
    characterId: string;
}

const ComicsCarousel = ({ characterId }: Props) => {
    const [comics, setComics] = useState<Comic[]>([]);

    const { data } = useQuery({
        queryKey: ["comics", characterId],
        queryFn: () => fetchComicsByCharacterId(characterId),
        staleTime: 1000 * 60 * 60 * 24,
    });

    useEffect(() => {
        if (data) {
            setComics(data?.data.results);
        }
    }, [data, comics]);

    return data == undefined ? (
        <div data-testid="loading" className="left-0 absolute bg-red-500 w-full h-[5.38px] animate-loading"></div>
    ) : (
        <div className="mx-auto px-4 max-w-[960px] max-h-[526.8px]">
            <div className="flex gap-4 pb-4 h-[340.8px] overflow-x-auto scrollbar-hide">
                {comics.map((comic) => (
                    <div key={comic.id} className="flex-shrink-0 w-[180px] h-[270px]">
                        {comic.thumbnail ? (
                            <div className="relative w-[180px] h-[270px]">
                                <Image
                                    src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
                                    alt={comic.title}
                                    width={180} // ✅ Tamaño fijo
                                    height={270} // ✅ Tamaño fijo
                                    sizes="(max-width: 768px) 100vw, 180px" // ✅ Optimización correcta
                                    className="rounded-md object-cover"
                                    priority
                                />

                            </div>
                        ) : (
                            <div className="flex justify-center items-center bg-gray-300 w-[180px] h-[270px]">
                                <p className="text-gray-600 text-sm">Imagen no disponible</p>
                            </div>
                        )}
                        <h3 className="mt-2 w-full font-semibold text-sm truncate">{comic.title}</h3>
                        <p className="text-gray-500 text-xs">
                            {comic.modified ? new Date(comic.modified).getFullYear() : "Fecha desconocida"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ComicsCarousel;
