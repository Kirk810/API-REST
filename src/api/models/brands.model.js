const mongoose = require('mongoose')

const BrandSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  models: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Model' }],
})

const Brand = mongoose.model('Brand', BrandSchema)

module.exports = Brand
