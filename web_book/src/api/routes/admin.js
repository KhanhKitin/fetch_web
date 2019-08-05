const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const multer  = require('multer');
const { check } = require("express-validator");

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}
const upload = multer({storage: fileStorage, fileFilter: fileFilter})

/*
 - lấy toàn bộ sách
 - đăng một sách
 - sửa một sách
 - xóa một sách
*/

router.get('/books', adminController.getBooks); // lấy toàn bộ sách

router.post('/books',  upload.single('image'), adminController.postBooks); // đăng một sách

router.get('/books/:id', adminController.getBook); // lấy một sách

router.put('/books/:id', upload.single('image'), adminController.putBooks); // sửa một sách

router.delete('/books/:id', adminController.deleteBooks); // xóa một sách

router.get('/:id', adminController.getInfoAdmin); // xem info 






module.exports = router;