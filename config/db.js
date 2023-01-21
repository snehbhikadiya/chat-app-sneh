const mongoose=require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL).then(()=>
{
    console.log('data-base connected');
}).catch((err)=>{
    console.log(err);
})