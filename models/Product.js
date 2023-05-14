const mongoose = require('mongoose');



const productSchema = new mongoose.Schema({

    // using custom id instead of default _id
    //product_id is unique for each product

     product_id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0.0
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model('Product', productSchema);