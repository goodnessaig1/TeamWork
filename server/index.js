const express = require('express');
<<<<<<< HEAD
const users = require('./routes/adminRoute')
=======
<<<<<<< Updated upstream
const users = require('./routes/routes')
=======
const users = require('./routes/adminRoute')
const gifRoutes = require('./routes/gifRoute');
>>>>>>> Stashed changes
>>>>>>> ft-gif-post
const app = express();
const cors = require('cors');

//       MIDDLEWARES
app.use(express.json());
app.use(cors());

//   REGISTER AND LOGIN ROUTES
 app.use('/auth/v1', users);

 // GIF ROUTE
 app.use('/v1/gifs', gifRoutes);

const port = process.env.PORT || 3000; 
app.listen(port, ()=>{
    console.log(`App is running ${port}`)
})

module.exports = app; 