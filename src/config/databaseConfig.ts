import mongoose from 'mongoose';
import config from './config';


const connectDatabase = async (): Promise<typeof mongoose> => {
    try {
        const connection = await mongoose.connect(config.mongoUri);
        console.log(`MongoDB Connected: ${connection.connection.host}`);
        return connection;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};


export default connectDatabase;
