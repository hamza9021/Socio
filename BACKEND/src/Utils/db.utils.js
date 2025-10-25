import mongoose from "mongoose";


const dbOptions = {
    maxPoolSize: process.env.MAX_POOL_SIZE,
    minPoolSize: process.env.MIN_POOL_SIZE,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 60000,
    retryWrites: true,
    w: 'majority',
}

const connectDB = async () => {
    try {
        const connectInstance = await mongoose.connect(process.env.MONGODB_URL,dbOptions);
        console.log(`MongoDB Connected: ${connectInstance.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export { connectDB };
