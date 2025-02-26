import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Character } from '../interfaces/caracter.interface'
import Link from 'next/link';

const Header = () => {

  const favorite = useSelector((state: { favorite: { value: Character[] } }) => state.favorite.value)  

  return (
    <div className='flex justify-between items-center bg-black p-4 h-20 text-white'>
        <h1 className='hidden'>Marvel Character</h1>
        <Link href='/'>
          <img src='/images/logo.png' alt='Logo Marvel' width={130} height={52} className='logoImg' />
        </Link>
        <div className='flex items-center'>
            <img className='pr-2' src='/icon/heart-icon.png' alt='Favorite' width={24} height={21.68} />
            <p>{ favorite.length }</p>
        </div>
    </div>
  )
}

export default Header

