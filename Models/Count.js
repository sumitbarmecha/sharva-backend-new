const mongoose = require('mongoose')
const {Schema} = mongoose;
const countSchema = Schema({
    	number: Number
    	
    });


module.exports = mongoose.model('counts', countSchema);