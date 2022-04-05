const express = require('express');
import morgan from 'morgan';
import pkg from '../package.json'

import ofertasRoutes from "./routes/ofertas.routes"
//Rutas 
//CONFIGURO EXPRESS
const app = express();

app.set('pkg',pkg)

app.use(morgan('dev')); //Para mostrar las peticiones por consola

app.get('/',(req,res) =>{
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
})

// Rutas
app.use("/ofertas",ofertasRoutes)
app.use(require('./routes/routes'));
export default app;