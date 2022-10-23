const mongoose = require('mongoose');
const shortid = require('shortid');
const shortId = require('shortid');
const Schema = mongoose.Schema;

// Schema
const urlSchema = new Schema({
    longUrl : {
        type: String,
        required: true
    },
    shortUrl : {
        type: String,
        default: shortid.generate,
        required: true    
    }
}, {timestamps: true});

// Model
const Url = mongoose.model('Url', urlSchema);

module.exports = Url;