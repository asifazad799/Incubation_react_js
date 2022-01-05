const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const admin = require('../controller/adminController')

router.get('/applicationTable',admin.getApplications)
router.post('/approve',admin.approveApplication)
router.post('/login',admin.Login)
router.post('/slotAlocation',admin.slotAlocation)

module.exports = router