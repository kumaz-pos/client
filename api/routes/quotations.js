const express=require("express");
const { GetQuotation,GetQuotations,DeleteQuotation,CreateQuotation,UpdateQuotation } = require("../controllers/quotation");
const isAuth = require("../middlewares/auth");

const quotationRouter= express.Router();

quotationRouter.get("/get-quotation/:id",GetQuotation)

quotationRouter.use(isAuth)
quotationRouter.post("/create-quotation",CreateQuotation)
quotationRouter.get("/get-quotations",GetQuotations)

quotationRouter.patch("/update-quotation/:id",UpdateQuotation)
quotationRouter.delete("/delete-quotation/:id",DeleteQuotation)


module.exports=quotationRouter