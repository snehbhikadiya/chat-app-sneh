require('dotenv').config();
require('./config/db');
const express=require('express');
const app=express();
const routes=require('./routes/index'); 
const session=require('express-session');
const mongostore=require('connect-mongo');
const path=require('path');
const socketHandler=require('./handerler/sockethandler');
const http=require('http');


const server=http.createServer(app);
const {Server}=require('socket.io');


const io=new Server(server);


const Mongostore= mongostore.create({
    mongoUrl:process.env.MONGO_URL,
    ttl:56745*64*64,
    crypto: {
        secret: process.env.SECREAT_KEY
    }
})

app.use(express.json({limit:'43mb'}));
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:false,limit:'35mb'}));
app.use(session({
    secret:process.env.SECREAT_KEY,
    resave:false,
    saveUninitialized:false,
    store:Mongostore,
    cookie:{secure:false,sameSite:true,maxAge:8455*53*53}
}))




app.use(routes);
app.use((err,req,res,next)=>
{
    const message=err.message
    const status=err.statusCode
    
    res.status(status).json({   
        message
    })
})

// app.use((req,res,next)=>
// {
//     res.render('error');
// })

server.listen(3000,()=>
{
    console.log('server start on 3000');
})

io.on('connection',(socket)=>{
    socketHandler(io,socket);
})