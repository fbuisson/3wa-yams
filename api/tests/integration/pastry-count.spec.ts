
import { authentified } from '../../src/middleware/index'; 
import { authentifiedMock } from '../mocks/authServiceMock'; 
import request from 'supertest';
import express, { Express } from 'express';
import router from '../../src/routes/pastry';
import { readPastries } from "../../src/middleware/data"

jest.mock('../../src/middleware/index', () => ({
    authentified: authentifiedMock,
}));

const app: Express = express();
app.use( readPastries  )
app.use('/api', router);

describe('GET /pastries-count', () => {
    it('responds with the count of pastries for an authenticated user', async () => {
        const numberPastries = 8 ;
        const response = await request(app).get('/api/pastries-count');
        
        expect(response.status).toBe(200);
        expect(response.body).toEqual(numberPastries);
    });
});
