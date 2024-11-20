import axios from 'axios'

const baseURL = 'http://localhost:5000'
const baseName = 'api/contact'

export const getContact = () => {
    return axios.get(
        `${baseURL}/${baseName}/contact`
    )
}

export const postContact = (user) => {
    return axios.post(`${baseURL}/${baseName}/contact`, {
        nome: user.nome,
        cognome: user.cognome,
        numero: user.numero,
    });
};

export const postSelectedContactsWhatsappToApplication = (selectedContacts) => {
    return axios.post(`${baseURL}/${baseName}/contacts-whatsapp`,{
        selectedContacts
    })
}

export const deleteContact = (numero) =>{
    return axios.delete(`${baseURL}/${baseName}/contact/${numero}`)
}