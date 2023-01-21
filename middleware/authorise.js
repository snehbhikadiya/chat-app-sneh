const User=require('../model/userModel');

exports.authorise=async(req,res,next)=>
{
    const{userId}=req.session
    if(!userId)
    {
        return res.redirect('/login');
    }
    const finduser=await User.find({userId});
    if(!finduser)
    {
        return res.redirect('/register');
    }
    req.session.finduser=finduser
    next();
}

