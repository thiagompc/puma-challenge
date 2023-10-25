const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const routes = require("./routes")

const app = express()

require('dotenv').config();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

app.get("/", (req, res) => {
  res.json({ message: "PUMA Challenge" })
})

// require("./routes")(app)
app.use("/", [routes])

app.listen(process.env.BACKEND_PORT, () => {
  console.log("Server is running on port " + process.env.BACKEND_PORT)
})