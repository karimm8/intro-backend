import { Post } from '../models/post.model.js'

// create a post
const createPost = async (req,res) => {
    try {
        const {name,description,age} = req.body

        // basic the validation
        if(!name || !description || !age){
            return res.status(400).json({message:'All fields are important !!'})
        }

        // create user
        const post = await Post.create({
            name,
            description,
            age
        })

        res.status(201).json({
            message: 'post created',
            post
        })
    } catch (error) {
        res.status(500).json({message:'internal server error',error:error.message})
    }
}

// read a post
const getPost = async(req,res) => {
    try {
        const posts = await Post.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            error
        })
    }
}

// update a post
const updatePost = async(req,res) => {
    try {
        // basic validation to check if body is empty
        
        // {name:x,description:y,age:z} ==> [name,description,age]
        // {} = truthy
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({
                message:"no data provided for update"
            })
        }

        const post = await Post.findByIdAndUpdate(req.params.id,req.body,{new:true})

        if(!post){
            return res.status(400).json({
                message:"post not found"
            })
        }

        res.status(200).json({
            message:"update to post successfuly",
            post
        })
    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            error
        })
    }
}

// delete a post
const deletePost = async(req,res) => {
    try {
        const deleted = await Post.findOneAndDelete(req.params.id)

        if(!deleted){
            return res.status(400).json({
                message:"post not found"
            })
        }

        res.status(200).json({
            message:"delete to post successfuly",
            deleted
        })
    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            error
        })
    }
}

export{
    createPost,
    getPost,
    updatePost,
    deletePost
}