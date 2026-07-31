import express from 'express'
//route import
import userRouter from '../routes/user.route.js' 
import postRouter from '../routes/post.route.js' 

const app = express()

app.use(express.json())

app.get('/test', (req, res) => {
    console.log("TEST ROUTE HIT");
    res.send("ok");
});

// route declaration
app.use('/api/v1/users',userRouter)
app.use('/api/v1/posts',postRouter)

// example route: http://localhost:4000/api/v1/users/register

export default app