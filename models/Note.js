const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const noteSchema = mongoose.Schema({
    title:{
        type: String,
        required: false
    },
    body:{
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
    ,
    headline: {
        type: Schema.Types.ObjectId,
        ref: "Headline"
    }
  
});

module.exports = mongoose.model('Note', noteSchema);