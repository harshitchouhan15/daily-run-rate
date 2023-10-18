const mongoose = require('mongoose')

const DRRSchema = new mongoose.Schema({
    startDate:{
        type:String,
        required:true
    },
    endDate:{
        type:String,
        required:true
    },
    startMonth:{
        type:String,
    },
    startYear:{
        type:String,
    },

    excludedDates:{
        type:Array,
    },
    leadCount:{
        type:Number,
        required:true
    },
    expectedDRR:{
        type:Number,
        required:true
    },
   numberOfDays:{
        type:Number,
        required:true
    },

},{timestamps:true})

module.exports = mongoose.model('DRR',DRRSchema)