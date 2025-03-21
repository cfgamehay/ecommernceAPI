import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { productValidation } from '~/validations/productValidation'
import { productController } from '~/controllers/productController'
import { upload } from '~/config/multer'
import { authorizedMiddlewares } from '~/middlewares/authorizedMiddleware'


const Router = express.Router()

Router.route('/')
  .get(productController.getAllProducts)
  .post(upload.array('images', 20), productValidation.createNew, productController.createNew)
Router.route('/:id')
  .get(productController.getProduct)
  .put(upload.array('images', 20), productValidation.update, productController.update)
  .delete(productController.deleteProduct)

export const productRoute = Router