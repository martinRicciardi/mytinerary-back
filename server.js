require("dotenv").config()
const express = require ("express")
const Router = require("./routes/routes")
const cors = require("cors") 
const app = express()
const passport = require('passport')

const PORT = process.env.PORT||4000

require("./config/database")

//creas middlewares 
app.use(cors())
app.use(passport.initialize())
app.use(express.json()) //basicamente le decis a la app que las peticiones se manejen en formatos json, es importante para luego utilizar los req en los controladores este middleware 
app.use("/api", Router) // declaras que para utilizar las rutas definidas en el archivo router, primero tengan que pasar por el endopint /api

app.set("port",PORT) //seteas el puerto de la app
app.get("/", (req, res) => {
    res.send("<h1>nkunku sos un perro aguante foden</h1>")
}) //decis que cuando pase por el endpoint / envie una respuesta al front 

app.listen(PORT, () => {
    console.log("SERVIDOR CORRIENDO EN PUERTO: " +app.get("port"));
}) //con este metodo le decis a la app que puerto escuchar, y luego una ejecucion