import React, { useState } from 'react';
import Schedule from '../components/Schedule';
import { Link, useParams } from 'react-router-dom';
import { LuSendHorizonal } from "react-icons/lu";
import swal from 'sweetalert';
import { TfiAgenda } from 'react-icons/tfi';
import Button from '../components/Button';
import Form from '../components/Form';
import { useGetContact } from '../hooks/contact/useGetContact';
import { useGetUser } from '../hooks/user/useGetUser';
import { usePostUser } from '../hooks/user/usePostUser';
import { usePostSendMessages } from '../hooks/whatsapp/usePostSendMessages';
import { useGetQrCode } from '../hooks/whatsapp/useGetQrCode';
import { useGetClientStatus } from '../hooks/whatsapp/useGetClientStatus';

function DayPage() {
    const { data } = useParams();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [showQrCode, setShowQrCode] = useState(false);
    const [newUser, setNewUser] = useState({
        data: data || '',
        orario: '',
        numero: '',
        nome: '',
        cognome: '',
    });

    const { data: contactsList } = useGetContact();
    const { data: usersList, isLoading: isLoadingUsers } = useGetUser(data);
    const { addUser } = usePostUser(data);
    const { sendMessages } = usePostSendMessages(data);
    const { data: qrCode } = useGetQrCode();
    const { data: clientStatus } = useGetClientStatus()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleUserSelect = (e) => {
        const selectedUser = contactsList.data?.find(user => user.numero === e.target.value);
        if (selectedUser) {
            setNewUser((prevState) => ({
                ...prevState,
                numero: selectedUser.numero,
                nome: selectedUser.nome,
                cognome: selectedUser.cognome || ' ',
            }));
        }
    };

    const checkClientStatusAndSendMessages = async () => {

        if (clientStatus.data.ready) {
            sendMessages(data, {
                onSuccess: () => {
                    swal("Ottimo!", `I messaggi di ${data} sono stati inviati con successo!`, "success");
                },
                onError: () => {
                    swal("Oops!", "Qualcosa è andato storto!", "error");
                }
            });
        } else {
            setShowQrCode(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        addUser({ user: newUser, giorno: data }, {
            onSuccess: () => {
                setNewUser({ data: data || '', orario: '', numero: '', nome: '', cognome: '' });
                setIsFormOpen(false);
            },
            onError: () => {
                window.alert("Errore nell'inserimento dell'utente");
            }
        });
    };

    return (
        <div className='relative min-h-screen pb-16 p-4 max-w h-[100vh] mx-auto'>
            <div className='flex justify-center items-center border-b py-8 '>
                <Link to='/'>
                    <div className='mr-auto flex items-center'>
                        <div className='mr-2'><TfiAgenda size={30} /></div>
                        <div className='font-mono text-gray-500 text-2xl ml-2'>Agenda</div>
                    </div>
                </Link>
                <div className='flex justify-center items-center w-full'>
                    <h1 className='font-mono text-2xl'>{data}</h1>
                </div>
            </div>

            {isLoadingUsers ? (
                <p>Caricamento utenti...</p>
            ) : (
                <Schedule usersList={usersList?.data || []} />
            )}

            <div className='fixed bottom-4 right-4 flex'>
                <Button onClick={() => setIsFormOpen(true)} icon={() => <span>+</span>} />
            </div>
            <div className='fixed bottom-4 right-28 flex'>
                <Button onClick={() => checkClientStatusAndSendMessages()}
                    icon={() => <LuSendHorizonal />}
                    disabled={!usersList || !usersList.data || usersList.data.length === 0} />
            </div>

            {showQrCode && qrCode && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded shadow-md">
                        <h2 className="font-bold text-lg mb-4">QR Code per Connessione</h2>
                        <img src={qrCode.data} alt="QR Code" className="mx-auto" />
                        <button
                            onClick={() => setShowQrCode(false)}
                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Chiudi
                        </button>
                    </div>
                </div>
            )}

            <Form
                isFormOpen={isFormOpen}
                title={'Aggiungi utente'}
                formData={newUser}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                handleUserSelect={handleUserSelect}
                setIsFormOpen={setIsFormOpen}
                contactsList={contactsList ? contactsList.data : []}
                fields={[
                    { name: 'data', label: 'Data', placeholder: '03-11-2024', disabled: true },
                    { name: 'orario', label: 'Orario', placeholder: '11:00' }
                ]}
            />
        </div>
    );
}

export default DayPage;
