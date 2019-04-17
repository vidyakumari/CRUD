const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    Company: {
         type: String,
         required: true
    },
    Profile: {
        type: String,
        require: true
    },
    Designation: {
        type: String,
        require: true
    },
    Salary: {
        type: String,
        require: true
    },
    Job_location: {
        type: Array,
        require: true
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model('jobs', jobSchema);
