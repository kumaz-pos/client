const express= require("express");
const multer=require("multer")
const { GetProducts, GetProduct, CreateProduct, DeleteProduct, UpdateProduct, AddToCart, GetCart } = require("../controllers/products");
const isAuth = require("../middlewares/auth");
//const upload = require('../utils/multer-config');
const upload= multer({dest:"uploads/"})

const productRouter= express.Router();

productRouter.get("/get-products",GetProducts)
productRouter.get("/get-product/:id",GetProduct)
productRouter.use(isAuth)
productRouter.post("/create-product",upload.any("images"),CreateProduct)
productRouter.patch("/update-product/:id",upload.any("images"),UpdateProduct)
productRouter.delete("/delete-product/:id",DeleteProduct)


module.exports= productRouter;
