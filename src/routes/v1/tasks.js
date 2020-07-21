const router = require("express").Router();
const getAllTasksController = require("@controllers/v1/tasks/getAll");
const getTaskByIdController = require("@controllers/v1/tasks/getById");
const createTaskController = require("@controllers/v1/tasks/create");
const updateTaskController = require("@controllers/v1/tasks/update");
const deleteTaskController = require("@controllers/v1/tasks/delete");
const authMiddleware = require("@middlewares/auth");
const validator = require("@middlewares/validator");

router.get("", authMiddleware, getAllTasksController.execute);
router.get("/:id", authMiddleware, getTaskByIdController.execute);
router.post(
  "",
  authMiddleware,
  createTaskController.validationRules(),
  validator,
  createTaskController.execute
);
router.patch("/:id", authMiddleware, updateTaskController.execute);
router.delete("/:id", authMiddleware, deleteTaskController.execute);

module.exports = router;
