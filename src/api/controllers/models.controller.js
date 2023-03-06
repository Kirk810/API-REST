const Model = require('../models/models.model')

const { deleteImgCloudinary } = require('../../middlewares/files.middlewares')

const getAllModels = async (req, res, next) => {
  try {
    if (req.query.page && !isNaN(parseInt(req.query.page))) {
      const numModels = await Model.countDocuments()
      let page = parseInt(req.query.page)
      let limit = req.query.limi ? parseInt(req.query.limit) : 10
      let numPages =
        numModels % limit > 0 ? numModels / limit + 1 : numModels / limit
      if (page > numPages || page < 1) {
        page = 1
      }

      const skip = (page - 1) * limit

      const allModels = await Model.find().skip(skip).limit(limit)

      return res.status(200).json({
        info: {
          total: numModels,
          page: page,
          limit: limit,
          next:
            numPages >= page + 1
              ? `/api/v1/models?page=${page + 1}&limit=${limit}`
              : null,
          prev:
            page != 1 ? `/api/v1/models?page=${page - 1}&limit=${limit}` : null,
        },
        results: allModels,
      })
    } else {
      const allModels = await Model.find().limit(10)
      const numModels = await Model.countDocuments()

      return res.status(200).json({
        info: {
          total: numModels,
          page: 1,
          limit: 10,
          next: numModels > 10 ? `/api/v1/models?page=2&limit=10` : null,
          prev: null,
        },
        results: allModels,
      })
    }
  } catch (error) {
    return next('Cannot find characters', error)
  }
}

const createModels = async (req, res, next) => {
  try {
    const newModel = new Model({
      ...req.body,
      image: req.file ? req.file.path : 'Not image found',
    })
    const createdModel = await newModel.save()
    return res.status(201).json(createdModel)
  } catch (error) {
    return next('Failed creating Model', error)
  }
}

const deleteModel = async (req, res, next) => {
  try {
    const { id } = req.params
    const model = await Model.findByIdAndDelete(id)
    if (model.image) {
      deleteImgCloudinary(model.image)
    }
    return res.status(200).json(model)
  } catch (error) {
    return next('Error deleting model', error)
  }
}

module.exports = { getAllModels, createModels, deleteModel }
