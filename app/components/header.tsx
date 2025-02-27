import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Character } from '../interfaces/caracter.interface';
import Link from 'next/link';
import Image from 'next/image';
import { toggleShowFavorites } from '@/app/redux/favoriteSlice';

const Header = () => {
  const favorite = useSelector((state: { favorite: { value: Character[], showFavorites: boolean } }) => state.favorite.value);
  const showFavorites = useSelector((state: { favorite: { value: Character[], showFavorites: boolean } }) => state.favorite.showFavorites);
  const dispatch = useDispatch();

  return (
    <div className='flex justify-between items-center bg-black p-4 h-20 text-white'>
      <h1 className='hidden'>Marvel Character</h1>
      <Link href='/'>
        <Image src='/images/logo.png' alt='Logo Marvel' width={130} height={52} className='logoImg' priority />
      </Link>
      <div className='flex items-center cursor-pointer' onClick={() => dispatch(toggleShowFavorites())}>
        <Image
          className='pr-2' 
          src={showFavorites ? '/icon/heart-icon-fill.png' : '/icon/heart-icon.png'} 
          alt='Favorite' 
          width={24}
          height={24}
          priority
        />
        <p>{favorite.length}</p>
      </div>
    </div>
  );
};

export default Header;
