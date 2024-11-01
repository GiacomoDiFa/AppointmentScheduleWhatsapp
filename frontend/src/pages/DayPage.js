import React, { useState } from 'react';
import Schedule from '../components/Schedule';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function DayPage() {
    const { giorno } = useParams();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        orario: '',
        telefono: '',
        nome: '',
        cognome: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Qui puoi gestire l'inserimento dell'utente per il giorno specifico
        try{
            const response = await axios.post(`http://localhost:5000/api/user/users/${giorno}`, {
                ...newUser
                });
            if(response.status === 201){
                window.location.reload()
            }
            if(response.status === 400){
                window.alert("Errore nell'inserimento dell'utente")
            }
        }catch(error){
            console.error('Errore durante l\'aggiunta dell\'utente:', error);
            window.alert('Si è verificato un errore. Verifica i dati inseriti.'); // M
        }
        console.log('Nuovo utente:', newUser);
        // Aggiungi la logica per inserire l'utente nel giorno specifico
        setIsFormOpen(false); // Chiudi il form dopo l'invio
        setNewUser({ orario: '', telefono: '', nome: '', cognome: '' }); // Reset del form
    };

    return (
        <div className='relative min-h-screen pb-16'>
            <h1 className='font-bold text-3xl'>{giorno}</h1>
            <Schedule />
            <div className='fixed bottom-4 right-4 flex'>
                <div
                    className='rounded-full w-20 h-20 bg-blue-600 flex justify-center items-center text-white cursor-pointer text-3xl  hover:bg-blue-700 transition-transform transform hover:scale-105'
                    onClick={() => setIsFormOpen(true)}
                >
                    +
                </div>
            </div>
            <div className='fixed bottom-4 right-28 flex'>
                <div
                    className='rounded-full w-20 h-20 bg-blue-600 flex justify-center items-center text-white cursor-pointer text-3xl  hover:bg-blue-700 transition-transform transform hover:scale-105'
                    onClick={() => setIsFormOpen(true)}
                >
                    &gt;
                </div>
            </div>

            {isFormOpen && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                    <form 
                        onSubmit={handleSubmit} 
                        className='bg-white p-5 rounded shadow-md w-80'
                    >
                        <h2 className='text-lg font-bold mb-4'>Aggiungi Utente</h2>
                        <input
                            type='text'
                            name='orario'
                            value={newUser.orario}
                            onChange={handleInputChange}
                            required
                            className='border p-2 mb-2 w-full'
                            placeholder='Orario'
                        />
                        <input
                            type='text'
                            name='telefono'
                            value={newUser.telefono}
                            onChange={handleInputChange}
                            required
                            className='border p-2 mb-2 w-full'
                            placeholder='Numero di telefono'
                        />
                        <input
                            type='text'
                            name='nome'
                            value={newUser.nome}
                            onChange={handleInputChange}
                            required
                            className='border p-2 mb-2 w-full'
                            placeholder='Nome'
                        />
                        <input
                            type='text'
                            name='cognome'
                            value={newUser.cognome}
                            onChange={handleInputChange}
                            required
                            className='border p-2 mb-2 w-full'
                            placeholder='Cognome'
                        />
                        <div className='flex justify-end'>
                            <button 
                                type='submit' 
                                className='bg-blue-600 text-white p-2 rounded mr-2'
                            >
                                Aggiungi
                            </button>
                            <button 
                                type='button' 
                                onClick={() => setIsFormOpen(false)} 
                                className='bg-red-600 text-white p-2 rounded'
                            >
                                Annulla
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default DayPage;
