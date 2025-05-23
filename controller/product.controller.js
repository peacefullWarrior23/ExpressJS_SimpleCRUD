const Product = require('../models/product.model.js')

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({'message': error.message})
    }
};

const getProduct = async (req,res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({'message': error.message})
    }
};

const addProduct = async (req,res) => {
    try {
        const body = req.body
        if(!body){
            return res.status(400).json("Bad input product data")
        }
        const contentType = req.headers['content-type']
        console.log(`Content type for post : ${contentType}`)
        if(!contentType || !contentType.includes('json')){
            return res.status(415).json("Bad input data format")
        }
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
};

const updateProduct =  async (req, res) => {
    try {
        console.log("Inside the product controller updateProduct function")
        const {id} = req.params;
        const product  = await Product.findByIdAndUpdate(id, req.body);
        if (!product){
            return res.status(404).json({message: 'Product not found'})
        }
        const updatedProduct = await Product.findById(id);
        console.log(updatedProduct)
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
};

const deleteProduct = async (req,res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        if (!product){
           return res.status(404).json({message: 'Product not found'})
        }
        res.status(200).json({message: 'Product was deleted'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

module.exports = {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
};