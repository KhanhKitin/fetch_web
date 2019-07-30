const Book = require("../../../models").Books;
const Catalog = require("../../../models").Catalogs;

module.exports.books = async (req, res, next) => { //  lay toan bo sach
  const book = await Book.findAll({
    include: [Catalog],
    raw: true
  });
  // console.log(book);
  // console.log(book[1].updatedAt);
  res.status(200).json(book);
};

module.exports.book = async (req, res, next) => { // lay ra 1 sach
  book_id = req.params.id;
  const book = await Book.findByPk(book_id);
  res.status(200).json(book);
};


