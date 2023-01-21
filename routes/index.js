const express=require('express');
const routes=express.Router();
const auth=require('./auth');
const dashboard=require('./dashboard');


routes.use('/',auth);
routes.use('/',dashboard);


module.exports=routes