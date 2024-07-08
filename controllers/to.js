import express from "express";
import DModel from '../model/To.js';
const router = express.Router();

router.post("/add", async (req, res) => {
    try {
        const { Name, Task } = req.body;
        if (!Name || !Task) {
            res.status(400);
            throw new Error("Enter All Fields");
        }
        const taskk = await DModel.create({ Name, Task });
        res.status(200).json({ taskk });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating task" });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const dd = await DModel.findById(req.params.id);
        if (!dd) {
            res.status(404);
            throw new Error("Task not found");
        }
        await DModel.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({ message: "Task successfully deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error deleting task" });
    }
});

export default router;