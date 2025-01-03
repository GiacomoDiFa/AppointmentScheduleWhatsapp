/* Requirements */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const client = new Client();

/* Use */
app.use(express.json());
app.use(bodyParser.json({ limit: '10mb' }));  // Aumenta il limite a 10MB (puoi modificarlo come preferisci)
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());

let latestQrCode = null;  // Variabile per memorizzare il QR code più recente
let isClientReady = false; // Variabile per tenere traccia dello stato del client

// Event listener per generare il QR code e salvarlo in latestQrCode
client.on('qr', async qr => {
    try {
        latestQrCode = await qrcode.toDataURL(qr);  // Genera il QR code come Data URL
    } catch (err) {
        console.error('Errore generazione QR code:', err);
    }
});

// Imposta isClientReady su true quando il client è pronto
client.on('ready', async () => {
    console.log('Client is ready!');
    isClientReady = true;


});

client.on('disconnected', () => {
    console.log('Client is disconnetted!');
    isClientReady = false;
})


client.initialize();


// Route per ottenere il QR code come immagine
app.get('/qr', (req, res) => {
    if (latestQrCode) {
        res.send(`${latestQrCode}`);
    } else {
        res.status(404).send('QR Code non disponibile');
    }
});

// Route per verificare se il client è pronto
app.get('/client-status', (req, res) => {
    res.json({ ready: isClientReady });
});

app.get('/client-contacts', async (req, res) => {
    if (isClientReady) {
        const contacts = await client.getContacts();
        
        // Filtra i contatti: solo quelli che non sono gruppi e che hanno il campo 'name'
        const filteredContacts = contacts.filter(contact => !contact.isGroup && contact.name);
        
        res.send(filteredContacts);
    } else {
        res.status(404).send('Contatti non disponibili');
    }
});

/* Routes */
const userRoute = require('../backend/routes/userRoute');
const whatsappRoute = require('../backend/routes/whatsappRoute');
const contactRoute = require('../backend/routes/contactRoute');

/* Use of the Routes */
app.use('/api/user', userRoute);
app.use('/api/contact', contactRoute);
app.use('/api/whatsapp', whatsappRoute(client));

const port = 5000;
app.listen(port, () => console.log(`Server is running on port: ${port}`));
