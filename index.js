const mongoose = require('mongoose')
const express = require('express')
const app = express()


app.listen(3000, () => {
    console.log("Express app is now running on port 3000");
});

app.get('/', (req, res) => {
    res.send("Hello from Express API");
});

mongoose.connect("mongodb+srv://mongoDeveloper:UGQlR16CcLdiL9Bc@api-cluster.xgb01zu.mongodb.net/Node-API?retryWrites=true&w=majority&appName=API-Cluster")
.then(()=>{
    console.log("Connected to the DB")
})
.catch(() => {
    console.log("Connection to DB failed")
});