const io = require("socket.io")(5000, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', socket => {
    const id = socket.handshake.query.id
    socket.join(id)
    //joins the user to a room with an id of his id

    socket.on('send-message', ({ recipients, text }) => {
        recipients.forEach(recipient => {
            const newRecipients = recipients.filter(r => r !== recipient)
            newRecipients.push(id)
            socket.broadcast.to(recipient).emit('receive-message', 
            { recipients: newRecipients, sender: id, text })
        });
    }) //sends message to other user's room who have a recipient lists of everyone else in the chat except them
})