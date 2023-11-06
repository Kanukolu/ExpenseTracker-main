const Razorpay = require('razorpay');
const Order = require('../models/order')
<<<<<<< HEAD
const crypto = require('crypto')
=======
const User = require('../models/user');
const sequelize = require('../util/db');
>>>>>>> 560ed9f940d78996f2a393d3d86beed9937b4df7


require('dotenv').config();



var rzp = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    
exports.purchaseMembership = async (req , res)=>{
    try{
  
      console.log(process.env.RAZORPAY_KEY_ID)
  
        
        
        var options = {
          amount: 50000,  // amount in the smallest currency unit
          currency: "INR",
          receipt: "order_rcptid_11"
        };
      
        const order = await rzp.orders.create(options) 
          console.log(order);
          await req.user.createOrder({order_id : order.id , status : "PENDING"})
          
          return res.json({order_id : order.id , key : rzp.key_id})
        
  }catch(e){
    console.log(e)
    return res.status(500).json({msg : "Internal server error"})
  
    
  }
  
  
  }



<<<<<<< HEAD
exports.successfullTransaction = async(req,res)=>{
    try{
      const orders = await req.user.getOrders({ where : {status : "PENDING"}});
  
=======


exports.successfullTransaction = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const orders = await req.user.getOrders({ where: { status: "PENDING" } });

    const payment_id = req.body.payment_id;
    const signature = req.body.razorpay_signature
    if (orders.length > 0) {
      const order = orders[0]
      const data = `${order.order_id}|${payment_id}`
      const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(data).digest('hex');

      if (generated_signature == signature) {
        const payment = await rzp.payments.fetch(payment_id);
        // const purchase = await Order.find
        if (payment.status == "captured") {
          // order.payment_id = payment_id;
          // order.status = "SUCCESSFUL"
          await order.update({payment_id :payment_id , status : "SUCCESSFUL"},{
            transaction : t
          })
          // await order.save()
          // req.user.isPremiumUser = true
          await req.user.update({isPremiumUser : true} , {
            transaction:t
          })
          const token = jwt.sign({id : req.user.id , isPremiumUser : true} , process.env.JWT_SECRET)
          await t.commit()
          return res.json({ success: true, msg: "payment complete", token ,isPremiumUser : true})
        } else {
          order.payment_id = payment_id;
          order.status = "FAILED"
          await order.save()

          return res.json({ success: false, msg: "payment failed",isPremiumUser : false })

        }

      } else {
        return res.status(401).json({ msg: "not authorized" })

      }

    } else {
      return res.status(403).json({ msg: "no order found" })

    }

  } catch (e) {
    console.log(e)
    await t.rollback()
    console.log("rollback")
    return res.status(500).json({ msg: "Internal server error" })
  }
}


exports.failedTransaction = async (req, res) => {
  try {
    const orders = await req.user.getOrders({ where: { status: "PENDING" } });
    // return res.json(orders)
    if (orders.length > 0) {
      const order = orders[0]
>>>>>>> 560ed9f940d78996f2a393d3d86beed9937b4df7
      const payment_id = req.body.payment_id;
      const signature = req.body.razorpay_signature
      if(orders.length > 0){
        const order = orders[0]
        const data = `${order.order_id}|${payment_id}`
        const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(data).digest('hex');
  
        if(generated_signature == signature){
          const payment = await rzp.payments.fetch(payment_id);
          // const purchase = await Order.find
          if(payment.status == "captured"){
            order.payment_id = payment_id;
            order.status = "SUCCESSFUL"
            await order.save()
            return res.json({success : true , msg :"payment complete"})
          }else{
            order.payment_id = payment_id;
            order.status = "FAILED"
            await order.save()
            return res.json({success : false , msg :"payment failed"})
  
          }
  
        }else{
          return res.status(401).json({msg : "not authorized"})
  
        }
  
      }else{
        return res.status(403).json({msg : "no order found"})
  
      }
  
    }catch(e){
      console.log(e)
    return res.status(500).json({msg : "Internal server error"})
    }
  }


exports.failedTransaction =  async(req,res)=>{
    try{
      const orders = await req.user.getOrders({where : {status :"PENDING"}});
      // return res.json(orders)
      if(orders.length >0){
        const order = orders[0]
        const payment_id = req.body.payment_id;
        const payment = await rzp.payments.fetch(payment_id)
        // return res.json(payment)
        if(payment.status == "failed"){
  
          order.status = "FAILED"
          order.payment_id = payment_id
          await order.save()
          return res.json({success : false , msg:"transaction failed"})
        }
      }else{
        return res.status(403).json({msg : "no order found"})
  
      }
    }catch(e){
      console.log(e)
      return res.status(500).json({msg : "Internal server error"})
    }
  }