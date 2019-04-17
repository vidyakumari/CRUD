const user = require('../role/user')
const role = require('../role/role')
const jobs = require('../role/jobs')

exports.user = (req, res) => {
    var location = [{'lat': req.body.latitude, 'long': req.body.longitude}]
    if (!!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }else{
       var roles;
       if(req.route.path==='/admin'){
           roles=role[0].value
       } 
       if(req.route.path==='/company'){
           roles=role[1].value
       }
       if(req.route.path==='/user'){
           roles=role[2].value
       }

    const details = new user({
        fullname: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        address: location,
        roles: roles
    });
    console.log(details)
    details.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
    }
};

exports.getuser = (req, res) => {
    user.find()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};


exports.jobs = (req, res) => {
    var location = [{'lat': req.body.latitude, 'long': req.body.longitude}]
    if (!!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }else{
    const details = new jobs({
        Company: req.body.company,
        Profile: req.body.profile,
        Designation: req.body.designation,
        Salary: req.body.salary,
        Job_location:location ,
    });
    console.log(details)
    details.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
    }
};



exports.getjobs = (req, res) => {
    jobs.find()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};


// Update user
exports.update = (req, res) => {
    if(!!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    user.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.id
        });
    });
};


// Delete user
exports.delete = (req, res) => {
    user.findByIdAndRemove(req.params.id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.id
        });
    });
};






