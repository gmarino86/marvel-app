import React from 'react'
import { useSelector } from 'react-redux'
import { Character } from '../interfaces/caracter.interface'
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {

  const favorite = useSelector((state: { favorite: { value: Character[] } }) => state.favorite.value)  

  return (
    <div className='flex justify-between items-center bg-black p-4 h-20 text-white'>
        <h1 className='hidden'>Marvel Character</h1>
        <Link href='/'>
          <Image src='/images/logo.png' alt='Logo Marvel' width={130} height={52} className='logoImg' priority />
        </Link>
        <div className='flex items-center'>
            <Image className='pr-2' src='/icon/heart-icon.png' alt='Favorite' width={24} height={21.68} priority/>
            <p>{ favorite.length }</p>
        </div>
    </div>
  )
}

export default Header

