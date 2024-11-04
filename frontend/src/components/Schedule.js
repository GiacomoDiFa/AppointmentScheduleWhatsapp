import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {  GoPerson } from "react-icons/go";
import { CiClock1, CiTrash } from 'react-icons/ci';
import { FaCalendarDay } from "react-icons/fa";

function Schedule() {
    const { giorno } = useParams();
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        // Funzione per fare la richiesta GET
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/user/users/${giorno}`);
                setUsersList(response.data); // Salva i dati di risposta nello stato
            } catch (error) {
                console.error("Errore durante il recupero dei dati:", error);
            }
        };

        fetchData();
    }, [giorno]);

    async function handleDeleteuser(user) {
        try {
            const response = await axios.delete(`http://localhost:5000/api/user/users/${giorno}/${user.nome}/${user.cognome}/${user.data}/${user.orario}`);
            if (response.status === 204) {
                window.location.reload()
            }

        } catch (error) {
            console.error("Errore durante l'eliminazione dell'utente:", error);
        }
    }

    return (
        <>
            {usersList
                .sort((a, b) => a.data.localeCompare(b.data)) // Ordina per orario come stringhe
                .map(user => (
                    <div key={user.numero} className='flex w-full items-center border-b border-gray-200 mt-1'>
                        <div className=''>
                            <div className='flex items-center gap-x-2 ml-4'>
                                <div>
                                    <GoPerson size={20} />
                                </div>
                                <div className='text-gray-800 font-medium text-lg'>
                                    {user.nome} {user.cognome}
                                </div>
                            </div>
                            <div className='flex items-center ml-4 text-gray-500'>
                                <div className='mr-2'><FaCalendarDay size={20} /></div>
                                <div className='mr-2'>{user.data}</div>
                                <div className='mr-1'><CiClock1 size={20} /></div>
                                <div>{user.orario}</div>
                            </div>
                        </div>

                        <div className='flex  ml-auto mr-4'>
                            <div onClick={() => handleDeleteuser(user)} className='cursor-pointer'><CiTrash color='red' size={30} /></div>
                        </div>
                    </div>
                ))}

        </>
    );
}

export default Schedule;
