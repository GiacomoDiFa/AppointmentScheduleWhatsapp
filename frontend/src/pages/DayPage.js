import React, { useEffect, useState } from 'react';
import Schedule from '../components/Schedule';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { LuSendHorizonal } from "react-icons/lu";
import swal from 'sweetalert';

function DayPage() {
    const { data } = useParams();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [showQrCode, setShowQrCode] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [newUser, setNewUser] = useState({
        data: data || '',  
        orario: '',
        numero: '',
        nome: '',
        cognome: '',
    });
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/contact/contact/`);
                setUsersList(response.data);
            } catch (error) {
                console.error("Errore durante il recupero dei dati:", error);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleUserSelect = (e) => {
        const selectedUser = usersList.find(user => user.numero === e.target.value);
        if (selectedUser) {
            setNewUser({
                ...newUser,
                numero: selectedUser.numero,
                nome: selectedUser.nome,
                cognome: selectedUser.cognome || ' ',
            });
        }
    };

    const checkClientStatusAndSendMessages = async () => {
        try {
            const statusResponse = await axios.get('http://localhost:5000/client-status');
            if (statusResponse.data.ready) {
                await sendMessagesDay();
            } else {
                fetchQrCode();
            }
        } catch (error) {
            swal("Oops!", "Qualcosa è andato storto!", "error");
        }
    };

    const fetchQrCode = async () => {
        try {
            const qrResponse = await axios.get('http://localhost:5000/qr');
            setQrCodeUrl(qrResponse.data);
            console.log(qrCodeUrl)
            setShowQrCode(true);
        } catch (error) {
            console.error("Errore durante il recupero del QR code:", error);
        }
    };

    const sendMessagesDay = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/whatsapp/send-messages/${data}`);
            if (response.status === 200) {
                swal("Ottimo!", `I messaggi di ${data} sono stati inviati con successo!`, "success");
            } else {
                swal("Oops!", "Qualcosa è andato storto!", "error");
            }
        } catch (error) {
            swal("Oops!", "Qualcosa è andato storto!", "error");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/api/user/users/${data}`, newUser);
            if (response.status === 201) {
                window.location.reload();
            } else if (response.status === 400) {
                window.alert("Errore nell'inserimento dell'utente");
            }
        } catch (error) {
            console.error('Errore durante l\'aggiunta dell\'utente:', error);
            window.alert('Si è verificato un errore. Verifica i dati inseriti.');
        }
        setIsFormOpen(false);
        setNewUser({ data: '', orario: '', numero: '', nome: '', cognome: '' });
    };

    return (
        <div className='relative min-h-screen pb-16'>
            <h1 className='font-bold text-3xl'>{data}</h1>
            <Schedule />
            <div className='fixed bottom-4 right-4 flex'>
                <div
                    className='rounded-full w-20 h-20 bg-blue-600 flex justify-center items-center text-white cursor-pointer text-3xl hover:bg-blue-700 transition-transform transform hover:scale-105'
                    onClick={() => setIsFormOpen(true)}
                >
                    +
                </div>
            </div>
            <div className='fixed bottom-4 right-28 flex'>
                <div
                    className='rounded-full w-20 h-20 bg-blue-600 flex justify-center items-center text-white cursor-pointer text-3xl hover:bg-blue-700 transition-transform transform hover:scale-105'
                    onClick={() => checkClientStatusAndSendMessages()}
                >
                    <LuSendHorizonal />
                </div>
            </div>

            {showQrCode && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded shadow-md">
                        <h2 className="font-bold text-lg mb-4">QR Code per Connessione</h2>
                        <img src={qrCodeUrl} alt="QR Code" className="mx-auto" />
                        <button
                            onClick={() => setShowQrCode(false)}
                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Chiudi
                        </button>
                    </div>
                </div>
            )}

            {isFormOpen && (
                <><div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                    <form class="w-full max-w-lg bg-white p-5 rounded shadow-md" onSubmit={handleSubmit}>
                        <h1 className='font-bold mb-8 text-lg uppercase tracking-wide'>Aggiungi Utente</h1>
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                    Data
                                </label>
                                <input value={newUser.data} name='data' disabled
                                    onChange={handleInputChange} required class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="03-11-2024" />
                            </div>
                            <div class="w-full md:w-1/2 px-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                    Orario
                                </label>
                                <input value={newUser.orario} name='orario'
                                    onChange={handleInputChange} required class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="11:00" />
                            </div>
                        </div>
                        <select
                            value={newUser.numero}
                            onChange={handleUserSelect}
                            required
                            className='border p-2 mb-2 w-full'
                        >
                            <option value="">Seleziona un contatto</option>
                            {usersList.map((user) => (
                                <option key={user.numero} value={user.numero}>
                                    {user.nome} {user.cognome} - {user.numero}
                                </option>
                            ))}
                        </select>

                        <div className='flex justify-end mt-4'>
                            <button
                                type='submit'
                                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none focus:shadow-outline'
                            >
                                Aggiungi
                            </button>
                            <button
                                type='button'
                                onClick={() => setIsFormOpen(false)}
                                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                            >
                                Annulla
                            </button>
                        </div>
                    </form>
                </div>
                </>
            )}
        </div>
    );
}

export default DayPage;
