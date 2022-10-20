const mongoose = require("mongoose");

const ComSchema = mongoose.Schema({


     userId: { type: String },
     _id: { type: String}, 
    coms: {type: String}, 
     imageUrl: { type: String ,require: false},
     likes: { type: Number },
     usersLiked: { type: [String] },
     pseudo: {type: String},  

});

//La méthode  model  transforme ce modèle en un modèle utilisable.

module.exports = mongoose.model("Coms", ComSchema);