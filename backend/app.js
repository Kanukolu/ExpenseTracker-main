const express = require('express')
const cors = require('cors')

const app = express();

const sequelize = require('./util/db')

const expenseRoutes = require('./routes/expense')
const userRoutes = require('./routes/user')
const paymentsRoutes = require('./routes/purchase')

const User = require('./models/user')
const Expense = require('./models/expense')
const Order = require('./models/order')

app.use(cors())
app.use(express.json())
//app.use(express.static('public'))
User.hasMany(Expense)
Expense.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

app.use('/expense' , expenseRoutes)
app.use('/user' , userRoutes)
app.use('/payment' , paymentsRoutes)
//checking


sequelize
.sync()
//.sync({force : true})
.then((result) => {
    app.listen(4000)
}).catch(e => console.log(e))
