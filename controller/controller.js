const user = require('../role/user')
const role = require('../role/role')
const jobs = require('../role/jobs')
const jobsapplied = require('../role/jobsapplied')
const appliedstatus = require('../role/appliedstatus')

//Create users
exports.user = (req, res) => {
    if (!!req.body.content) {
        return res.status(400).json({
            message: "users can not be empty"
        });
    } else {
        var roles;
        if (req.route.path === '/admin') {
            roles = role[0].value
        }
        if (req.route.path === '/company') {
            roles = role[1].value
        }
        if (req.route.path === '/user') {
            roles = role[2].value
        }

        const details = new user({
            fullname: req.body.fullname,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            location: req.body.location,
            roles: roles
        });
        console.log(details)
        details.save()
            .then(data => {
                res.status(201).json({ data });
            }).catch(err => {
                res.status(500).json({
                    message: err.message || "Some error occurred while creating the user."
                });
            });
    }
};

exports.getuser = (req, res) => {
    user.find()
        .then(data => {
            res.status(200).json({ data });
        }).catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
};

//Create jobposts
exports.jobs = async (req, res) => {
    if (!!req.body.content) {
        return res.status(400).json({
            message: "jobs content can not be empty"
        });
    }
    const { fullname } = req.body;
    const checkIsValid = await user.findOne({ fullname })
    if (checkIsValid.roles === 2) {
        res.status(401).json({
            errorMessage: "only admin and company can post the job"
        })
    }
    else {
        const details = new jobs({
            Company: req.body.Company,
            Profile: req.body.Profile,
            Designation: req.body.Designation,
            Salary: req.body.Salary,
            location: req.body.location,
        });
        console.log(details)
        details.save()
            .then(data => {
                res.status(200).json({ data });
            }).catch(err => {
                res.status(500).json({
                    message: err.message || "Some error occurred while creating the jobs."
                });
            });
    }
};


//Retrive jobposts
exports.getjobs = (req, res) => {
    jobs.find()
        .then(data => {
            res.status(200).json({ data });
        }).catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while retrieving jobs."
            });
        });
};


// Update user
exports.userupdate = (req, res) => {
    if (!!req.body.content) {
        return res.status(400).json({
            message: "error on updating the user"
        });
    }

    user.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "user not found with id " + req.params.id
                });
            }
            res.status(200).json({ user });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    message: "user not found with id " + req.params.id
                });
            }
            return res.status(500).json({
                message: "Error updating user with id " + req.params.id
            });
        });
};


// Delete user
exports.userdelete = (req, res) => {
    user.findByIdAndRemove(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "user not found with id " + req.params.id
                });
            }
            res.send({ message: "user deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).json({
                    message: "user not found with id " + req.params.id
                });
            }
            return res.status(500).json({
                message: "Could not delete user with id " + req.params.id
            });
        });
};

// Update jobpost
exports.jobsupdate = (req, res) => {
    if (!!req.body.content) {
        return res.status(400).json({
            message: "jobpost content can not be empty"
        });
    }

    jobs.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true })
        .then(jobs => {
            if (!jobs) {
                return res.status(404).send({
                    message: "jobpost not found with id " + req.params.id
                });
            }
            res.status(200).json({ jobs });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    message: "jobpost not found with id " + req.params.id
                });
            }
            return res.status(500).json({
                message: "Error updating jobpost with id " + req.params.id
            });
        });
};

// Delete jobpost
exports.jobsdelete = (req, res) => {
    jobs.findByIdAndRemove(req.params.id)
        .then(jobs => {
            if (!jobs) {
                return res.status(404).json({
                    message: "jobpost not found with id " + req.params.id
                });
            }
            res.send({ message: "jobpost deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).json({
                    message: "jobpost not found with id " + req.params.id
                });
            }
            return res.status(500).json({
                message: "Could not delete jobpost with id " + req.params.id
            });
        });
};

//apply for a job 
exports.jobsapplied = async (req, res) => {
    const { email } = req.body
    var users = await user.findOne({ email })
    const { company } = req.body
    var job = await jobs.findOne({ company })
    var lat = users.location.coordinates[0]
    var long =users.location.coordinates[1]
    const jobdist = jobs.find({
        location: {
            $near: {
                $geometry: { type: 'Point', coordinates: [long, lat] },
                $minDistance: 5000
            }
        }
    }, (err, data) => {
        if (err)
            return err
        else {
            res.json(data)
        }
    })

    if (jobdist.length === 0) {
        console.log("You can't apply for the job above 5km range")
    }

    const details = new jobsapplied({
        userDetails: {
            fullname: users.fullname,
            email: users.email,
            phone: users.phone,
            password: users.password,
            location: users.location,
            roles: users.roles
        },
        jobsDetails: {
            Company: job.Company,
            Profile: job.Profile,
            Designation: job.Designation,
            Salary: job.Salary,
            location: job.location
        },
        Status: appliedstatus[0].value
    })


    await details.save()
        .then(data => {
            res.status(201).json({
                "Message": "Successfully applied"
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while applying for a job."
            });
        });
}

//Company can retrive the job applied details of their company by passing company name.
exports.getjobsapplied = (req, res) => {
    const { Company } = req.body;
    jobsapplied.find({ 'jobsDetails.Company': Company })
        .then(jobsapplied => {
            res.status(200).json({ jobsapplied });
        }).catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while retrieving jobsapplied."
            });
        });
};

