const express=require("express");
const { GetExpenses,GetExpense,DeleteExpense,CreateExpense,UpdateExpense } = require("../controllers/expense");
const isAuth = require("../middlewares/auth");

const expenseRouter= express.Router();

expenseRouter.use(isAuth)

expenseRouter.post("/create-expense",CreateExpense)
expenseRouter.get("/get-expenses",GetExpenses)
expenseRouter.get("/get-expense/:id",GetExpense)
expenseRouter.patch("/update-expense/:id",UpdateExpense)
expenseRouter.delete("/delete-expense/:id",DeleteExpense)


module.exports=expenseRouter