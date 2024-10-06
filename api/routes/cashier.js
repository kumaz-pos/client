const  express= require('express');

const isAuth = require('../middlewares/auth');
const { CashierSignIn,CashierSignUp,EditCashierPassword,GetCashiers,DeleteCashier,EditCashierProfile } = require('../controllers/cashier');
const { GetTillOperatorSales } = require('../controllers/Sales');


const CashierRoute= express.Router();

CashierRoute.post("/signup",isAuth,CashierSignUp)
CashierRoute.post("/signin",CashierSignIn);
CashierRoute.get("/till-operator-sales",isAuth,GetTillOperatorSales);
CashierRoute.get("/get-cashiers",isAuth,GetCashiers);
CashierRoute.get("/get-cashier/:id",isAuth,GetCashiers);
CashierRoute.patch("/change-password",isAuth,EditCashierPassword);
CashierRoute.patch("/update-cashier/:id",isAuth,EditCashierProfile);
CashierRoute.delete("/delete-cashier/:id",isAuth,DeleteCashier);

module.exports=CashierRoute