import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectInstance = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB Connected: ${connectInstance.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export { connectDB };
