const express = require ('express');
const morgan = require('morgan');
const cors = require ('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// import routes
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

//app middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
/*
//app.use(cors());//allows all origins
if(process.env.NODE_ENV = 'development') {
    app.use(cors({origin: `http://localhost:3000`}));
}*/
//connect to database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify:false,
    useUnifiedTopology:true,
    useCreateIndex: true
})
.then(()=> console.log('DB connected'))
.catch(err => console.log('DB CONNECTION ERROR: ', err));

//middlewares
app.use('/api', authRoutes);
app.use('/api', postRoutes)
app.use('/api', userRoutes);




const port = process.env.PORT || 8000
app.listen(port, ()=> {
    console.log(`API is running on port ${port}`)
});