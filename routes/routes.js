const express = require('express');
const router = express.Router();

const {homePage,getProducts, newProduct, getSingleProduct , updateProduct, deleteProduct} = require('../controllers/productControllers');
router.route('/').get(homePage);
router.route('/products').get(getProducts).post(newProduct);
router.route('/products/:id').get(getSingleProduct).put(updateProduct).delete(deleteProduct);




module.exports = router;
