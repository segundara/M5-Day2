const express = require("express") // import express from 'express'
const studentsRoutes = require("./services/students")
const cors = require("cors")

const server = express()

server.use(cors())

server.use(express.json()) // parse the bodies when they are in json format

server.use("/students", studentsRoutes)

server.listen(3002, () => {
  console.log("Server is running on port 3002")
})
