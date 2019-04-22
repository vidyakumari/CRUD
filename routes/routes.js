const express = require('express');
const router = express.Router()

const datacontroller  = require('../controller/controller');


router.put('/user/:id', datacontroller.userupdate);
router.delete('/user/:id',datacontroller.userdelete)
router.post('/user',datacontroller.user)
router.get('/user',datacontroller.getuser)
router.post('/admin',datacontroller.user)
router.post('/company',datacontroller.user)
router.post('/jobs',datacontroller.jobs)
router.get('/jobs',datacontroller.getjobs)
router.put('/jobs/:id',datacontroller.jobsupdate);
router.delete('/jobs/:id',datacontroller.jobsdelete)
router.post('/jobsapplied',datacontroller.jobsapplied);
router.get('/jobsapplied',datacontroller.getjobsapplied)
module.exports = router         