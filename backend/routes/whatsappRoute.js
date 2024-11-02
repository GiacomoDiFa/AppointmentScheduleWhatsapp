const express = require('express');
const router = express.Router();
const fs = require('fs-extra');
const dbFile = '../backend/db.json';

// Funzione per leggere gli utenti dal file
async function readUsers() {
    const data = await fs.readFile(dbFile, 'utf8');
    return JSON.parse(data);
}

// Funzione per definire le route con il client come argomento
module.exports = function(client) {
    router.get('/send-messages/:giorno', async (req, res) => {
        const { giorno } = req.params;
        const usersByDay = await readUsers();

        if (!usersByDay[giorno]) {
            return res.status(404).json({ error: 'Nessun utente trovato per questo giorno' });
        }


        for (let i = 0; i < usersByDay[giorno].length; i++) {
            let obj = usersByDay[giorno][i];
            let number = obj.numero;
            let message = `Ciao, ricordo appuntamento in data ${obj.data} alle ore ${obj.orario}.\n Logopedista Giorgia 🌸`;
            let sanitized_number = number.toString().replace(/[- )(]/g, "");
            let final_number = `39${sanitized_number.substring(sanitized_number.length - 10)}`;

            try {
                let number_details = await client.getNumberId(final_number);
                if (number_details) {
                    await client.sendMessage(number_details._serialized, message);
                } else {
                    console.error(`Numero non registrato su WhatsApp: ${final_number}`);
                }
            } catch (error) {
                console.error("Errore nell'invio del messaggio:", error);
                return res.status(404).json({error: "Errore nell'invio dei messaggi"})
            }
        }
    });

    return router;
};
