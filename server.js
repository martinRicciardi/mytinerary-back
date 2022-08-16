require("dotenv").config()
const express = require ("express")
const Router = require("./routes/routes")
const cors = require("cors") 
const app = express()
const passport = require('passport')
const path = require('path')


const PORT = process.env.PORT||4000

require("./config/database")


app.use(cors())
app.use(passport.initialize())
app.use(express.json())
app.use("/api", Router)

app.set("port",PORT)

app.use(express.static(path.join(__dirname, "/client/build")));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});
app.get("/", (req, res) => {
    res.send("SERVIDOR CREADO!")
})

app.listen(PORT, () => {
    console.log("SERVIDOR CORRIENDO EN PUERTO: " +app.get("port"));
})