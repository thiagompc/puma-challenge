const axios = require('axios');

const max = 5

let users = []

module.exports = {
  users,
  getUsers: () => new Promise(async (resolve, reject) => {
    try {
      resolve(users)
    }
    catch(e) {
      reject(e)
    }
  }),
  addUser: (req, res) => new Promise(async (resolve, reject) => {
    const { username } = req.body
    try {
      const found = users.some(user => user.username === username);
      if (found) return res.status(400).json({ error: 'O usuário já está na lista' });
      if(users.length < max){
        const response = await axios.get(`https://api.github.com/users/${username}`)
        const newUser = {
          username: response.data.login,
          name: response.data.name,
          avatar: response.data.avatar_url,
          url: response.data.html_url,
          favorite: false
        }
        users.push(newUser)
        resolve(newUser)
      }
      else return res.status(400).json({ error: 'Não é possível adicionar mais de 5 usuários' });
    }
    catch(e) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
  }),
  deleteUser: (req, res) => new Promise(async (resolve, reject) => {
    const { username } = req.params
    try {
      const userIndex = users.findIndex((user) => user.username === username);
      if (userIndex === -1) return res.status(404).json({ error: 'Usuário não encontrado.' });
      users.splice(userIndex, 1);
      resolve(users)
    }
    catch(e) {
      reject(e)
    }
  }),
  starUser: (req, res) => new Promise(async (resolve, reject) => {
    const { username } = req.params
    try {
      const userIndex = users.findIndex((user) => user.username === username);
      if (userIndex === -1) return res.status(404).json({ error: 'Usuário não encontrado.' });
      users.forEach((user) => {
        if (user.username === username) {
            user.favorite = !user.favorite;
        } else {
            user.favorite = false;
        }
    });

      resolve(users)
    }
    catch(e) {
      reject(e)
    }
  }),
}
