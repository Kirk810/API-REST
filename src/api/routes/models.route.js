const express = require('express')

const ModelsRoutes = express.Router()

const { upload } = require()

const {
  getAllModels,
  createModel,
  deleteModel,
} = require('../controllers/models.controller')

ModelsRoutes.get('/', getAllModels)
ModelsRoutes.post('/', upload.single('image'), createModel)
ModelsRoutes.delete('/:id', deleteModel)
module.exports = ModelsRoutes
