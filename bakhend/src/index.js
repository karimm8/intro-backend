import dotenv from 'dotenv'
import connectDB from './config/database.js'
import app from './app.js'
import dns from 'dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config({
    path:'./.env'
})

const startServer = async() =>{
    try {
        await connectDB()

        app.on('error',(error) => {
              console.log('ERROR',error);
              throw error
        })

        app.listen(process.env.PORT || 8000, ()=>{
            console.log(`server is running in the port: ${process.env.PORT}`);
            
        })

    } catch (error) {
        console.log('mongodb is connected failed',err);
        
    }
}

startServer()