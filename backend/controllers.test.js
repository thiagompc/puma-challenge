const axios = require('axios');
const { users } = require('./controller');
const { app } = require('./index');

describe('POST /users', () => {
    it('should add a new user to users array if a valid username is provided', async () => {
        const response = await axios.post('http://localhost:5000/users', { username: 'thiagompc' });
        expect(response.status).toBe(201);
        expect(response.data.username).toBe('thiagompc');
        expect(response.data.starred).toBe(false);
    });

    it('should return an error warning that the username provided already exists in users array', async () => {
        users.push({ username: 'thiagompc', starred: false });

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

        users.push({ username, starred: false });

        const response = await axios.delete(`http://localhost:5000/users/${username}`);
        expect(response.status).toBe(204);
        expect(favoriteUsers.length).toBe(0);
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
        favoriteUsers.push(
            { username: 'thiagompc', starred: true },
            { username: 'juju', starred: false },
            { username: 'daniel', starred: false }
        );

        const username = 'sehun';
        const response = await axios.patch(`http://localhost:5000/users/${username}/toggle-star`);

        expect(response.status).toBe(204);
        const updatedUser = users.find(user => user.username === username);
        expect(updatedUser.facorite).toBe(false);
        users.forEach(user => {
            if (user.username !== username) {
                expect(user.facorite).toBe(false);
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