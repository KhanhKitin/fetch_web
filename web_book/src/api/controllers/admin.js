const Book = require("../../../models").Books;
const Catalog = require("../../../models").Catalogs;
const Comment = require("../../../models").Comments;
const User = require("../../../models").Users;
const Role = require("../../../models").Roles;
const Permission = require('../../../models').Permissions;
const PermissionDetail = require('../../../models').PermissionDetails;

// lay toan bo sach
module.exports.getBooks = async (req, res, next) => { 
  try {
    const book = await Book.findAll({
      include: [Catalog],
      raw: true
    });
    res.status(200).json(book);
  }catch(error){
    res.status(500).end(error.message);
  }
  
};

// dang sach
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


// lay ra 1 sach
module.exports.getBook = async (req, res, next) => { 
  try{
    book_id = req.params.id;
    const book = await Book.findByPk(book_id);
    res.status(200).json(book);
  }catch(error){
    res.status(500).end(error.message);
  }
  
};

// sua mot sach
module.exports.putBooks = async (req, res, next) => { 
  try{
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
  }catch(error){
    res.status(500).end(error.message);
  }  
};

// xoa mot sach
module.exports.deleteBooks = async (req, res, next) => { 
  const book_id = req.params.id;
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

// xem info

module.exports.getInfoAdmin = async (req, res, next) => {
  try{
    const user_id = req.params.id;
    const user = await User.findOne({
      where:{
        user_id: user_id
      },
      include: [Role]
    })

    const permisstiondetail = await PermissionDetail.findAll({
      where: {
        role_id: user.role_id
      },
      include: [Permission]
    })
    res.status(200).json({user, permisstiondetail});
  }
  catch(error){
    res.status(500).end(error.message);
  }

}





