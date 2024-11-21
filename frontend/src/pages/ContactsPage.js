import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { TfiAgenda } from 'react-icons/tfi';
import Button from '../components/Button';
import Form from '../components/Form';
import UserItem from '../components/UserItem';
import { useGetContact } from '../hooks/contact/useGetContact';
import { usePostContact } from '../hooks/contact/usePostContact';
import { usePostSelectedContactsWhatsappToApplication } from '../hooks/contact/usePostSelectedContactsWhatsappToApplication';
import { useDeleteContact } from '../hooks/contact/useDeleteContact';
import { useGetWhatsappContact } from '../hooks/whatsapp/useGetWhatsappContact';
import { useGetQrCode } from '../hooks/whatsapp/useGetQrCode';
import { useGetClientStatus } from '../hooks/whatsapp/useGetClientStatus';

function ContactsPage() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [newUser, setNewUser] = useState({ nome: '', cognome: '', numero: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedContacts, setSelectedContacts] = useState([]);

    // Use hooks with useQuery
    const { data: contactsList, isLoading: isLoadingContacts } = useGetContact();
    const { addContact } = usePostContact();
    const { WhatsAppToApplication } = usePostSelectedContactsWhatsappToApplication();
    const { deleteContactFn } = useDeleteContact();
    const { data: whatsappContacts, isLoading: isLoadingWhatsappContacts } = useGetWhatsappContact();
    console.log(whatsappContacts)
    const { data: qrCode, isLoading: isLoadingQrCode } = useGetQrCode();
    const { data: clientStatus } = useGetClientStatus();
    // console.log(qrCode)
    // console.log(clientStatus)

    // per ora lasciamo cosi ma e' buggata ma voglio trovare qual e il motivo perche sarebbe figo
    // useEffect(() => {
    //     queryClient.invalidateQueries('client-status')
    //     queryClient.invalidateQueries('whatsapp-contacts')
    // }, [clientStatus])


    // Filter contacts based on search term
    const filteredContacts = whatsappContacts?.data?.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Toggle contact selection
    const toggleContactSelection = (contact) => {
        setSelectedContacts(prevSelected =>
            prevSelected.includes(contact)
                ? prevSelected.filter(c => c !== contact)
                : [...prevSelected, contact]
        );
    };

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };

    // Handle contact submission
    const handleSubmit = (e) => {
        e.preventDefault();
        addContact(newUser, {
            onSuccess: () => {
                setNewUser({ nome: '', cognome: '', numero: '' });
                setIsFormOpen(false);
            },
        });
    };

    // Handle saving selected WhatsApp contacts
    const handleSaveWhatsAppContacts = () => {
        WhatsAppToApplication(selectedContacts, {
            onSuccess: () => setSelectedContacts([]),
            onError: (error) => console.error(error)
        });
    };

    // Handle contact deletion
    const handleDeleteUser = (user) => {
        deleteContactFn(user.numero, {
            onError: (error) => console.error(error)
        });
    };

    return (
        <div className='relative min-h-screen pb-16 p-4 max-w h-[100vh] mx-auto'>
            {isLoadingContacts ? (
                <p>Caricamento...</p>
            ) : (
                <>
                    <div className='flex justify-center items-center border-b py-8 '>
                        <Link to='/'>
                            <div className='mr-auto flex items-center'>
                                <TfiAgenda size={30} className='mr-2' />
                                <span className='font-mono text-gray-500 text-2xl ml-2'>Agenda</span>
                            </div>
                        </Link>
                        <h1 className='font-mono text-2xl w-full text-center'>Contatti</h1>
                    </div>
                    <div className='flex mt-10'>
                        <div className='w-[45%]'>
                            <h1 className='text-center font-mono text-2xl'>I miei contatti in Agenda</h1>
                            <div className='bg--300'>
                                {contactsList?.data?.map(user => (
                                    <UserItem
                                        key={user.numero}
                                        handleDeleteUser={handleDeleteUser}
                                        user={user}
                                        showDateAndTime={false}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className='w-[45%] ml-auto'>
                            <h1 className='text-center font-mono text-2xl'>I miei contatti WhatsApp</h1>
                            <div className='bg--300'>

                                {clientStatus?.data?.ready === false && qrCode ? (
                                    <div>
                                        <img src={qrCode.data} alt="QR Code" className="mx-auto" />
                                    </div>
                                ) : isLoadingWhatsappContacts || isLoadingQrCode ? (
                                    <p>Caricamento...</p>
                                ) : (
                                    <div className="p-4">
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-gray-300 rounded mb-4"
                                            placeholder="Cerca contatti per nome"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <div className="overflow-y-auto max-h-64">
                                            {filteredContacts?.map((contact, index) => (
                                                <div key={index} className="flex items-center py-2 border-b">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedContacts.includes(contact)}
                                                        onChange={() => toggleContactSelection(contact)}
                                                        className="mr-2"
                                                    />
                                                    <span
                                                        className="cursor-pointer flex-1"
                                                        onClick={() => toggleContactSelection(contact)}
                                                    >
                                                        {contact.name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        <Button
                                            className='ml-auto h-20'
                                            onClick={handleSaveWhatsAppContacts}
                                            icon={() => <FaArrowLeft />}
                                        />
                                    </div>
                                )}


                            </div>
                        </div>
                    </div>
                </>
            )}
            <div className='fixed bottom-4 right-4 flex'>
                <Button onClick={() => setIsFormOpen(true)} icon={() => <span>+</span>} />
            </div>
            <Form
                isFormOpen={isFormOpen}
                title="Aggiungi Contatto"
                formData={newUser}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                setIsFormOpen={setIsFormOpen}
                fields={[
                    { name: 'nome', label: 'Nome', placeholder: 'Jane' },
                    { name: 'cognome', label: 'Cognome', placeholder: 'Doe' },
                    { name: 'numero', label: 'Numero', placeholder: '3333333333' }
                ]}
            />
        </div>
    );
}

export default ContactsPage;
