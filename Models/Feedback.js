const mongoose = require('mongoose')
const {Schema} = mongoose;
const feedSchema = Schema({ 
    	name: String,
    	email: String,
    	feed: String
    });

module.exports = mongoose.model('contact_us_new', feedSchema); 