# puma-challenge

Esse aplicativo se divide em duas partes: 
* um sistema de servidor e 
* uma interface de usuário. 

O backend lida com a comunicação com a API do GitHub (localizada em https://api.github.com).

Por sua vez, o frontend é a parte da aplicação que os usuários utilizam diretamente. Ela oferece uma experiência visual para que os usuários possam gerenciar uma lista de seus usuários favoritos do GitHub.

## Uso
Clone o repositório do projeto:
``` shell
git clone https://github.com/thiagompc/puma-challenge.git
```

### Frontend
Navegue até a pasta do frontend:
``` shell
puma-challenge/frontend
```
Instale as dependências do projeto:
``` shell
npm install
```
Inicie a aplicação:
``` shell
npm start
```

### Backend
 Navegue até a pasta do backend:
``` shell
puma-challenge/backend
```

Instale as dependências do projeto:
``` shell
npm install
```

Inicie o servidor:
``` shell
node index.js
```

### Testes
Navegue até a pasta do backend:
``` shell
puma-challenge/backend
```

Instale as dependências do projeto:
``` shell
npm install
```

Rode os testes:
``` shell
npx jest
```