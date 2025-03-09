import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { categoryController } from '~/controllers/categoryController'
import { categoryValidation } from '~/validations/categoryValidation'
import { upload } from '~/config/multer'
const Router = express.Router()

Router.route('/')
  .get(categoryController.getAllCategory)
  .post(upload.single('images'), categoryValidation.create, categoryController.create)

Router.route('/:id')
  .get(categoryController.findOneById)
  .put(upload.single('images'), categoryValidation.update, categoryController.update)
  .delete(categoryController.remove)
export const categoryRoute = Router