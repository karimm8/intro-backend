import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const connectInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`\n mongodb connected ${connectInstance.connection.host}`);
        
    }
    catch (error){
        console.log('connection failed',error);
        process.exit(1)
    }
}

export default connectDB