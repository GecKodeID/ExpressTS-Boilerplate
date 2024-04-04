import request from 'supertest';
import { Express } from 'express';
import { createServer } from 'http';
import { createApp } from '../../app';

describe('test of user CRUD', () => {
    let app: Express;
    let server: any;

    beforeAll(() => {
        app = createApp();
        server = createServer(app);
    });

    afterAll((done) => {
        server.close(done);
    });

    it('expect 400 return with an message while input is wrong when create', async () => {
        let payload = {}
        let res = await request(app).post('/api/v1/users').send(payload);

        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            message: "missing-username"
        });

        payload = {
            ...payload,
            username: "aaa"
        }
        res = await request(app).post('/api/v1/users').send(payload);

        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            message: "username-not-met-minimum-char"
        });

        payload = {
            ...payload,
            username: "bamasakti"
        }
        res = await request(app).post('/api/v1/users').send(payload);

        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            message: "missing-email"
        });

        payload = {
            ...payload,
            email: "caca"
        }
        res = await request(app).post('/api/v1/users').send(payload);

        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            message: "invalid-email-format"
        });

        payload = {
            ...payload,
            email: "caca@gmail.com"
        }
        res = await request(app).post('/api/v1/users').send(payload);

        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            message: "missing-password"
        });

        payload = {
            ...payload,
            password: "juju"
        }
        res = await request(app).post('/api/v1/users').send(payload);

        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            message: "password-not-met-minimum-char"
        });

        payload = {
            ...payload,
            password: "dadagugu123"
        }
        res = await request(app).post('/api/v1/users').send(payload);

        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            message: "missing-name"
        });

        payload = {
            ...payload,
            name: "aa"
        }
        res = await request(app).post('/api/v1/users').send(payload);

        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            message: "name-not-met-minimum-char"
        });

        payload = {
            ...payload,
            name: "sungkep"
        }
        res = await request(app).post('/api/v1/users').send(payload);

        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            message: "missing-phone-number"
        });

        payload = {
            ...payload,
            phone: "62sb561sss"
        }
        res = await request(app).post('/api/v1/users').send(payload);

        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            message: "invalid-phone-number"
        });

        payload = {
            ...payload,
            phone: "6281155528778"
        }
        res = await request(app).post('/api/v1/users').send(payload);

        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            message: "missing-created-by"
        });

        payload = {
            ...payload,
            created_by: "aabb"
        }
        res = await request(app).post('/api/v1/users').send(payload);

        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            message: "invalid-uuid-format"
        });

    });

    it('expect 400 return with an message while input is wrong when update', async () => {
        let payload = {}
        let update_id = "aaa"
        let res = await request(app).put(`/api/v1/users/${update_id}`).send(payload);

        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            message: "invalid-uuid"
        });

        update_id = "c254c916-fa06-49e5-953b-9bd3ee572d40"
        payload = {
            username: "ab"
        }
        res = await request(app).put(`/api/v1/users/${update_id}`).send(payload);

        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            message: "username-not-met-minimum-char"
        });

        payload = {
            ...payload,
            email: "jaja"
        }
        res = await request(app).put(`/api/v1/users/${update_id}`).send(payload);

        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            message: "invalid-email-format"
        });

        payload = {
            ...payload,
            password: "bubu"
        }
        res = await request(app).put(`/api/v1/users/${update_id}`).send(payload);

        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            message: "password-not-met-minimum-char"
        });

        payload = {
            ...payload,
            name: "bu"
        }
        res = await request(app).put(`/api/v1/users/${update_id}`).send(payload);

        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            message: "name-not-met-minimum-char"
        });

        payload = {
            ...payload,
            phone: "62r5gwe23"
        }
        res = await request(app).put(`/api/v1/users/${update_id}`).send(payload);

        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            message: "invalid-phone-number-format"
        });

        payload = {
            ...payload,
            profile_picture: "babas"
        }
        res = await request(app).put(`/api/v1/users/${update_id}`).send(payload);

        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            message: "invalid-url-format"
        });

        payload = {
            ...payload,
            updated_by: ""
        }
        res = await request(app).put(`/api/v1/users/${update_id}`).send(payload);

        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            message: "missing-updated-by"
        });

        payload = {
            ...payload,
            updated_by: "cucu"
        }
        res = await request(app).put(`/api/v1/users/${update_id}`).send(payload);

        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            message: "invalid-updated-by-format"
        });
    });

    it('expect 400 return with an message while input is wrong when delete', async () => {
        let payload = {}
        let delete_id = "aaa"
        let res = await request(app).delete(`/api/v1/users/${delete_id}`).send(payload);

        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            message: "invalid-uuid"
        });
    });

    it('expect 400 return with an message while input is wrong when get by id', async () => {
        let payload = {}
        let get_id = "aaa"
        let res = await request(app).get(`/api/v1/users/${get_id}`).send(payload);

        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            message: "invalid-uuid"
        });
    });
});