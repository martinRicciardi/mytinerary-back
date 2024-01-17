//importante la logica de los requerimientos, porque el orden es importante, si por ejemplo yo requiero dotenv despues de requerir la db, no va a funcionar, ya que la db necesita de dotenv para agarrar un estado
require("dotenv").config()
const express = require ("express")
const Router = require("./routes/routes")
const cors = require("cors") 
const app = express()
const passport = require('passport')

const PORT = process.env.PORT||4000

require("./config/database")//requeris la conexion a la db (requerir antes que levante la app)

//creas middlewares 
app.use(cors())
app.use(passport.initialize())
app.use(express.json()) //basicamente le decis a la app que las peticiones se manejen en formatos json, es importante para luego utilizar los req en los controladores este middleware 
app.use("/api", Router) // declaras que para utilizar las rutas definidas en el archivo router, primero tengan que pasar por el endopint /api

app.set("port",PORT) //seteas o configura una propiedad a app, en este caso el puerto de la app
app.get("/", (req, res) => {
    res.send("<h1>nkunku sos un perro aguante foden</h1>")
}) //decis que cuando pase por el endpoint "/" (lo lee) envie una respuesta al front 

app.listen(PORT, () => {
    console.log("SERVIDOR CORRIENDO EN PUERTO: " +app.get("port"));//aca le decis que te traiga el puerto que se seteo en lo linea 19
}) //con este metodo le decis a la app que puerto escuchar, y luego una ejecucion