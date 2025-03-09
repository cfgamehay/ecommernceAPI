//Controller này sẽ xử lý các request liên quan đến board
import { StatusCodes } from 'http-status-codes'
import { variantService } from '~/services/variantService'

const create = async (req, res, next) => {
  try {
    const createVariant = await variantService.create(req.body)
    const result = await variantService.findOneById(createVariant.insertedId)
    res.status(StatusCodes.CREATED).json(result)
  } catch (error) {
    next(error)
  }

}
const update = async (req, res, next) => {
  try {

    const productId = req.params.id
    const updateVariant = await variantService.update(productId, req.body)

    res.status(StatusCodes.CREATED).json(updateVariant)
  } catch (error) {

    next(error)

  }
}

const remove = async (req, res, next) => {
  try {
    const variantId = req.params.id
    const variant = await variantService.remove(variantId)

    res.status(StatusCodes.NO_CONTENT).json(variant)
  } catch (error) {

    next(error)

  }
}

const findOneById = async (req, res, next) => {
  try {
    const variantId = req.params.id
    const variant = await variantService.findOneById(variantId)

    res.status(StatusCodes.OK).json(variant)
  } catch (error) {

    next(error)

  }
}

const getAllVariants = async (req, res, next) => {
  try {
    const variants = await variantService.findAll()

    res.status(StatusCodes.OK).json(variants)
  } catch (error) {

    next(error)

  }
}

export const variantController = {
  create,
  update,
  remove,
  findOneById,
  getAllVariants

}