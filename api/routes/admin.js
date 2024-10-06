

const  express= require('express');
const {  AdminSignup, AdminLogin, EditAdminProfile, GetAdminProfile,EditAdminPassword } = require('../controllers/auth');
const {GetAdmins,GetAdmin,DeleteAdmin} =require("../controllers/admin")
const isAuth = require('../middlewares/auth');
const adminRoutes= express.Router();

adminRoutes.post("/signup",AdminSignup)
adminRoutes.post("/signin",AdminLogin);
adminRoutes.patch("/update-profile/:id",isAuth,EditAdminProfile);
adminRoutes.patch("/update-password",isAuth,EditAdminPassword);
adminRoutes.get("/get-profile",isAuth,GetAdminProfile);
adminRoutes.get("/get-admins",isAuth,GetAdmins);
adminRoutes.get("/get-admin/:id",isAuth,GetAdmin);
adminRoutes.get("/delete-admin/:id",isAuth,DeleteAdmin);



module.exports=adminRoutes