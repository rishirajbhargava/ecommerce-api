
const Product = require('../models/Product');
const path = require('path');



// Home page
// route = api/
// method = GET

const homePage = async (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
}








// Get all products
// route = api/products
// method = GET

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        if(products.length === 0){
            res.status(404).json({success: false, message: 'No products found'});
        }else{
            res.json(products);
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({message: 'Server Error'});
    }
}

// Get single product
// route = api/products/:id
// method = GET

const getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findOne({product_id:req.params.id});
        if(!product){
            res.status(404).json({success: false, message: 'Product not found'});
        }else{
            res.json(product);
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({message: 'Server Error'});
    }
}

// Create new product
// route = api/products
// method = POST

const newProduct = async (req, res) => {
    const {product_id, name, price, description} = req.body;

    if(!product_id || !name || !price || !description){
        return res.status(400).json({message: 'Please fill all fields'});
    }

    const product = await Product.findOne({product_id});

    if(product){
        return res.status(400).json({message: 'Product already exists'});
    }

    try {
        const product = await Product.create({
            product_id,
            name,
            price,
            description
        });
        res.json(product);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({message: 'Server Error'});
    }

}

// Update product
// route = api/products/:id
// method = PUT


const updateProduct = async (req, res) => {
    const id = req.params.id;
    const {product_id, name, price, description} = req.body;

    if(!product_id || !name || !price || !description){
        return res.status(400).json({message: 'Please fill all fields'});
    }

    const product = await Product.findOne({product_id: id});
    
    if(!product){
        return res.status(400).json({message: 'Product does not exist'});
    }

    const newProduct = await Product.findOne({product_id});

    if(newProduct){
        return res.status(400).json({message: 'Product already exists with given product id'});
    }

    try {
        const updatedProduct = await Product.findOneAndUpdate({product_id: id}, req.body, {new: true});
        res.json(updatedProduct);
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({message: 'Server Error'});
    }

};





// Delete product
// route = api/products/:id
// method = DELETE



const deleteProduct = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedProduct = await Product.findOneAndDelete({product_id: id});
        if(!deletedProduct){
            res.status(404).json({success: false, message: 'Product not found'});
        }else{
            res.json({success: true, message: 'Product deleted successfully'});
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({message: 'Server Error'});
    }
}


module.exports = {homePage, getProducts, newProduct, getSingleProduct, updateProduct , deleteProduct};