const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./src/database/connection");
const routerCustomer = require('./src/api/routes/customer');
const routerAdmin = require('./src/api/routes/admin');
const routerAuth = require('./src/api/routes/auth');
const routerShop = require('./src/api/routes/shop');



const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

connection
  .sync()
  .then(() => {

    console.log("Connection has been established successfully.");

    app.use('/admin', routerAdmin);
    app.use('/shop', routerShop);
    app.use('/customer', routerCustomer);
    app.use(routerAuth);

    app.listen(3000, err => {
      if (err) {
        console.log(err);
      }
      console.log("app listening on port 3000");
    });
    
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });
