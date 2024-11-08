const express = require('express');
const router = express.Router();
const fs = require('fs-extra');
const dbFile = '../backend/contacts.json';

// Funzione per leggere gli utenti dal file
async function readContacts() {
    const data = await fs.readFile(dbFile, 'utf8');
    return JSON.parse(data);
}

// Funzione per scrivere gli utenti nel file
async function writeContacts(contacts) {
    await fs.writeFile(dbFile, JSON.stringify(contacts, null, 2));
}

// Middleware per validare i campi dell'utente
function validateUserFields(req, res, next) {
    const { nome, cognome, numero } = req.body;


    if (!nome || !cognome || !numero) {
        return res.status(400).json({ error: 'Tutti i campi (nome, cognome, numero) sono obbligatori.' });
    }
    next();
}

// Ottenere tutti gli utenti di un giorno specifico
router.get('/contact', async (req, res) => {
    const contacts = await readContacts();
    res.json(contacts || []);
});

router.post('/contact', validateUserFields, async (req, res) => {
    const newUser = req.body;
    let contacts = await readContacts();

    // Assicurati che `contacts` sia un array
    if (!Array.isArray(contacts)) {
        contacts = [];
    }

    // Verifica se esiste già un utente con lo stesso numero di telefono
    const userExists = contacts.some(user => user.numero === newUser.numero);

    if (userExists) {
        return res.status(409).json({ error: "L'utente con questo numero di telefono è già presente tra i contatti." });
    }

    // Aggiungi l'utente
    contacts.push(newUser);
    await writeContacts(contacts);

    res.status(201).json(newUser);
});

// Funzione per processare e salvare i contatti
router.post('/contacts-whatsapp', async (req, res) => {
    const contacts = req.body; // L'array di oggetti inviato nel corpo della richiesta
    const savedContacts = [];
    

    // Processa ogni contatto
    for (const contact of contacts.selectedContacts) {
        const nameParts = contact.name.split(' '); // Dividi il campo name in nome e cognome
        const nome = nameParts[0]; // Prendi il primo elemento come nome
        const cognome = nameParts[1] || ' '; // Se c'è un secondo elemento, è il cognome (se non esiste, sarà una stringa vuota)

        // Crea un oggetto contatto
        const newContact = {
            nome,
            cognome,
            numero: contact.number
        };

        // Aggiungi il nuovo contatto alla lista
        savedContacts.push(newContact);
    }


    // Recupera i contatti esistenti dal file
    let existingContacts = await readContacts();

    // Assicurati che `contacts` sia un array
    if (!Array.isArray(existingContacts)) {
        existingContacts = [];
    }

    // Aggiungi i nuovi contatti all'elenco esistente
    existingContacts = existingContacts.concat(savedContacts);
    

    // Salva l'array aggiornato nel file
    await writeContacts(existingContacts);

    // Rispondi con i contatti salvati
    res.status(201).json({
        message: 'Contatti salvati con successo!',
        savedContacts
    });
});




// Eliminare un utente per un giorno specifico tramite il numero di telefono
router.delete('/contact/:numero', async (req, res) => {
    const { numero } = req.params;

    let contacts = await readContacts();

    if (!contacts) {
        return res.status(404).json({ error: 'Nessun utente trovato' });
    }

    // Trova l'utente che rispetta tutti i parametri
    const userExists = contacts.some(
        user => user.numero === numero
    );

    if (!userExists) {
        return res.status(404).json({ error: 'Utente non trovato' });
    }

    // Elimina l'utente che rispetta tutti i parametri
    contacts = contacts.filter(
        user => !(user.numero === numero)
    );

    await writeContacts(contacts);

    res.status(204).send();
});


module.exports = router;
