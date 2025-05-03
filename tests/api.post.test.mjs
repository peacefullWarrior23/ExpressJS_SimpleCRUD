import request from 'supertest'
import app from '../app'
import mongoose from 'mongoose'

describe("POST /users", () => {
    describe("Given a product as JSON data", ()=>{
        // Mock data base creations instead of actual inclusion in DB
        
        // test("Post request should have body", async ()=>{
        //     const response = await request(app).post("/api/products").send({
        //          name : 'Bananas',
        //          quantity : 3,
        //          price : 11.4
        //     })
        //     expect(response.statusCode).toBe(200)

        // });


        //Post request body should be JSON

        //Post request body should have name field
    });

    describe("When a product is missing JSON data",() =>{
        test("Post request has empty body ", async ()=>{
            const response = await request(app).post('/api/products').send()
            expect(response.statusCode).toBe(500)
        });

        test("Post request has non-JSON data", async ()=> {
            const response = await request(app).post('/api/products').send("asdf") 
            expect(response.statusCode).toBe(500)
        });
    })
   


})

afterAll(async () => {
    await mongoose.connection.close(); // or your DB client
  });
  