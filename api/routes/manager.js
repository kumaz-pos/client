const  express= require('express');

const isAuth = require('../middlewares/auth');
const { DeleteManager,ManagerSignup, ManagerSignin, EditManagerProfile, GetManagerProfile,EditManagerPassword,GetManager,GetManagers } = require('../controllers/managerAuth');
const managerRoutes= express.Router();

managerRoutes.post("/signup",ManagerSignup)
managerRoutes.post("/signin",ManagerSignin);
managerRoutes.get("/get-managers",isAuth,GetManagers);
managerRoutes.get("/get-manager/:id",isAuth,GetManager);
managerRoutes.patch("/update-profile/:id",isAuth,EditManagerProfile);
managerRoutes.get("/get-profile",isAuth,GetManagerProfile);
managerRoutes.patch("/update-password",isAuth,EditManagerPassword);
managerRoutes.delete("/delete-manager/:id",isAuth,DeleteManager);



module.exports=managerRoutes