import { User } from '../models/user.model.js'

const registreUser = async (req,res) => {
    try {
        const {username,email,password} = req.body

        // basic the validation
        if(!username || !email || !password){
            return res.status(400).json({message:'All fields are important !!'})
        }

        //check if the exist
        const existing = await User.findOne({email: email.toLowerCase()})
        if(existing){
            return res.status(400).json({message:'user already exist!'})
        }

        // create user
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn:false,
        })

        res.status(201).json({
            message: 'user registred',
            user:{id:user._id,email:user.email,username:user.username}
        })
    } catch (error) {
        res.status(500).json({message:'internal server error',error:error.message})
    }
}

const loginUser = async(req,res) => {
    try {
        // checking if the user exist
        const {email,password} = req.body

        const user = await User.findOne({
            email:email.toLowerCase()
        })

        if(!user) return res.status(400).json({
            message : "user not found"
        })
        // compare password
        const isMatch = await user.comparePassword(password)
        if(!isMatch){
            return res.status(400).json({message:'invalid credential'})
        }

        res.status(200).json({
            message:'User logged in',
            user:{
                id:user._id,
                email:user.email,
                username:user.username
            }
        })
    } catch (error) {
        res.status(500).json({message:'internal server error'})
    }
}

const logoutUser = async(req,res)=>{
    try {
        const {email} = req.body
        const user= await User.findOne({
            email:email.toLowerCase()
        })
        if(!user){
            res.status(404).json({message:'user not found'})
        }
        res.status(200).json({message:'logout successful'})
    } catch (error) {
        console.log(error);
        
        res.status(500).json({message:'internal server error',"error":{}})
    }
}

export{
    registreUser,
    loginUser,
    logoutUser
}