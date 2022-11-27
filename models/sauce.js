const mongoose = require("mongoose");

//PlugIn de validation des input
const validator = require ('../middlewares/input-validator.js')

//PlugIn pour empêcher les attaques par injection 
const sanitizerPlugin = require('express-mongo-sanitize');


const sauceSchema = mongoose.Schema({

  userId: { type: String, required: true },
  name: { type: String, required: true, validate : validator.nameValidator },
  manufacturer: { type: String, required: true, validate : validator.manufacturerValidator },
  description: { type: String, required: true, validate : validator.descriptionValidator },
  mainPepper: { type: String, required: true, validate : validator.pepperValidator },
  imageUrl: { type: String, required: true },
  heat: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: [{ type: String }],
  usersDisliked: [{ type: String }],
});

sauceSchema.plugin(sanitizerPlugin);



module.exports = mongoose.model("Sauce", sauceSchema);