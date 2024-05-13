import mongoose from "mongoose";
import { config } from "./config";

const connectDB = async () => {
    try {

        mongoose.connection.on('connected', () => {
            console.log('Successfully Database Connected');
            
        })

        mongoose.connection.on('error', (error) => {
            console.error('Failed to connect db', error);
            
        })
        
        mongoose.connect(config.dataBaseUrl as string)


    } catch (error) {
        console.error('Failed to connect db', error);
        process.exit(1);
        
    }   
}

export default connectDB;