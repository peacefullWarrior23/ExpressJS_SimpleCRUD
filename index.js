const mongoose = require('mongoose')
const express = require('express')
const Product = require('./models/product.model.js')
const app = express()
const ProductRoute = require('./routes/product.route.js')
const port = process.env.PORT || 3000;

//Add support for API middlewares to work with JSON and  url encoded inputs
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/api/products', ProductRoute)

mongoose.connect("mongodb+srv://mongoDeveloper:5uoQwXkk2PC5CaAx@api-cluster.xgb01zu.mongodb.net/Node-API?retryWrites=true&w=majority&appName=API-Cluster")
.then(()=>{
    console.log("Connected to the DB")
})
.catch(() => {
    console.log("Connection to DB failed")
});

app.listen(port, () => {
    console.log("Express app is now running on port 3000");
});

app.get('/', (req, res) => {
    res.send("Hello from Express API");
});
