const User=require('../model/userModel');

exports.authorise=async(req,res,next)=>
{
    const{user}=req.session
    if(!user)
    {
        return res.redirect('/login');
    }
    const finduser=await User.findById(user);
    if(!finduser)
    {
        return res.redirect('/register');
    }
    req.user=finduser
    next();
}

