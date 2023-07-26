import { userController } from './controllers'
import { userService } from './service'
import { passwordRegexp } from './validation'
import { userRouter } from './routes'
import { User } from './types'

export {
  passwordRegexp,
  userRouter,
  userService,
  userController,
  User
}
