const express = require('express')


const router = express.Router()
const pagecontroller=require('../controller/page')
router.get('/home',pagecontroller.getmainpage)

router.get('/login',pagecontroller.getloginpage)

router.get('/signup',pagecontroller.getsignuppage)

router.get('/forgot',pagecontroller.getforgotpage)

router.get('/reset',pagecontroller.getresetpage)
router.get('/report',pagecontroller.getreportpage)
module.exports = router;