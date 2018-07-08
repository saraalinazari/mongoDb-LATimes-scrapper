const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const headlineSchema = mongoose.Schema({
    img: {
        type: String,
        required: false
    },
    link:{
        type: String,
        required: true
    },
    title:{
        type: String,
        require: true
    },
    summary:{
        type: String,
        default: 'No summary available'
    },
    createdAt:{
        type: String
    },
    saved:{
        type: Boolean,
        default: false
    },
    notes:[{
        type: Schema.Types.ObjectId, 
        ref: "Note"  
    }]
});

module.exports = mongoose.model('Headline',headlineSchema);