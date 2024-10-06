const express=require("express");
const { GetBank,GetBanks,DeleteBank,CreateBank,UpdateBank } = require("../controllers/bank");
const isAuth = require("../middlewares/auth");

const bankRouter= express.Router();

bankRouter.get("/get-banks",isAuth,GetBanks)
bankRouter.get("/get-bank/:id",isAuth,GetBank)

bankRouter.post("/create-bank",isAuth,CreateBank)

bankRouter.patch("/update-bank/:id",isAuth,UpdateBank)
bankRouter.delete("/delete-bank/:id",isAuth,DeleteBank)


module.exports=bankRouter