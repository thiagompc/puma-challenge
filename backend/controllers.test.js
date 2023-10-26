const axios = require('axios');
const { users } = require('./controller');
const { server } = require('./index');

describe('POST /users', () => {
    it('should add a new user to users array if a valid username is provided', async () => {
        const response = await axios.post('http://localhost:5000/users', { username: 'thiagompc' });
        expect(response.status).toBe(200);
        expect(response.data.username).toBe('thiagompc');
        expect(response.data.favorite).toBe(false);
    });

    it('should return an error warning that the username provided already exists in users array', async () => {
        users.push({ username: 'thiagompc', favorite: false });

        try {
            const response = await axios.post('http://localhost:5000/users', { username: 'thiagompc' });
            expect(response.status).toBe(400);
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data.error).toBe('O usuário já está na lista');
        }
    });

    describe('GET /users', () => {

        it('should return the users array', async () => {
            const source = axios.CancelToken.source()
            const response = await axios.get('http://localhost:5000/users', { cancelToken: source.token });
            expect(response.status).toBe(200);
            source.cancel('Test completed');
        });
    });
});

describe('DELETE /users/:username', () => {
    beforeEach(() => {
        users.splice(0, users.length);
    });

    it('should remove the user from users list when a username that is on the list is provided', async () => {
        const username = 'thiagompc';

        users.push({ username, favorite: false });

        const response = await axios.delete(`http://localhost:5000/users/${username}`);
        expect(response.status).toBe(200);
        expect(users.length).toBe(0);
    });

    it('should return an error when deleting a non existing user', async () => {
        const notValidUser = 'notValidUser';

        try {
            await axios.delete(`http://localhost:5000/users/${notValidUser}`);
        } catch (error) {
            expect(error.response.status).toBe(404);
            expect(error.response.data.error).toBe('Usuário não encontrado.');
        }
    });
});

describe('PATCH /users/:username/toggle-star', () => {
    beforeEach(() => {
        users.length = 0;
    });

    afterAll((done) => {
        server.close(() => {
            console.log('Server closed');
            done();
        });
    });

    it('should toggle the favorite property of the user and set all other users as false', async () => {
        users.push(
            { username: 'thiagompc', favorite: true },
            { username: 'juju', favorite: false },
            { username: 'daniel', favorite: false }
        );

        const username = 'thiagompc';
        const response = await axios.patch(`http://localhost:5000/users/${username}/toggle-star`);

        expect(response.status).toBe(200);
        const updatedUser = users.find(user => user.username === username);
        expect(updatedUser.favorite).toBe(false);
        users.forEach(user => {
            if (user.username !== username) {
                expect(user.favorite).toBe(false);
            }
        });
    });

    it('should return 404 if the specified user is not found', async () => {
        const username = 'nonexistent';
        try {
            await axios.patch(`http://localhost:5000/users/${username}/toggle-star`);
        } catch (error) {
            expect(error.response.status).toBe(404);
        }
    });
});


afterAll((done) => {
    server.close(() => {
        console.log('Server closed');
        done();
    });
});