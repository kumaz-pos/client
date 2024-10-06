const express= require('express');

const app = express();
const dotenv= require("dotenv");
const connect = require('./database/connection');

const cors= require('cors');
const managerRoutes = require('./routes/manager');
const productRouter = require('./routes/products');
const orderRouter = require('./routes/order');
const transactionRouter = require('./routes/transaction');
const aggregateRouter = require('./routes/aggregations');
const cartRouter = require('./routes/cart');
const CashierRouter= require('./routes/cashier');
const adminRoutes = require('./routes/admin');
const customerRoutes = require('./routes/customer');
const developerRoutes = require('./routes/developer');
const quotationRouter = require('./routes/quotations');
const invoiceRouter = require('./routes/invoice');
const purchaseOrder = require('./routes/purchase-order');
const expenseRouter = require('./routes/expense');
const bankRouter = require('./routes/bank');
const barcode= require("jsbarcode");
const tillRouter = require('./routes/till');
const salesRouter = require('./routes/sales');
const cloudinary = require('cloudinary').v2;
const compression= require("compression")
const {rateLimit}= require("express-rate-limit");
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

app.use(cors())

app.use(compression())
const limiter= rateLimit({
  windowMs:15*60*1000,
  limit:100,
  standardHeaders:"draft-7",
  legacyHeaders:false
})
app.use(limiter)


app.use(express.json());


 app.use("/api/v1/admin/",adminRoutes);
 app.use("/api/v1/manager/",managerRoutes);
 app.use("/api/v1/developer/",developerRoutes);
 app.use("/api/v1/customer/",customerRoutes);
 app.use("/api/v1/cashier/",CashierRouter);
 app.use("/api/v1/product/",productRouter);
 app.use("/api/v1/till/",tillRouter);
 app.use("/api/v1/sale/",salesRouter);
 app.use("/api/v1/cart/",cartRouter);
 app.use("/api/v1/order/",orderRouter);
 app.use("/api/v1/quotation/",quotationRouter);
 app.use("/api/v1/invoice/",invoiceRouter);
 app.use("/api/v1/po/",purchaseOrder);
 app.use("/api/v1/bank/",bankRouter); 
 app.use("/api/v1/expense/",expenseRouter);
app.use("/api/v1/transaction/",transactionRouter);
app.use("/api/v1/statistics/",aggregateRouter)
const start= async()=>{
  try {
    connect(process.env.MONGODB_URI);
      //Start the Server
app.listen(4000,(req,res)=>{


  console.log(`Server is Running at Server ${process.env.PORT} connected to the db`)
  })
  
  } catch (error) {
     throw error
  }
}
module.exports=start