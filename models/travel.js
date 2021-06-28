const mongoose = require('mongoose');

const travelSchema = mongoose.Schema({

    date: {
        type: Date,
        //require: true
    },
    hour:{
        type: String,
        //require: true
    },

    destination:{
        type: String,
        //require: true
    },
    departure:{
        type: String,
        //require: true  
    },
    payment:{
        type: Boolean,
        //require: true 
    },
    //male / female
    gender:{
        type: String,
        //require: true
    },
    numPassengers:{
        type: Number,
        require: true  
    },
    email:{
        type: String,
        require: true,
        match: /(.+)@(.+){2,}\.(.+){2,}/i
    },
    phone:{
        type: String,
        //require: true
    },
    emailAlerts:{
        type: Boolean,
        //require: true  
    },
    phoneAlerts:{
        type: Boolean,
        //require: true  
    },
    //driver/passenger
    userType:{
        type: String,
        //require: true
    }
    
})

module.exports = mongoose.model('Travel',travelSchema)