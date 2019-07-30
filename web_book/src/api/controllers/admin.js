const Book = require("../../../models").Books;
const Catalog = require("../../../models").Catalogs;

module.exports.books = async (req, res, next) => {
  const book = await Book.findAll({
    include: [Catalog],
    raw: true
  });
  console.log(book);
  console.log(book[1].updatedAt);



  res.status(200).json(book);
};

module.exports.postBooks = (req, res, next) => {
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
