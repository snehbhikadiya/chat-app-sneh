module.exports=(io,socket)=>{
    console.log("soketId",socket.id);

    socket.emit("welcome","welcome to chat app");

    socket.broadcast.emit("newConnection","new user connected");

    socket.on('sendMessage',(data)=>
    {
        socket.broadcast.emit("receiveMessage",data);
    })

    socket.on('join',(data)=>
    {
        console.log(data);
        socket.join(data);   

    })
}