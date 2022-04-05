import app from './app';
const { sequelize } = require('./models/index'); 
const express = require('express');
// import  { sequelize }  from './models/index';

// Setting

const PORT = process.env.PORT || 3000;

// Arrancamos el servidor
app.listen(PORT, function () {
    console.log(`La app ha arrancado en http://localhost:${PORT}`);

    sequelize.authenticate().then(() => {
        console.log("Se ha establecido la conexión");
    })
});

// Middleware
// Para poder rellenar el req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




