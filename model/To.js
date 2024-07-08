import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, "Please enter the task name"],
    },
    Task: {
        type: String,
        required: [true, "Please enter the task"],
    }
});

const DModel = mongoose.model("todo", Schema);
export default DModel;