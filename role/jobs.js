const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    Company: {
         type: String,
         required: true
    },
    Profile: {
        type: String,
        required: true
    },
    Designation: {
        type: String,
        required: true
    },
    Salary: {
        type: String,
        required: true
    },
    location: {
        type: {type: String, required: true},
       coordinates: []
    }
},
{
    timestamps: true
}
)

jobSchema.index({location: '2dsphere'})
module.exports = mongoose.model('jobs', jobSchema);
