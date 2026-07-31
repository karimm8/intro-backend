import {Router} from 'express'
import { loginUser, registreUser, logoutUser } from '../controlles/user.controlle.js'

const router = Router()

router.route('/register').post(registreUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)

export default router