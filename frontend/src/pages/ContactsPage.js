import React, { useEffect, useState } from 'react'
import axios from 'axios';

function ContactsPage() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        nome: '',
        cognome: '',
        numero: ''
    });
    const [usersList, setUsersList] = useState([]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Qui puoi gestire l'inserimento dell'utente per il giorno specifico
        try {
            const response = await axios.post(`http://localhost:5000/api/contact/contact/`, {
                ...newUser
            });
            if (response.status === 201) {
                window.location.reload()
            }
            if (response.status === 400) {
                window.alert("Errore nell'inserimento dell'utente")
            }
        } catch (error) {
            console.error('Errore durante l\'aggiunta dell\'utente:', error);
            window.alert('Si è verificato un errore. Verifica i dati inseriti.'); // M
        }
        console.log('Nuovo utente:', newUser);
        // Aggiungi la logica per inserire l'utente nel giorno specifico
        setIsFormOpen(false); // Chiudi il form dopo l'invio
        setNewUser({ nome: '', cognome: '' , numero: ''}); // Reset del form
    };


    useEffect(() => {
        // Funzione per fare la richiesta GET
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/contact/contact/`);
                setUsersList(response.data); // Salva i dati di risposta nello stato
            } catch (error) {
                console.error("Errore durante il recupero dei dati:", error);
            }
        };

        fetchData();
    }, []);

    async function handleDeleteuser(user) {
        try {
            const response = await axios.delete(`http://localhost:5000/api/contact/contact/${user.numero}`);
            if (response.status === 204) {
                window.location.reload()
            }

        } catch (error) {
            console.error("Errore durante l'eliminazione dell'utente:", error);
        }
    }


  return (
        <div className='relative min-h-screen pb-16'>
           <h1 className='text-center font-bold text-3xl'>I miei contatti</h1>
           {usersList.map(user => (
                    <div key={user.numero} className="flex items-center justify-center p-2 border-b border-gray-200">
                        <div className='text-gray-600 font-semibold'>
                            {user.numero}
                        </div>


                        <div className="text-center flex-1 text-gray-800 font-medium">
                            {user.nome} {user.cognome}
                        </div>
                        <div className="flex gap-2 text-gray-500">
                            <button className="hover:text-red-500" onClick={() => handleDeleteuser(user)}>
                                🗑️
                            </button>
                        </div>
                    </div>
                ))}

            <div className='fixed bottom-4 right-4 flex'>
                <div
                    className='rounded-full w-20 h-20 bg-blue-600 flex justify-center items-center text-white cursor-pointer text-3xl  hover:bg-blue-700 transition-transform transform hover:scale-105'
                    onClick={() => setIsFormOpen(true)}
                >
                    +
                </div>
            </div>
            

            {isFormOpen && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                    <form
                        onSubmit={handleSubmit}
                        className='bg-white p-5 rounded shadow-md w-80'
                    >
                        <h2 className='text-lg font-bold mb-4'>Aggiungi Contatto</h2>
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
                        <input
                            type='text'
                            name='numero'
                            value={newUser.numero}
                            onChange={handleInputChange}
                            required
                            className='border p-2 mb-2 w-full'
                            placeholder='Numero di telefono'
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

export default ContactsPage