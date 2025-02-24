import React from 'react'
import Image from 'next/image';


const Header = () => {
  return (
    <div className='flex justify-between items-center bg-black p-4 text-white'>
        <Image src='/images/logo.png' alt='Logo Marvel' width={130} height={52} />
        <div className='flex items-center'>
            <Image className='pr-2' src='/icon/heart-icon.png' alt='Favorite' width={24} height={21.68} />
            <p>3</p>
        </div>
    </div>
  )
}

export default Header