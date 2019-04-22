const mongoose = require('mongoose');

const jobapplySchema = mongoose.Schema({
    userDetails: {
         type: Object,
         required: true
    },
    jobsDetails: {
        type: Object,
        require: true
    },
    Status: {
        type: String,
        require: true
    }
},
    {
        timestamps: true
    }
    )
    
    module.exports = mongoose.model('jobsapplied', jobapplySchema);