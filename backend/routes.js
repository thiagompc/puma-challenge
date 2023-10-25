const express = require('express');
const routes = express.Router();
const userController = require("./controller");

routes.get('/users', (req, res) => {
  userController.getUsers().then((response) => {
    res.status(200).json(response)
  })
});

routes.post('/users', (req, res) => {
  userController.addUser(req, res).then((response) => {
    res.status(200).json(response)
  })
})

routes.delete('/users/:username', (req, res) => {
  userController.deleteUser(req, res).then((response) => {
    res.status(200).json(response)
  })
})

routes.patch('/users/:username/toggle-star', (req, res) => {
  userController.starUser(req, res).then((response) => {
    res.status(200).json(response)
  })
})

module.exports = routes;