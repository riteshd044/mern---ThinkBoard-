import mongoose from 'mongoose';

export const connectDB = async () => {
    try{
        mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    }catch(e){
        console.log(e);
        process.exit(1);
    }
}
