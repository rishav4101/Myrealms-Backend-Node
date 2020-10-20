const express = require('express');
const imageRouter = express.Router();
const auth = require('../middlewares/auth');

const upload = require('../config/imageUpload');

const singleUpload = upload.single('image');

imageRouter.post('/', auth.required, function(req, res) {
    //@ts-ignore
  singleUpload(req, res, function(err) {
    if (err) {
      return res.status(422).send({errors: [{title: 'Image Upload Error (only jpeg png)', detail: err.message}]});
    }
    //@ts-ignore
    return res.json({'imageUrl': req.file.location, 'imageName': req.file.originalname});
  });
});

module.exports = imageRouter;