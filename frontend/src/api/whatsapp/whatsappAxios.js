import axios from "axios"

const baseURL = 'http://localhost:5000'
const baseName = 'api/whatsapp'

export const postSendMessages = (giorno) => {
    return axios.post(`${baseURL}/${baseName}/send-messages/${giorno}`)
}

export const getQrCode = () =>{
    return axios.get(`${baseURL}/qr`)
}

export const getClientStatus = () => {
    return axios.get(`${baseURL}/client-status`)
}

export const getWhatsappContact = () => {
    return axios.get(`${baseURL}/client-contacts`)
    
}