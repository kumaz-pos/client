const express=require("express");
const { GetPurchaseOrder,GetPurchaseOrders,UpdatePurchaseOrder,CreatePurchaseOrder,DeletePurchaseOrder } = require("../controllers/purchase-order");
const isAuth = require("../middlewares/auth");

const purchaseOrder= express.Router();

purchaseOrder.use(isAuth)

purchaseOrder.post("/create-po",CreatePurchaseOrder)
purchaseOrder.get("/get-pos",GetPurchaseOrders)
purchaseOrder.get("/get-po/:id",GetPurchaseOrder)
purchaseOrder.patch("/update-po/:id",UpdatePurchaseOrder)
purchaseOrder.delete("/delete-po/:id",DeletePurchaseOrder)


module.exports=purchaseOrder