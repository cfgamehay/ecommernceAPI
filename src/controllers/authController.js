import { json } from 'express'
import { StatusCodes } from 'http-status-codes'
import { authService } from '~/services/authService'

const registerUser = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body)
    res.status(StatusCodes.CREATED).json(user)
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: error.message })
  }
}

const loginUser = async (req, res, next) => {
  try {
    const { refreshToken, ...user } = await authService.loginUser(req.body, res)

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      path:'/'
    })
    res.status(StatusCodes.OK).json(user)
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: error.message })
  }
}

const refreshToken = async (req, res, next) => {
  // console.log(req.cookies.refreshToken)
  const { refreshToken, accessToken } = await authService.refreshToken(req.cookies.refreshToken)

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'strict' })
  res.status(StatusCodes.OK).json({ accessToken: accessToken })
}

const logout = async (req, res, next) => {
  await authService.logout(req.cookies.refreshToken)
  res.clearCookie('refreshToken')
  res.status(StatusCodes.OK).json({ message: 'Logout successfully' })
}

export const authController = {
  registerUser,
  loginUser,
  refreshToken,
  logout
}