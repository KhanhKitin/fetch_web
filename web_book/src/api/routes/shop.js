const express = require('express');
const router = express.Router();
const shopController = require("../controllers/shop");


/*
    - xem sách theo từng trang 
    - tìm kiếm sách 
    - sắp xếp sách
    - xem chi tiết một sách
    - xem toàn bộ nhận xét của một cuốn sách
*/


router.get('/books', shopController.getBooks); // lấy sách theo từng trang

router.get('/books/search', shopController.searchBook); // tìm kiếm sách 

router.get('/list-books', shopController.sortBooks); // sắp xếp sách

router.get('/books/:id', shopController.getBook); // lấy một sách

router.get('/books/:id/comment', shopController.getComment); // lấy toàn bộ nhận xét của một sách




module.exports = router;