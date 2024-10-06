const  express= require('express');

const isAuth = require('../middlewares/auth');
const { DeveloperSignin,DeveloperSignup,EditDeveloperProfile,GetDeveloperProfile,EditDeveloperPassword } = require('../controllers/developers');
const developerRoutes= express.Router();

developerRoutes.post("/signup",DeveloperSignup)
developerRoutes.post("/signin",DeveloperSignin);
developerRoutes.patch("/update-profile",isAuth,EditDeveloperProfile);
developerRoutes.patch("/update-password",isAuth,EditDeveloperPassword);
developerRoutes.get("/get-profile",isAuth,GetDeveloperProfile);



module.exports=developerRoutes