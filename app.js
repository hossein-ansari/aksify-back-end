const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
require('./db');

const corsOptions = {
    origin: true,
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

const usersRouters = require('./Routers/userRouter');
const subscriptionRouters = require('./Routers/subscriptionRouter');
const productRouters = require('./Routers/productRouter');
const imageUploadedByUserRouter = require('./Routers/imageUploadedByUserRouter');
const tagsRouter = require('./Routers/tagsRouter');
const lastChangesRouter = require('./Routers/lastChanges')

app.use('/users/', usersRouters);
app.use('/subscriptions/', subscriptionRouters);
app.use('/products/', productRouters);
app.use('/imageUpload/', imageUploadedByUserRouter);
app.use('/tags/', tagsRouter);
app.use('/lastChanges/',lastChangesRouter)

app.listen(process.env.port, () => {
    console.log('back end is run');
});