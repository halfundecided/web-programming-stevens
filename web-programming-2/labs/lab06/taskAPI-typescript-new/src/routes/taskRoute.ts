import { Request, Response } from "express";
const data = require("../data");
const tasksData = data.tasks;

export class Tasks {
  public routes(app): void {
    /**
     * GET /api/tasks
     * Shows a list of tasks
     * By default, it will show the first 20 tasks in the collection.
     * If a querystring variable ?skip=n is provided, you will skip the first n tasks.
     * If a querystring variable ?take=y is provided, it will show y number of results.
     * By default, the route will show up to 20 tasks; at most it will show 100 tasks.
     */
    app.route("/api/tasks").get(async (req: Request, res: Response) => {
      let skipinRoute = 0;
      let takeinRoute = 0;

      if (!req.query.skip) {
        skipinRoute = 0;
      } else {
        skipinRoute = parseInt(req.query.skip);
      }

      if (!req.query.take) {
        takeinRoute = 20;
      } else {
        takeinRoute = parseInt(req.query.take);

        if (takeinRoute < 0) {
          takeinRoute = 20;
        }
        if (takeinRoute > 100) {
          takeinRoute = 100;
        }
      }

      try {
        const allTask = await tasksData.getAll(skipinRoute, takeinRoute);
        res.json(allTask);
      } catch (e) {
        console.log(e);
        res.sendStatus(500).json({ error: e });
      }
    });
    /**
     * GET /api/tasks/:id
     * Shows the task with the supplied ID
     */
    app.route("/api/tasks/:id").get(async (req: Request, res: Response) => {
      try {
        const task = await tasksData.getTaskById(req.params.id);
        res.status(200).json(task);
      } catch (e) {
        res.status(404).json({ error: "Task not found" });
      }
    });
    /**
     * POST /api/tasks
     * Creates a task with the supplied detail and returns created object
     * fails request if not all details supplied
     */
    app.route("/api/tasks").post(async (req: Request, res: Response) => {
      const taskInfo = req.body;

      // do I still need those?
      if (!taskInfo) {
        res
          .status(400)
          .json({ error: "You must provide data to create a task" });
        return;
      }
      if (!taskInfo.title) {
        res.status(400).json({ error: "You must provide a title" });
        return;
      }
      if (!taskInfo.description) {
        res.status(400).json({ error: "You must provide a description" });
        return;
      }
      if (!taskInfo.hoursEstimated) {
        res.status(400).json({ error: "You must provide estimated hours" });
        return;
      }

      try {
        const newTask = await tasksData.createTask(
          taskInfo.title,
          taskInfo.description,
          taskInfo.hoursEstimated
        );
        res.status(200).json(newTask);
      } catch (e) {
        res.sendStatus(500).json({ error: e });
      }
    });
    /**
     * Updates the task with the supplied ID and returns the new task object
     * task: PUT calls must provide all details of the new state of the object
     * Note: you cannot manipulate comments in this route
     */
    app.route("/api/tasks/:id").put(async (req: Request, res: Response) => {
      let taskInfo = req.body;
      if (!taskInfo) {
        res
          .status(400)
          .json({ error: "You must provide data to update a task" });
        return;
      }

      try {
        await tasksData.getTaskById(req.params.id);
      } catch (e) {
        res.status(404).json({ error: "Task not found" });
        return;
      }

      if (
        !taskInfo.title ||
        !taskInfo.description ||
        !taskInfo.hoursEstimated
      ) {
        res
          .status(400)
          .json({ error: "You must provide all details of the new state" });
        return;
      }
      if (typeof taskInfo.completed === "undefined") {
        res.status(400).json({
          error:
            "Don't you want to update completion? you must provide if it's completed or not as well"
        });
      }

      try {
        const updatedTask = await tasksData.updateTask(
          req.params.id,
          taskInfo.title,
          taskInfo.description,
          taskInfo.hoursEstimated,
          taskInfo.completed
        );
        res.json(updatedTask);
      } catch (e) {
        res.status(500).json({ error: e });
      }
    });
    /**
     * Updates the task with the supplied ID and returns the new task object
     * task: PATCH calls only provide deltas of the value to update
     * Note: you cannot manipulate comments in this route
     */
    app.route("/api/tasks/:id").patch(async (req: Request, res: Response) => {
      let taskInfo = req.body;
      if (!taskInfo) {
        res
          .status(400)
          .json({ error: "You must provide data to update a task" });
      }

      try {
        await tasksData.getTaskById(req.params.id);
      } catch (e) {
        res.status(404).json({ error: "Task not found" });
        return;
      }

      try {
        const updatedTask = await tasksData.updateTaskForPatch(
          req.params.id,
          taskInfo.title,
          taskInfo.description,
          taskInfo.hoursEstimated,
          taskInfo.completed
        );
        res.json(updatedTask);
      } catch (e) {
        console.log(e);
        res.sendStatus(500);
      }
    });
    /**
     * Adds a new comment to the task
     * ids must be generated by the server, and not supplied
     */
    app
      .route("/api/tasks/:id/comments")
      .post(async (req: Request, res: Response) => {
        let taskId = req.params.id;
        let commentInfo = req.body;

        try {
          await tasksData.getTaskById(taskId);
        } catch (e) {
          res.status(404).json({ error: "Task not found" });
          return;
        }

        if (!commentInfo || !commentInfo.name || !commentInfo.comment) {
          res
            .status(400)
            .json({ error: "You must provide details of the comment" });
        }

        try {
          let newComment = await tasksData.addComment(
            taskId,
            commentInfo.name,
            commentInfo.comment
          );
          res.json(newComment);
        } catch (e) {
          res.status(500).json({ error: e });
        }
      });
    /**
     * Deletes the comment with an id of commentId on the task with an id of task Id
     */
    app
      .route("/api/tasks/:taskId/:commentId")
      .delete(async (req: Request, res: Response) => {
        let taskId = req.params.taskId;
        let commentId = req.params.commentId;

        try {
          await tasksData.getTaskById(taskId);
        } catch (e) {
          res.status(404).json({ error: "Task not found" });
          return;
        }

        try {
          await tasksData.removeComment(taskId, commentId);
          res.send("Comment was deleted");
        } catch (e) {
          res.status(404).json({ error: "Could not delete comment" });
        }
      });
  }
}
