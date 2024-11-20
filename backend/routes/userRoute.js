const express = require('express');
const router = express.Router();
const fs = require('fs-extra');
const dbFile = '../backend/db.json';

// Funzione per leggere gli utenti dal file
async function readUsers() {
  const data = await fs.readFile(dbFile, 'utf8');
  return JSON.parse(data);
}

// Funzione per scrivere gli utenti nel file
async function writeUsers(usersByDay) {
  await fs.writeFile(dbFile, JSON.stringify(usersByDay, null, 2));
}

// Middleware per validare i campi dell'utente
function validateUserFields(req, res, next) {
    const { nome, cognome, numero, orario } = req.body;
    const { giorno } = req.params;

    if (!nome || !cognome || !numero ||!orario) {
      return res.status(400).json({ error: 'Tutti i campi (nome, cognome, numero, data, orario) sono obbligatori.' });
    }
  
    next();
}

// Ottenere tutti gli utenti di un giorno specifico
router.get('/users/:data', async (req, res) => {
  const { data } = req.params;
  const usersByDay = await readUsers();
  res.json(usersByDay[data] || []);
});

// Aggiungere un nuovo utente per un giorno specifico usando il numero di numero come chiave
router.post('/users/:giorno', validateUserFields, async (req, res) => {
  const { giorno } = req.params;
  const newUser = req.body;
  const usersByDay = await readUsers();

  if (!usersByDay[giorno]) {
    usersByDay[giorno] = [];
  }

  // Aggiungi l'utente al giorno specificato
  usersByDay[giorno].push(newUser);
  await writeUsers(usersByDay);

  res.status(201).json(newUser);
});


// Eliminare un utente per un giorno specifico tramite il numero di numero
router.delete('/users/:giorno/:nome/:cognome/:data/:orario', async (req, res) => {
  const { giorno, nome, cognome, data, orario } = req.params;

  const usersByDay = await readUsers();

  if (!usersByDay[giorno]) {
    return res.status(404).json({ error: 'Nessun utente trovato per questo giorno' });
  }

  // Trova l'utente che rispetta tutti i parametri
  const userExists = usersByDay[giorno].some(
    user => user.nome === nome && 
            user.cognome === cognome && 
            user.data === data && 
            user.orario === orario
  );

  if (!userExists) {
    return res.status(404).json({ error: 'Utente non trovato' });
  }

  // Elimina l'utente che rispetta tutti i parametri
  usersByDay[giorno] = usersByDay[giorno].filter(
    user => !(user.nome === nome && 
              user.cognome === cognome && 
              user.data === data && 
              user.orario === orario)
  );

  await writeUsers(usersByDay);

  res.status(204).send();
});


module.exports = router;
