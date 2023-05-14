const express = require('express');
const router = express.Router();

const {getProducts, newProduct, getSingleProduct , updateProduct, deleteProduct} = require('../controllers/productControllers');

router.route('/products').get(getProducts).post(newProduct);
router.route('/products/:id').get(getSingleProduct).put(updateProduct).delete(deleteProduct);




module.exports = router;
