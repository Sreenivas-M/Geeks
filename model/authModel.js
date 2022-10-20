const mongoose = require('mongoose');

const Auth = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    mobile: {
         type: String,
        required: true,
        trim: true,
        unique:true
    },    
    profession: {
        type: String,
        required: true,        
        
    },  
    password: {
         type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        default: "user"
    }
}, {
    collection: "users",
    timestamps: true
})

module.exports = mongoose.model("Auth", Auth)