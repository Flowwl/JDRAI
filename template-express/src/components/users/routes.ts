import { Router } from 'express';
import { PERMISSIONS } from '@/enums';
import { authedCr } from '@/utils';
import { authMiddleware } from '@/middlewares';
import { userController } from './controllers';

const userRouter = Router()

// Retrieve me
userRouter.get('/me',
  authMiddleware.getRestrictHandler(PERMISSIONS.CAN_FIND_SELF),
  authedCr(userController.findMe)
)

// update me
userRouter.put('/me',
  authMiddleware.getRestrictHandler(PERMISSIONS.CAN_UPDATE_SELF),
  authedCr(userController.updateMe)
)

// Retrieve all Users
userRouter.get('/',
  authMiddleware.getRestrictHandler(PERMISSIONS.CAN_FIND_ALL_USERS),
  authedCr(userController.findAllUsers)
)


// Retrieve a single User with id
userRouter.get('/:id',
  authMiddleware.getRestrictHandler(PERMISSIONS.CAN_FIND_ONE_USER_BY_ID),
  authedCr(userController.findUserById)
)

// Update a User with id
userRouter.put('/:id',
  authMiddleware.getRestrictHandler(PERMISSIONS.CAN_UPDATE_USER),
  authedCr(userController.updateUserById)
)

export {
  userRouter
}
