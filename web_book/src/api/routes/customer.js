const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer');

/*
    - xem danh sách yêu thích 
    - xem order 
    - tạo order
    - xem sách trong giỏ hàng
    - xóa sách trong giỏ hàng
*/


router.get('/:id/wishlist', customerController.getWishlist); // lấy danh yêu thích của user

router.get('/:id/orders', customerController.getOrder); // lấy order của user

router.post('/:id/orders', customerController.postOrder) // tạo order của user

router.get('/:id/cart', customerController.getCart); // lấy cart của một user

router.post('/:id/cart', customerController.postCart); // tạo cart của một user 

router.put('/:id/cart-edit-books/:bookId', customerController.putCartEditBook); // sửa sách trong giỏ hàng của một user

router.delete('/:id/cart-delete-books/:bookId', customerController.deleteCartDeleteBook);// xóa sách trong giỏ hàng của một user

module.exports = router;