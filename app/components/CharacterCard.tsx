import { useState } from "react";
import Link from "next/link";

import { useSelector, useDispatch } from 'react-redux'
import { add, remove } from '@/app/redux/favoriteSlice' 
import { Character } from "../interfaces/caracter.interface";

interface CharacterCardProps {
  id: number;
  name: string;
  image: string;
  item: Character;
}

export default function CharacterCard({ id, name, image, item }: CharacterCardProps) {

  const favorite = useSelector((state: { favorite: { value: Character[] } }) => state.favorite.value)
  const dispatch = useDispatch()

  const [isHovered, setIsHovered] = useState(false);

  return (
      <div
        className="relative m-auto w-[172.5px] h-[245.97px] overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/character/${id}`}>
          <img src={image} alt={name} className="w-full h-[189.97px] object-cover" />
        </Link>
        <div className="bottom-0 left-0 absolute bg-black w-full h-[56px] overflow-hidden">
          <div
            className={`absolute top-0 left-0 w-full bg-red-500 transition-all duration-500 ${
              isHovered ? "h-full" : "h-[5.38px]"
            }`}
          />

          <div className="relative flex justify-between items-center px-4 pt-4 pb-6 font-bold text-white">
            <Link href={`/character/${id}`} className="!w-[108px] truncate">
              <span className="truncate transition-colors duration-500">{name}</span>
            </Link>
            <img
              src={favorite.filter((f) => f.id === item.id).length > 0 ? 
                (isHovered ? "/icon/heart-icon-fill.png" : "/icon/heart-icon.png") 
              : "/icon/heart-icon-empty.png"}
              alt="Heart Icon"
              width={12}
              height={10.84} 
              onClick={() => favorite.filter((f) => f.id === item.id).length > 0 ? dispatch(remove(item)) : dispatch(add(item))}
            />
          </div>
        </div>

        <div className="right-0 bottom-0 absolute bg-white w-[20px] h-[20px] rotate-45 translate-x-1/2 translate-y-1/2 transform" />
      </div>
  );
}
