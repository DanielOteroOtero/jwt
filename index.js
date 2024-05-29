const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config()

const app = express();



// Capturar Body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());



// Conexión a Base de datos
const uri = "mongodb+srv://login:7HW3Zm2Y2n9RoJtA@cluster0.gfqzkqb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const option = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(uri, option)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))



// Importar Rutas
const authRoutes = require('./routes/auth')
const validaToken = require('./routes/token-valido');
const admin = require('./routes/admin');



// Rutas Middlewares
app.use('/api/user', authRoutes);
app.use('/api/admin', validaToken, admin)
app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'funciona!'
    })
});



// Iniciar Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})