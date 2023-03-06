const express = require('express')

const BrandsRoutes = express.Router()

const {
  getAllBrands,
  createBrand,
  editBrand,
} = require('../controllers/brands.contoller')

BrandsRoutes.get('/', getAllBrands)
BrandsRoutes.post('/', createBrand)
BrandsRoutes.put('/:id', editBrand)
module.exports = BrandsRoutes
