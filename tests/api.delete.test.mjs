import request from 'supertest'
import app from '../app'
import mongoose from 'mongoose';

const DELETE_ID = '6816df89e54935ed3bd9bbec'

describe("Delete products from the Database", ()=>{
    describe("Given User provides userID for product to be deleted",()=>{
        test("DELETE request will provide 200 response on successfull delete", async ()=>{
            const response = await request(app).delete(`/api/products/${DELETE_ID}`).send()
            expect(response.statusCode).toBe(200)
        })
    })
});


afterAll(async () => {
    await mongoose.connection.close(); // or your DB client
  });