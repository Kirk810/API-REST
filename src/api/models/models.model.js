const mongoose = require('mongoose')

const ModelsSchema = new mongoose.Schema({
  model: { type: String, required: true, trim: true },
  year: { type: Number, required: false, trim: true },
  image: { type: String, required: true, trim: true },
})

const Model = mongoose.model('Model', ModelsSchema)

module.exports = Model
