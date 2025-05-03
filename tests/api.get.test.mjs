import request from 'supertest'
import app from '../app'
import mongoose from 'mongoose'

describe("Get /api/products", () => {
    test("Get request should return 200 status", async ()=>{
        const response = await request(app).get('/api/products').send({})
        expect(response.statusCode).toBe(200)

    });

    test("Get response should be JSON", async ()=>{
        const response = await request(app).get('/api/products').send({})
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

})


afterAll(async () => {
    await mongoose.connection.close(); // or your DB client
  });
  