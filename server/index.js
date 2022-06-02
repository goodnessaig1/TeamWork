const express = require('express');
const users = require('./routes/adminRoute')
const app = express();
const cors = require('cors');

//       MIDDLEWARES
app.use(express.json());
app.use(cors());


//   REGISTER AND LOGIN ROUTES
 app.use('/auth/v1', users);


const port = process.env.PORT || 3000; 
app.listen(port, ()=>{
    console.log(`App is running ${port}`)
})

module.exports = app; 