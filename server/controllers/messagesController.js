
const messageModel = require("../model/messageModel")

module.exports.addMessage = async (req,res,next) => {
    try{
        const {from,to,message} = req.body;
        const data = await messageModel.create(
            {
                message: {text: message},
                users: [from, to],
                sender: from
            }
        )

        if(data) return res.json({status: true, msg: "Message added to database"})
        else return res.json({status: false, msg: "Failed to add message to database"})

    } catch(error) {
        next(error)
    }
}

module.exports.getAllMessage = async (req,res,next) =>{
    try{
       const {from, to} = req.body;
       const allMessages = await messageModel.find(
           {users: { $all: [from, to]}}
       ).sort({createdAt: 1});
       const messages = allMessages.map((msg)=>{
           return ({
               fromSelf: msg.sender.toString() === from,
               message: msg.message.text,
           })
       })
        res.json(messages);

    }catch (error) {next(error)}
}