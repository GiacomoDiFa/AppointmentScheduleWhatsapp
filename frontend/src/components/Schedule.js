import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
            const response = await axios.delete(`http://localhost:5000/api/user/users/${giorno}/${user.telefono}`);
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
                .sort((a, b) => a.orario.localeCompare(b.orario)) // Ordina per orario come stringhe
                .map(user => (
                    <div key={user.telefono} className="flex items-center justify-center p-2 border-b border-gray-200">
                        <div className="text-gray-600">
                            {user.orario}
                        </div>
                        <div className="text-center flex-1 text-gray-800 font-medium">
                            {user.nome} {user.cognome}
                        </div>
                        <div className="flex gap-2 text-gray-500">
                            <button className="hover:text-blue-500">
                                ✏️
                            </button>
                            <button className="hover:text-red-500" onClick={() => handleDeleteuser(user)}>
                                🗑️
                            </button>
                        </div>
                    </div>
                ))}

        </>
    );
}

export default Schedule;
