import axios from "axios";

const baseURL = 'http://localhost:5000'
const baseName = 'api/user'

export const getUser = (giorno) => {
    return axios.get(
        `${baseURL}/${baseName}/users/${giorno}`
    )
}

export const postUser = ({ user, giorno }) => {
    return axios.post(
        `${baseURL}/${baseName}/users/${giorno}`, {
        nome: user.nome,
        cognome: user.cognome,
        numero: user.numero,
        data: user.data,
        orario: user.orario
    }
    )
}

export const deleteUser = ({ user, giorno }) => {
    console.log(`${baseURL}/${baseName}/users/${giorno}/${user.nome}/${user.cognome}/${user.data}/${user.orario}`);
    return axios.delete(
        `${baseURL}/${baseName}/users/${giorno}/${user.nome}/${user.cognome}/${user.data}/${user.orario}`
    )
}