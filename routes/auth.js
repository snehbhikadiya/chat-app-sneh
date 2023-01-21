const express=require('express');
const routes=express.Router();
const authController=require('../controller/authController');



const use=(fn)=>(req,res,next)=>
{
    Promise.resolve(fn(req,res,next)).catch(next);
}


routes.get('/register',use(authController.getregister));
routes.post('/register',use(authController.register));


routes.get('/login',use(authController.getlogin));
routes.post('/login',use(authController.login));

routes.get('/forget',use(authController.getforget));
routes.post('/forget',use(authController.forget));

routes.get('/reset',use(authController.getrest));
routes.post('/reset',use(authController.reset));


module.exports=routes