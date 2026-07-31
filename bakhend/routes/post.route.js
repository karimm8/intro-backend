import {Router} from 'express'
import { createPost,getPost,updatePost,deletePost } from '../controlles/post.controlle.js'

const router = Router()

router.route('/create').post(createPost)
router.route('/read').get(getPost)
router.route('/update/:id').patch(updatePost)
router.route('/delete/:id').delete(deletePost)

export default router