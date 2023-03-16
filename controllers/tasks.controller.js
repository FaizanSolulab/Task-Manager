const Task = require("../models/task.model");
const asyncHandler = require("express-async-handler");
const logger = require("../logger");

//@desc GET all tasks
//@route GET /api/v1/tasks
//@access public
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json(tasks);
});


//@desc GET a task
//@route GET /api/v1/tasks/:id
//@access public
const getATask = asyncHandler(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    logger.error("Task not found");
    res.status(404).send({error: "Task not found"});
    return;
  }

  res.status(200).json(task);
});


//@desc POST a task
//@route POST /api/v1/tasks
//@access public
const createTask = asyncHandler(async (req, res) => {
  const task = await Task.create(req.body);
  logger.info(`New task created with id $(task._id)`);
  res.status(201).json(task);
});


//@desc PUT a task
//@route PUT /api/v1/tasks/:id
//@access public
const editTask = asyncHandler(async (req, res) => {

    const { id: taskID } = req.params;

    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
    });
  
    if (!task) {
      logger.error(`No task with id : ${taskID}`);
      res.status(404).send({error: "Task not found"});

    }
  
    res.status(200).json({ task });
});


//@desc DELETE a task
//@route DELETE /api/v1/tasks/:id
//@access public
const deleteTask = asyncHandler (async(req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if(!task){
        logger.error(`No task with id : ${taskID}`);
    }
    res.status(200).json({ task });
});

module.exports = {
  getTasks,
  getATask,
  createTask,
  editTask,
  deleteTask,
};