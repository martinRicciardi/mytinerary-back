require("dotenv").config()
const express = require ("express")
const Router = require("./routes/routes")
const cors = require("cors") 
const app = express()
const passport = require('passport')

const PORT = process.env.PORT||4000

require("./config/database")

app.use(cors())
app.use(passport.initialize())
app.use(express.json())
app.use("/api", Router)
app.set("port",PORT)
app.get("/", (req, res) => {
    res.send("<h1>nkunku sos un perro aguante foden</h1>")
})

app.listen(PORT, () => {
    console.log("SERVIDOR CORRIENDO EN PUERTO: " +app.get("port"));
})