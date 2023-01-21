const User=require('../model/userModel');
const nodemailer=require('nodemailer');
const jwt=require('jsonwebtoken');

exports.getregister=async(req,res)=>
{
    res.render('register');
}


exports.register=async(req,res)=>
{
    const {name,email,password,phoneNo}=req.body
    const createuser={name,email,password,phoneNo}
    const register=await User.create(createuser)

         res.redirect('/login');
}

exports.getlogin=async(req,res)=>
{
    res.render('login');
}

exports.login=async(req,res)=>
{
    const{email,password}=req.body
    const finduser=await User.findOne({email});
    if(!finduser)
    {
        return res.redirect('/register');
    }
    if(password!==finduser.password)
    {
        return res.redirect('/login');
    }
    req.session.user=finduser
    return res.redirect('/dashboard');
}


exports.getforget=async(req,res)=>
{
    res.render('forget');
}

const compny_password=process.env.EMAIL_PASSWORD
const compny_email=process.env.EMAIL_ADMIN
const transporter=nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:compny_email,
        pass:compny_password
    }
})

exports.forget=async(req,res)=>
{
    const{email}=req.body
    const findemail=await User.findOne({email});
    if(!findemail)
    {
        return res.redirect('/login');
    }
    const payload={
        id:findemail.id,
    }
    const token=await jwt.sign(payload,process.env.SECREAT_KEY,{
        expiresIn:'24h'
    });

    let info=await transporter.sendMail({
        from:compny_email,
        to:email,
        subject:'reset password',
        html:`<a href="http://localhost:3000/reset?token=${token}">reset your password</a>`
    }) 

    console.log(info);

    return res.redirect('/login');
}

exports.getrest=async(req,res)=>
{
    const token=req.query.token
    res.render('reset',{token})
}

exports.reset=async(req,res)=>
{
    const {token,password,confirmpassword}=req.body
    if(!token||!password||!confirmpassword)
    {
        return res.redirect('/login');
    }
    const decode=await jwt.verify(token,process.env.SECREAT_KEY)
    
    const {id}=decode

    const finduser=await User.findById(id);
    if(!finduser)
    {
        return res.redirect('/register');
    }

   finduser.password=password
   await finduser.save();
   return res.redirect('/login');
}