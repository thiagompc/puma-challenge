import React, { useEffect, useState } from 'react';
import { getAllUsers, addUser, deleteUser, toggleStar } from '../services/userService';
import UserCard from './UserCard';

const Home = () => {
    const [newUser, setNewUser] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    const closeError = () => {
        setError('');
        setNewUser('');
    };

    useEffect(() => {
      const fetchUsers = async () => {        
          try {
              const response = await getAllUsers()
              setUsers(response)
            } catch (error) {
              console.error('Error fetching favorite users:', error);
            }
          };
          fetchUsers();
    }, [users]);

    const handleAddUser = async () => {
        setError('');
        try {
            const response = await addUser(newUser);
            const addedUser = response.data;
            setUsers((prevUsers) => ([...prevUsers, addedUser]));
            setNewUser('');
        } catch (error) {
            if (error.response) {
                const { data } = error.response;
                setError(data.error);
            } else {
                setError('Erro ao adicionar usuário favorito.');
            }
        }
    };

    const handleDeleteUser = async (username) => {
        setError('');

        try {
            await deleteUser(username);

            setUsers((prevUsers) => prevUsers.filter((user) => user.username !== username));
        } catch (error) {
            setError('Erro ao excluir usuário favorito.');
            console.error('Error deleting favorite user:', error);
        }
    };

    const handleToggleStar = async (username) => {
        setError('');
        try {
            await toggleStar(username);
            setUsers((prevUsers) =>
                prevUsers.map((user) => {
                    if (user.username === username) {
                        return { ...user, starred: !user.starred };
                    } else {
                        return { ...user, starred: false };
                    }
                })
            );
        } catch (error) {
            setError('Erro ao atualizar a estrela do usuário.');
            console.error('Error toggling star:', error);
        }
    };

    return (
      
      <div className='bg-primary-dark h-screen justify-center overflow-scroll pb-20'>
          {
            error && (
              <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong class="font-bold">Erro :c </strong>
                <span class="block sm:inline">{error}</span>
                <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg  onClick={() => closeError()} class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Fechar</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>
              </div>
            )
        }
          <div className='sm:px-10 text-primary-light font-sans md:px-80 pt-40 content-center '>
            <div className='align-middle'>
              <tr>
                <td className='pr-10'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </td>
                <td>
                  <h1 className='text-5xl'>Github Finder</h1>
                  <h3 className='text-lg' >Procure por usuários e favorite eles</h3>
                </td>
              </tr>
            </div>
            <div className='flex pt-20 content-center'>
              <input
                value={newUser}
                onChange={(e) => setNewUser(e.target.value)}
                placeholder="Digite o nome de usuário" 
                type="text" id="large-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-green focus:border-green dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green dark:focus:border-green"/>
              <button onClick={() => handleAddUser()} className='bg-primary-light hover:bg-green text-primary-dark p-2 ml-5 rounded-lg'>Adicionar</button>
            </div>
          </div>
          <div className='pt-40 sm:w-[80%] md:w-[50%] m-auto'>
            {users && (
              users.map((item => (
                <>                
                  <UserCard data={item} handleDelete={handleDeleteUser} toggleStar={handleToggleStar} key={item?.username}/>
                </>
              )))
            )}
          </div>
        </div>
    );
};

export default Home;