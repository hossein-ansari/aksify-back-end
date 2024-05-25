const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config();
require('./db')
app.use(cors()); // Enable CORS
app.use(express.json());
app.use('/uploads', express.static('uploads'));
const usersRouters = require('./Routers/userRouter')
const subscriptionRouters = require('./Routers/subscriptionRouter')
const productRouters = require('./Routers/productRouter')
const imageUploadedByUserRouter = require('./Routers/imageUploadedByUserRouter')



app.use('/users/',usersRouters)
app.use('/subscriptions/' , subscriptionRouters)
app.use('/products/',productRouters)
app.use('/imageUpload/',imageUploadedByUserRouter)

app.listen(process.env.port, ()=>{
    console.log('back end is run');
})
