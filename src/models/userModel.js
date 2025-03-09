import Joi from 'joi'
import { create, times, update } from 'lodash'
import { GET_DB } from '~/config/mongodb'


const USER_COLLECTION_NAME = 'users'
const USER_COLLECTION_SCHEMA = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  isAdmin: Joi.boolean().default(false),
  created_at: Joi.date().default(new Date()),
  updated_at: Joi.date().default(new Date())
}).unknown(true)

const registerUser = async (userData) => {
  try {
    const value = await USER_COLLECTION_SCHEMA.validateAsync(userData, { abortEarly: false })
    const usernameIsExist = await GET_DB().collection(USER_COLLECTION_NAME).findOne({ username: userData.username })
    const emailIsExist = await GET_DB().collection(USER_COLLECTION_NAME).findOne({ email: userData.email })

    if (usernameIsExist) {
      throw new Error('Username is already exist')
    } else if (emailIsExist) {
      throw new Error('Email is already exist')
    }

    const user = await GET_DB().collection(USER_COLLECTION_NAME).insertOne(value)
    return user
  } catch (error) {
    throw new Error(error)
  }
}

const findOne = async (userData) => {
  try {
    const user = await GET_DB().collection(USER_COLLECTION_NAME).findOne({ username: userData.username })
    return user
  } catch (error) {
    throw new Error(error)
  }
}
export const userModel = {
  USER_COLLECTION_NAME,
  USER_COLLECTION_SCHEMA,
  registerUser,
  findOne

}