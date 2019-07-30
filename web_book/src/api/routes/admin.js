const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const multer  = require('multer');

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


router.get('/books', adminController.books); // lấy toàn bộ sách

router.post('/books',  upload.single('image'), adminController.postBooks); // đăng một sách

router.get('/books/:id', adminController.book); // lấy một sách

router.put('/books/:id', upload.single('image'), adminController.putBooks); // sửa một sách

router.delete('/books/:id', adminController.deleteBooks); // xóa một sách

router.get('/books/:id/comment', adminController.Comment); // lấy comment của một cuốn sách



// test danh sach yeu thich
router.get('/:id/wishlist', adminController.Wishlist); // lấy danh sach yeu thich cua user

// test order

router.get('/:id/orders', adminController.Order); // lay order cua user



module.exports = router;