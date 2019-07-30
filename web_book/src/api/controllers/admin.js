const Book = require("../../../models").Books;
const Catalog = require("../../../models").Catalogs;
const Comment = require("../../../models").Comments;
const Love = require("../../../models").Loves;
const User = require("../../../models").Users;
const Order = require("../../../models").Orders;
const OrderDetail = require("../../../models").OrderDetails;


module.exports.books = async (req, res, next) => {
  // lay toan bo sach
  const book = await Book.findAll({
    include: [Catalog],
    raw: true
  });
  // console.log(book);
  // console.log(book[1].updatedAt);
  res.status(200).json(book);
};

module.exports.postBooks = (req, res, next) => {
  // dang sach
  const {
    catalog_id,
    book_name,
    author,
    price,
    description,
    quantity
  } = req.body;
  const book_image = req.file.path.split("\\").join("/");
  console.log(book_image);
  Book.create({
    catalog_id: catalog_id,
    book_name: book_name,
    author: author,
    price: price,
    description: description,
    quantity: quantity,
    image: book_image
  })
    .then(book => res.status(201).send(book))
    .catch(error => res.status(400).send(error));
};

module.exports.book = async (req, res, next) => {
  // lay ra 1 sach
  book_id = req.params.id;
  const book = await Book.findByPk(book_id);
  res.status(200).json(book);
};

module.exports.putBooks = async (req, res, next) => {
  // sua mot sach
  book_id = req.params.id;
  const book = await Book.findByPk(book_id);
  if (!book) {
    res.status(201).json({ message: "sach khong ton tai" });
    return;
  } else {
    book.update({
      catalog_id: req.body.catalog_id,
      book_name: req.body.book_name,
      author: req.body.book_author,
      price: req.body.price,
      description: req.body.description,
      quantity: req.body.quantity,
      image: req.file.path.split("\\").join("/")
    });
  }
  res.status(201).json({ message: "cap nhat sach thanh cong" });
};

module.exports.deleteBooks = async (req, res, next) => {
  // xoa mot sach
  book_id = req.params.id;
  const book = await Book.findByPk(book_id);
  if (!book) {
    res.status(200).json({ message: "khong tim thay sach de xoa" });
  }
  book.destroy({
    where: {
      book_id: book_id
    }
  });
  res.status(200).json({ message: "Xoa thanh cong" });
};

module.exports.Comment = (req, res, next) => {
  Comment.findAll({
    where: { book_id: req.params.id },
    raw: true
  }).then(comments => res.json(comments));
};

// test wisjlist
module.exports.Wishlist = (req, res, next) => {
  Love.findAll({
    where: { user_id: req.params.id },
    include: [Book, User]
  }).then(loveBook => res.json(loveBook));
}

// test order
module.exports.Order = (req,res, next) => {
  Order.findAll({
    where: { user_id: req.params.id },
    include: [OrderDetail, Book]
  }).then(order => res.json(order));
}
