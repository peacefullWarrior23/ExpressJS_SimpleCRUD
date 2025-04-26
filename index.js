const mongoose = require('mongoose')
const express = require('express')
const Product = require('./models/product.model.js')
const app = express()
//Add support for API middlewares to work with JSON and  url encoded inputs
app.use(express.json())
app.use(express.urlencoded({extended : false}))



mongoose.connect("mongodb+srv://mongoDeveloper:UGQlR16CcLdiL9Bc@api-cluster.xgb01zu.mongodb.net/Node-API?retryWrites=true&w=majority&appName=API-Cluster")
.then(()=>{
    console.log("Connected to the DB")
})
.catch(() => {
    console.log("Connection to DB failed")
});

app.listen(3000, () => {
    console.log("Express app is now running on port 3000");
});

app.get('/', (req, res) => {
    res.send("Hello from Express API");
});

app.get('/api/products', async(req,res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({'message': error.message})
    }
})

app.get('/api/product/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({'message': error.message})
    }
})

app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({'message':error.message})
    }
});

app.put('/api/product/:id', async (req, res) => {
    try {
        console.log('Inside the put api products api')
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)

        if(!product){
           return res.status(404).json({message: 'Product not found'})
        } 
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.delete('/api/product/:id', async (req,res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({message: 'Product not found'})
         } 
         res.status(200).json({message: 'Product was deleted'})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})