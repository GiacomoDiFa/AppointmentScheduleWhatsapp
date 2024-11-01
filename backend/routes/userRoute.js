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
    const { nome, cognome, telefono, orario } = req.body;
    const { giorno } = req.params;

    if (!nome || !cognome || !telefono || !orario) {
      return res.status(400).json({ error: 'Tutti i campi (nome, cognome, telefono, orario) sono obbligatori.' });
    }
    if (!giorno || !["Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato", "Domenica"].includes(giorno)) {
      return res.status(400).json({ error: 'Il giorno della settimana è obbligatorio e deve essere valido.' });
    }
    next();
}

// Ottenere tutti gli utenti di un giorno specifico
router.get('/users/:giorno', async (req, res) => {
  const { giorno } = req.params;
  const usersByDay = await readUsers();
  res.json(usersByDay[giorno] || []);
});

// Aggiungere un nuovo utente per un giorno specifico usando il numero di telefono come chiave
router.post('/users/:giorno', validateUserFields, async (req, res) => {
  const { giorno } = req.params;
  const newUser = req.body;
  const usersByDay = await readUsers();

  if (!usersByDay[giorno]) {
    usersByDay[giorno] = [];
  }

  // Controllo se l'utente con quel numero di telefono già esiste nel giorno specifico
  const existingUser = usersByDay[giorno].find(user => user.telefono === newUser.telefono);

  if (existingUser) {
    return res.status(400).json({ error: 'Utente con questo numero di telefono già esiste per questo giorno' });
  }

  // Aggiungi l'utente al giorno specificato
  usersByDay[giorno].push(newUser);
  await writeUsers(usersByDay);

  res.status(201).json(newUser);
});

// Modificare un utente per un giorno specifico tramite il numero di telefono
router.put('/users/:giorno/:telefono', validateUserFields, async (req, res) => {
  const { giorno, telefono } = req.params;
  const updateData = req.body;
  const usersByDay = await readUsers();

  if (!usersByDay[giorno]) {
    return res.status(404).json({ error: 'Nessun utente trovato per questo giorno' });
  }

  const userIndex = usersByDay[giorno].findIndex(user => user.telefono === telefono);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Utente non trovato' });
  }

  usersByDay[giorno][userIndex] = { ...usersByDay[giorno][userIndex], ...updateData };
  await writeUsers(usersByDay);

  res.json(usersByDay[giorno][userIndex]);
});

// Eliminare un utente per un giorno specifico tramite il numero di telefono
router.delete('/users/:giorno/:telefono', async (req, res) => {
  const { giorno, telefono } = req.params;
  console.log(giorno)
  console.log(telefono)

  const usersByDay = await readUsers();

  if (!usersByDay[giorno]) {
    return res.status(404).json({ error: 'Nessun utente trovato per questo giorno' });
  }

  const userExists = usersByDay[giorno].some(user => user.telefono === telefono);
  console.log(userExists)
  if (!userExists) {
    return res.status(404).json({ error: 'Utente non trovato' });
  }

  usersByDay[giorno] = usersByDay[giorno].filter(user => user.telefono !== telefono);
  await writeUsers(usersByDay);

  res.status(204).send();
});

module.exports = router;
