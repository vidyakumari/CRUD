const express = require('express');
const router = express.Router()

const datacontroller  = require('../controller/controller');


router.put('/user/:id', datacontroller.update);
router.delete('/user/:id',datacontroller.delete)
router.post('/user',datacontroller.user)
router.get('/user:',datacontroller.getuser)
router.post('/admin',datacontroller.user)
router.post('/company',datacontroller.user)
router.post('/jobs',datacontroller.jobs)
router.get('/jobs',datacontroller.getjobs)

module.exports = router         