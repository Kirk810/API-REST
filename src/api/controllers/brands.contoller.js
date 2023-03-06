const Brand = require('../models/brands.model')

const getAllBrands = async (req, res, next) => {
  try {
    const brands = await Brand.find().populate('models')
    return res.status(200).json({
      info: 'All brands',
      status: 'OK',
      results: brands,
    })
  } catch (error) {
    return next('Brands not found', error)
  }
}

const createBrand = async (req, res) => {
  try {
    const newBrand = new Brand(req.body)
    const createdBrand = await newBrand.save()
    return res.status(201).json(createdBrand)
  } catch (error) {
    return 'Faild creating Brand', error
  }
}

const editBrand = async (req, res, next) => {
  try {
    const { id } = req.params
    const newBrand = new Brand(req.body)
    newBrand._id = id
    const foundBrand = await Brand.findById(id)
    newBrand.model = [...newBrand.model, ...foundBrand.model]

    const updatedBrand = await Brand.findByIdAndUpdate(id, newBrand)
    return res.status(200).json({
      new: newBrand,
      old: updatedBrand,
    })
  } catch (error) {
    return next('Error updating faction', error)
  }
}
module.exports = { getAllBrands, createBrand, editBrand }
