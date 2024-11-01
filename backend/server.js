/* Requirements */
const express = require('express');
const app = express();
const cors = require('cors')

/* Use */
app.use(express.json());
app.use(cors())


/* Routes */
const userRoute = require('../backend/routes/userRoute')


/* Use of the Routes */
app.use('/api/user', userRoute)


const port = 5000
app.listen(port, () => console.log(`Server is running on port: ${port}`))
