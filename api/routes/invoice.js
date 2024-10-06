const express=require("express");
const { GetInvoice,GetInvoices,DeleteInvoice,CreateInvoice,UpdateInvoice } = require("../controllers/invoice");
const isAuth = require("../middlewares/auth");

const invoiceRouter= express.Router();

invoiceRouter.use(isAuth)

invoiceRouter.post("/create-invoice",CreateInvoice)
invoiceRouter.get("/get-invoices",GetInvoices)
invoiceRouter.get("/get-invoice/:id",GetInvoice)
invoiceRouter.patch("/update-invoice/:id",UpdateInvoice)
invoiceRouter.delete("/delete-invoice/:id",DeleteInvoice)


module.exports=invoiceRouter