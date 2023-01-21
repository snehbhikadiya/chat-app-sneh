exports.dashboard=async(req,res)=>
{
    res.render('dashboard');
}

exports.chat=async(req,res)=>
{
    const user=req.user

    res.render('chat',{userId:user._id});
}


 exports.logout=async(req,res)=>
{
    req.session.destroy();

    res.redirect('/login');
}
