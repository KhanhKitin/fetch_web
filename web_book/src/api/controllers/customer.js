const Sequelize = require("sequelize");

const Love = require("../../../models").Loves;
const Order = require("../../../models").Orders;
const OrderDetail = require("../../../models").OrderDetails;
const Book = require("../../../models").Books;
const User = require("../../../models").Users;
const Cart = require("../../../models").Carts;
const CartDetail = require("../../../models").CartDetails;
const Op = Sequelize.Op;

// lấy danh sach yeu thich cua user
module.exports.getWishlist = (req, res, next) => {
  Love.findAll({
    where: { user_id: req.params.id },
    include: [Book, User]
  }).then(loveBook => res.json(loveBook));
};

// lấy danh sách order cua user
module.exports.getOrder = (req, res, next) => {
  Order.findAll({
    where: { user_id: req.params.id },
    include: [OrderDetail, Book]
  }).then(order => res.json(order));
};

// tạo order cho user
module.exports.postOrder = async (req, res, next) => {
  const user_id = req.params.id;
  let total = 0;
  req.body.map(x => {
    total += x.amount;
  });
  order = await Order.create({
    user_id: user_id,
    total_amount: total,
    date_create: Date.now(),
    status: 1
  });
  req.body.map(x => {
    OrderDetail.create({
      order_id: order.order_id,
      book_id: x.book_id,
      quantity: x.quantity,
      amount: x.amount
    });
  });
  res.status(201).json(order);
};

// lấy giỏ hàng của user
module.exports.getCart = (req, res, next) => {
  Cart.findAll({
    where: { user_id: req.params.id },
    include: [CartDetail, Book]
  }).then(cart => res.json(cart));
};

// tạo giỏ hàng của user
module.exports.postCart = async (req, res, next) => {
  const user_id = req.params.id;
  let total = 0;
  req.body.map(x => {
    total += x.amount;
  });
  cart = await Cart.create({
    user_id: user_id,
    total_amount: total,
    date_create: Date.now()
  });
  req.body.map(x => {
    CartDetail.create({
      cart_id: cart.cart_id,
      book_id: x.book_id,
      quantity: x.quantity,
      amount: x.amount
    });
  });
  res.status(201).json(cart);
};

module.exports.putCartEditBook = async (req, res, next) => {
  try{
    
  }catch(error){
    res.status(500).end(error.message);
  }

};

// xóa một sách trong giỏ hàng
module.exports.deleteCartDeleteBook = async (req, res, next) => {
  try{
    const user_id = req.params.id;
    const book_id = req.params.bookId;
    let total = 0;
    // tìm giỏ hàng của user
    const cart = await Cart.findOne({
      where: {
        user_id: user_id
      },
      include: [CartDetail]
    });
    // vào giỏ hàng của user xóa sách
    await CartDetail.destroy({
      where: {
        [Op.and]: { cart_id: cart.cart_id, book_id: book_id }
      }
    });
    // giỏ hàng chứa sách của user sau khi xóa
    const mang = await CartDetail.findAll({
      where: {
        cart_id: cart.cart_id
      }
    });
    // tính lại tổng tiền
    mang.map(x => {
      total += x.amount;
    });
    // cập nhật tổng tiền vào giỏ hàng cho user
    cart.update({
        total_amount: total
      },
      {
        where: {
          user_id: user_id
        }
      }
    );
  }catch(error){
    res.status(500).end(error.message);
  }

  res.status(200).json({message: 'xóa sách thành công'});
};
