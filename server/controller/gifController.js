const cloudinary = require('cloudinary').v2;
const db = require('../db');
const queries = require('../queries/gifQuery');

require('dotenv').config()

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})


const createGif =  (req, res) =>{
    try {
      const data = {
        title: req.body.title,
        image: req.body.image
      }
        cloudinary.uploader.upload(data.image)
    .then((image) => {
      db.pool.connect((err, client, done) =>  {
        const createdOn = new Date
        //  i can also use *Date().toLocaleString();
        
        const values = [data.title, image.url, createdOn];
        client.query(queries.createNewGif, values)
          .then((result) => {
            result = result.rows[0];

            // send success response
            res.status(201).send({
              status: 'success',
              data: {
                gifId: result.id,
                message: 'GIF image successfully posted',
                createdOn: result.createdon,
                title: result.title,
                imageUrl: result.imageurl,
              }
            });
          })
          .catch((error) => {
            res.status(500).send({
              error,
            });
          });
      });
    })

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}



module.exports = {
    createGif, 
}