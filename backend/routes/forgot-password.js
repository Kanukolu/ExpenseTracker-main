const express = require('express')

const router = express.Router()
var Brevo = require('@getbrevo/brevo');
require('dotenv').config()


const User = require('../models/user')



router.post('/forgot-password' , async(req,res)=>{
    try{
        const email = req.body.email
        const user = await User.findOne({where : {email : email}})
        if(user == null)
             return res.status(404).json({success : true , msg :"Email not found"})

        var defaultClient = Brevo.ApiClient.instance;
        var apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = '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'
        console.log(apiKey)

        var apiInstance = new Brevo.TransactionalEmailsApi();

        var sendSmtpEmail = new Brevo.SendSmtpEmail()
        const sender = { "email": "kanukolulakshmi@gmail.com"}

        const reciever = [{
            "email": req.body.email
        }]
        console.log(reciever)
        const response = await apiInstance.sendTransacEmail({
            sender,
            to : reciever,
            subject : 'testing',
            textContent : `click the link to reset your password`
        })
        console.log(response)
        return res.json({success : true})


    }catch(e){
        console.log(e)
        return res.status(500).json({success : false ,msg :"Internal server error"})
    }
})


module.exports = router;