const express = require('express');
const users = require('./routes/adminRoute')
const gifRoutes = require('./routes/gifRoute');
const categoryRoutes = require('./routes/categoryRoute');


const app = express();
const cors = require('cors');

//       MIDDLEWARES
app.use(express.json());
app.use(cors());

//   REGISTER AND LOGIN ROUTES
 app.use('/auth/v1', users);

 // GIF ROUTE
 app.use('/v1/gifs', gifRoutes);

  //  CATEGORY ROUTE
app.use('/v1/categories', categoryRoutes);

const port = process.env.PORT || 3000; 
app.listen(port, ()=>{
    console.log(`App is running ${port}`)
})

module.exports = app; 