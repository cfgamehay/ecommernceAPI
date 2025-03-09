import { userModel } from '~/models/userModel'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { env } from '~/config/environment'
import { generateJWT } from '~/utils/generateJWT'
import { ref } from 'joi'

const registerUser = async (userData) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(userData.password, salt)
    userData.password = hashed
    //create new user
    const user = await userModel.registerUser(userData)
    return user
  } catch (error) {
    throw new Error(error)
  }
}
let refreshTokenArray = []

const loginUser = async (userData) => {
  try {
    const user = await userModel.findOne(userData)
    if (!user) {
      throw new Error('User not found')
    }

    const validatePassword = await bcrypt.compare(userData.password, user.password)
    if (!validatePassword) {
      throw new Error('Password is not correct')
    }
    if (user && validatePassword) {
      const accessToken = generateJWT.generateAccessToken(user)
      const refreshToken = generateJWT.generateRefreshToken(user)
      refreshTokenArray.push(refreshToken)
      const { password, ...other } = user

      return { ...other, accessToken, refreshToken }

    }
  }
  catch (error) {
    throw new Error(error)
  }
}
//refresh token
const refreshToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error('Refresh token is required')
  }
  if (!refreshTokenArray.includes(refreshToken)) {
    throw new Error('Invalid refresh token')
  }
  let accessToken
  let newRefreshToken
  jwt.verify(refreshToken, env.JWT_REFRESH_KEY, (err, user) => {
    if (err) {
      throw new Error('Invalid refresh token')
    }
    refreshTokenArray = refreshTokenArray.filter((t) => t !== refreshToken)
    accessToken = generateJWT.generateAccessToken(user)
    newRefreshToken = generateJWT.generateRefreshToken(user)
    refreshTokenArray.push(newRefreshToken)

  })
  return { accessToken: accessToken, refreshToken: newRefreshToken }
}

const logout = async (refreshToken) => {
  refreshTokenArray = refreshTokenArray.filter((t) => t !== refreshToken)
}

export const authService = {
  registerUser,
  loginUser,
  refreshToken,
  logout
}