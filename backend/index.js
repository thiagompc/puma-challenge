const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const routes = require("./routes")

const app = express()
const port = 5000

require('dotenv').config();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

app.get("/", (req, res) => {
  res.json({ message: "PServerUMA Challenge" })
})

// require("./routes")(app)
app.use("/", [routes])

server = app.listen(port, () => {
  console.log("Server is running on port " + port)
})

module.exports = {
  server
};