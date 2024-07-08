import mongoose from "mongoose";
import config from "config";

let connectDB = async ()=>{
    try {
        await mongoose.connect(config.get("DBurl"))
        console.log(`DB connected successfully`)
    } catch (error) {
        console.log(error);
    }
}
connectDB()