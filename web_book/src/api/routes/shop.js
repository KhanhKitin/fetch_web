const express = require('express');
const router = express.Router();
const shopController = require("../controllers/shop");

router.get('/books', shopController.books); // lấy toàn bộ sách

router.get('/books/:id', shopController.book); // lấy một sách

router.get('/carts') // lấy giỏ hàng

router.post('/carts'); // tao giỏ hàng

router.get('/orders'); 

router.post('/orders');





module.exports = router;