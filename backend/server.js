/* Requirements */
const express = require('express');
const app = express();
const cors = require('cors')
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client();

/* Use */
app.use(express.json());
app.use(cors())

/* Inizialization of the client */
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();


/* Routes */
const userRoute = require('../backend/routes/userRoute')
const whatsappRoute = require('../backend/routes/whatsappRoute')

/* Use of the Routes */
app.use('/api/user', userRoute)
// Passa il client a whatsappRoute
app.use('/api/whatsapp', whatsappRoute(client));


const port = 5000
app.listen(port, () => console.log(`Server is running on port: ${port}`))
