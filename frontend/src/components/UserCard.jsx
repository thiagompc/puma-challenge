import React, { useState } from 'react';
import { toggleStar } from '../services/userService';

const UserCard = (props) => {

  const user = props.data
  const [fave, setFave] = useState(user?.favorite)

  return (
    <div className='pt-10'>
      <div className='flex bg-secondary-dark bg-auto h-40 border-gray-300 rounded-lg'>
        <img className='rounded-lg' alt='avatar' src={user?.avatar}/>
        <a href={user?.url} target='_blank' rel="noreferrer">
          <div className='text-primary-light pt-5 pl-5'>
            <h2>Nome: {user?.name}</h2>
            <h2 className='pt-2'>Usuário: {user?.username}</h2>
          </div>
        </a>
        <div className='ml-auto mr-10'>
          <div className='p-5'>
            <button onClick={() => {
              setFave(!fave)
              toggleStar(user?.username)} }>
              {
                fave && (
                  <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                )
                }
                {
                !fave && (
                  <svg class="w-4 h-4 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                  </svg>
                )
              }
            </button>
          </div>
          <div>
            <button  onClick={() => props.handleDelete(user?.username)} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Remover</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCard;