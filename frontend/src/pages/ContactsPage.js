import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GoPerson } from 'react-icons/go';
import { CiTrash } from 'react-icons/ci';
import { BsTelephone } from "react-icons/bs";
import { FaArrowLeft } from 'react-icons/fa';

function ContactsPage() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        nome: '',
        cognome: '',
        numero: ''
    });
    const [usersList, setUsersList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showQrCode, setShowQrCode] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [whatappContacts, setWhatsappContacts] = useState([])
    const [isLoadingContacts, setIsLoadingContacts] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedContacts, setSelectedContacts] = useState([]);



    // Funzione per filtrare i contatti in base al nome
    const filteredContacts = whatappContacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Funzione per gestire la selezione dei contatti
    const toggleContactSelection = (contact) => {
        setSelectedContacts(prevSelected =>
            prevSelected.includes(contact)
                ? prevSelected.filter(c => c !== contact)  // Deseleziona se già selezionato
                : [...prevSelected, contact]               // Seleziona
        );
        console.log(selectedContacts)
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/api/contact/contact/`, {
                ...newUser
            });
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
        setNewUser({ nome: '', cognome: '', numero: '' });
    };
    const fetchQrCode = async () => {
        try {
            const qrResponse = await axios.get('http://localhost:5000/qr');
            setQrCodeUrl(qrResponse.data);
            setShowQrCode(true)
        } catch (error) {
            console.error("Errore durante il recupero del QR code:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`http://localhost:5000/api/contact/contact/`);
                setUsersList(response.data);

                try {
                    setIsLoadingContacts(true)
                    const response2 = await axios.get(`http://localhost:5000/client-contacts`);
                    setIsLoadingContacts(false)
                    console.log(response2.status);

                    if (response2.status === 200) {
                        setWhatsappContacts(response2.data);
                        setShowQrCode(false);
                    } else {
                        fetchQrCode();
                    }
                } catch (error2) {
                    // Se la risposta è 404 o altro errore gestito
                    if (error2.response && error2.response.status === 404) {
                        console.log("404 non trovato, eseguo fetchQrCode()");
                        fetchQrCode();
                    } else {
                        console.error("Errore durante il recupero dei contatti WhatsApp:", error2);
                    }
                }
            } catch (error) {
                console.error("Errore durante il recupero dei dati:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSaveWhatsAppContacts = async () =>{

        try{
            const response = await axios.post(`http://localhost:5000/api/contact/contacts-whatsapp`,{
                selectedContacts
            })
            if(response.status===201){
                window.location.reload()
            }
        }catch(error){
            console.error(error)
        }
    }

    const handleDeleteUser = async (user) => {
        try {
            setIsLoading(true);
            const response = await axios.delete(`http://localhost:5000/api/contact/contact/${user.numero}`);
            if (response.status === 204) {
                window.location.reload();
            }
        } catch (error) {
            console.error("Errore durante l'eliminazione dell'utente:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='relative min-h-screen pb-16'>


            {isLoading ? (
                <p>Caricamento...</p>
            ) : (
                <>
                    <div className='flex'>
                        <div className='w-[45%]'>
                            <h1 className='text-center font-bold text-3xl'>I miei contatti</h1>
                            <div className='bg--300'>
                                {usersList.map(user => (
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
                                            <div className='flex items-center gap-x-2 ml-4 text-gray-500'>
                                                <div><BsTelephone size={20} /></div>
                                                <div>{user.numero}</div>
                                            </div>
                                        </div>

                                        <div className='flex  ml-auto mr-4'>
                                            <div onClick={() => handleDeleteUser(user)} className='cursor-pointer'><CiTrash color='red' size={30} /></div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                        <div className='w-[45%] ml-auto'>
                            <h1 className='text-center font-bold text-3xl'>I miei contatti WhatsApp</h1>
                            <div className='bg--300'>
                                <div className='bg--300'>
                                    {showQrCode && qrCodeUrl ? (
                                        <div>
                                            <img src={qrCodeUrl} alt="QR Code" className="mx-auto" />
                                        </div>

                                    ) :
                                        isLoadingContacts ? (<div>
                                            Caricamento...
                                        </div>) : <div className="p-4">
                                            {/* Barra di ricerca */}
                                            <input
                                                type="text"
                                                className="w-full p-2 border border-gray-300 rounded mb-4"
                                                placeholder="Cerca contatti per nome"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />

                                            {/* Lista di contatti filtrati */}
                                            <div className="overflow-y-auto max-h-64">
                                                {filteredContacts.map((contact, index) => (
                                                    <div key={index} className="flex items-center py-2 border-b">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedContacts.includes(contact)}
                                                            onChange={() => toggleContactSelection(contact)}
                                                            className="mr-2"
                                                        />
                                                        <div
                                                            className="cursor-pointer flex-1"
                                                            onClick={() => toggleContactSelection(contact)}
                                                        >
                                                            {contact.name}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div
                                                className='rounded-full w-20  ml-auto h-20 bg-blue-600 flex justify-center items-center text-white cursor-pointer text-3xl hover:bg-blue-700 transition-transform transform hover:scale-105'
                                                onClick={handleSaveWhatsAppContacts}
                                            >
                                                <FaArrowLeft />
                                            </div>
                                        </div>}

                                </div>

                            </div>
                        </div>
                    </div>
                </>
            )}

            <div className='fixed bottom-4 right-4 flex'>
                <div
                    className='rounded-full w-20 h-20 bg-blue-600 flex justify-center items-center text-white cursor-pointer text-3xl hover:bg-blue-700 transition-transform transform hover:scale-105'
                    onClick={() => setIsFormOpen(true)}
                >
                    +
                </div>
            </div>

            {isFormOpen && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                    <form class="w-full max-w-lg bg-white p-5 rounded shadow-md" onSubmit={handleSubmit}>
                        <h1 className='font-bold mb-8 text-lg uppercase tracking-wide'>Aggiungi Contatto</h1>
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                    Nome
                                </label>
                                <input value={newUser.nome} name='nome'
                                    onChange={handleInputChange} required class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Jane" />
                            </div>
                            <div class="w-full md:w-1/2 px-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                    Cognome
                                </label>
                                <input value={newUser.cognome} name='cognome'
                                    onChange={handleInputChange} required class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Doe" />
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                    Numero
                                </label>
                                <input value={newUser.numero} name='numero'
                                    onChange={handleInputChange} required class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="3333333333" />
                            </div>
                        </div>
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
            )}
        </div>

    );
}

export default ContactsPage;
