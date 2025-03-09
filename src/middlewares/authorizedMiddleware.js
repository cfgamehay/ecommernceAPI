import jwt from 'jsonwebtoken'
import { env } from '~/config/environment'
//xác thực người dùng
const authorizedMiddleware = (req, res, next) => {
  const token = req.header('token')
  if (!token) {
    return res.status(401).json({ message: 'NO TOKEN FOUND' })
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], env.JWT_ACCESS_KEY)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

const authorizedMiddlewareAdmin = (req, res, next) => {
  authorizedMiddleware(req, res, () => {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'you are not allow' })
    }
    next()
  })
}

export const authorizedMiddlewares = {
  authorizedMiddleware,
  authorizedMiddlewareAdmin
}