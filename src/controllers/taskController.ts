import { Request as ExpressRequest, Response } from "express";
import { Task } from "../models/Task";
import { User } from "../models/User";

interface Request extends ExpressRequest {
  user?: { id: number };
}
class TaskController {
  async getTasks(req: Request, res: Response) {
    try {
      const tasks = await Task.findAll({ where: { user_id: req.user?.id } });
      res.json(tasks);
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send(err.message);
    }
  }

  async createTask(req: Request, res: Response) {
    try {
      console.log(req.body);
      // Get authenticated user's id
      const userId = req.user?.id;
      // Create new task object
      const task = new Task({
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
        userId: userId, // Assign authenticated user's id to the task
      });

      // Save task to database
      await task.save();

      res.status(201).send(task); // Return newly created task object
    } catch (error: any) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }

  async completeTask(req: Request, res: Response) {
    try {
      const task = await Task.findOne({
        where: {
          id: req.params.id,
          userId: req.user?.id, // ensure task belongs to authenticated user
        },
      });

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      task.completed = true;
      await task.save();

      return res.json({ task });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  async deleteTask(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.user?.id;
    console.log(id, userId);
    try {
      const task = await Task.findOne({ where: { id: id, userId: userId } });

      if (!task) {
        return res.status(404).send("Task not found");
      }

      await task.destroy();

      // res.status(204).send(`task id : ${id} is deletetd `);
      return res.json({ task });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
  async indexTask(req: Request, res: Response) {
    try {
      // Find the authenticated user
      const authenticatedUser = req.user;
      // Find all tasks of the authenticated user
      const tasks = await Task.findAll({
        where: { userId: authenticatedUser?.id },
        // include: [{ model: User,as: 'user' }],
      });

      // Send the tasks as a response
      res.json(tasks);
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
export default new TaskController();
