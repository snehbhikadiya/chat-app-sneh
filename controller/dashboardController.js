exports.dashboard=async(req,res)=>
{
    res.render('dashboard');
}

exports.chat=async(req,res)=>
{
    res.render('chat');
}


 exports.logout=async(req,res)=>
{
    req.session.destroy();

    res.redirect('/login');
}
