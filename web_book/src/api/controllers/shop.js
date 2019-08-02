const Book = require("../../../models").Books;
const Catalog = require("../../../models").Catalogs;
const User = require("../../../models").Users;
const Comment = require("../../../models").Comments;

// module.exports.books = async (req, res, next) => { //  lấy toàn bộ sách
//   const book = await Book.findAll({
//     include: [Catalog],
//     raw: true
//   });
//   res.status(200).json(book);
// };


//  lấy sách ra theo từng trang
module.exports.getBooks = async (req, res, next) => { 
  try {
    const { pageNumber, pageSize } = req.query;
    const book = await Book.findAll({ offset: Number(pageSize*(pageNumber-1)), limit: Number(pageSize) });
    res.status(200).json(book);
  } catch(error){
    res.status(500).end(error.message);
  }
};

// lấy ra 1 sách
module.exports.getBook = async (req, res, next) => { 
  try {
    book_id = req.params.id;
    const book = await Book.findByPk(book_id);
    res.status(200).json(book);
  } catch(err){
    res.status(500).end(error.message);
  }
};



// lấy tất cả các nhận xết của một cuốn sách
module.exports.getComment = (req, res, next) => { 
  Comment.findAll({
    where: { book_id: req.params.id },
    include: [Book, User],
    raw: true
  }).then(comments => res.json(comments));
};



// tìm kiếm sách
module.exports.searchBook = async (req, res, next) => { 
  try{
    const { book_name } = req.query;
    const book = await Book.findAll({
      where:{
        book_name: book_name
      }
    })
    if(!book){
      res.status(200).json({message: 'khong tim thay sach'});
      return
    }
    else{
      res.status(200).json(book);
    }
  }catch(error){
    res.status(500).end(error.message);
  }
}


 // sắp xếp sách
module.exports.sortBooks = async (req, res, next) => {
  function comparePrice(a, b) { // sắp xếp theo giá 
    const priceA = a.price
    const priceB = b.price
    let comparison = 0;
    if (priceA > priceB) {
      comparison = 1;
    } else if (priceA < priceB) {
      comparison = -1;
    }
    return comparison;
  }
  function compareName(a, b) { // sắp xếp theo tên 
    const book_nameA = a.book_name.toUpperCase();
    const book_nameB = b.book_name.toUpperCase();
    let comparison = 0;
    if (book_nameA > book_nameB) {
      comparison = 1;
    } else if (book_nameA < book_nameB) {
      comparison = -1;
    }
    return comparison;
  }
  try{
    const books = await Book.findAll();
    const { sortby } = req.query;
    if(sortby === 'price'){
      books.sort(comparePrice);
    }  
    else if(sortby === 'name'){
      books.sort(compareName);
    }
    res.status(200).json(books);
  }catch(error){
    res.status(500).end(error.message);
  }
}

