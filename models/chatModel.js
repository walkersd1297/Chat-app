const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    content:{
        type:String
    },
    user:{
        type:String
    },
    roomId:{
        type:String
    }
})

module.exports = mongoose.model('chat',chatSchema);