//đại diện cho tất cả các route của version 1
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { productRoute } from './productRoute'
import { categoryRoute } from './categoryRoute'
import { authRoute } from './authRoute'
const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'API V1 are ready to use.' })

})

Router.use('/products', productRoute)
Router.use('/categories', categoryRoute)
Router.use('/auth', authRoute)
export const APIsV1 = Router

//200 OK
