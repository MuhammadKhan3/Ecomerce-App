const express=require('express');
const router=express.Router();
const products=require('../controllers/products');
let upload=require('../middleware/uploadimage');

// upload.single('image'),
router.post('/get-carts',products.getcart);
router.post('/insert-post',products.insertproduct);
router.post('/login',products.login);
router.post('/get-product/:id',products.fetchproduct);
router.get('/get-products',products.fetchproducts);
router.post('/edit-product/:id',products.updateproduct);
router.post('/delete-product/:id',products.deleteproduct);
router.post('/insert-user',products.insertuser)
router.post('/insert-cart',products.insertcart);
router.post('/add-order',products.addorder);
router.post('/get-order',products.getorder);
router.delete('/delete-cart',products.deletecart);
// router.get('/get-post',products.fetchproducts);

module.exports=router;