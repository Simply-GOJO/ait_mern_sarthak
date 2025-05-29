const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name:{type:String, required:true},
    gender:{type:String,required:true, enum:['male', 'female']},
    location: {type:String},
    age:{type:Number, required:false}
}) // Fields of the collection are defined

module.exports = mongoose.model('Person', personSchema) // collection name is defined
