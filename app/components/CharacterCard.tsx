import { useState } from "react";
import Image from "next/image";

interface CharacterCardProps {
  name: string;
  image: string;
}

export default function CharacterCard({ name, image }: CharacterCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative m-auto w-[172.5px] h-[245.97px] overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Imagen */}
      <img src={image} alt={name} className="w-full h-[189.97px] object-cover" />

      {/* Contenedor negro con efecto de barrido rojo */}
      <div className="bottom-0 left-0 absolute bg-black w-full h-[56px] overflow-hidden">
        {/* Capa roja que baja progresivamente */}
        <div
          className={`absolute top-0 left-0 w-full bg-red-500 transition-all duration-500 ${
            isHovered ? "h-full" : "h-[5.38px]"
          }`}
        />

        {/* Contenido dentro del bloque negro/rojo */}
        <div className="relative flex justify-between items-center px-4 pt-4 pb-6 font-bold text-white">
          <span className="truncate transition-colors duration-500">{name}</span>
          <Image
            src="/icon/heart-icon-empty.png"
            alt="Heart Icon"
            width={12}
            height={10.84}
          />
        </div>
      </div>

      {/* Esquina recortada */}
      <div className="right-0 bottom-0 absolute bg-white w-[20px] h-[20px] rotate-45 translate-x-1/2 translate-y-1/2 transform" />
    </div>
  );
}
