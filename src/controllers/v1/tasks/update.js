const { body } = require("express-validator");
const HttpStatus = require("http-status-codes");
const HttpException = require("@exceptions/httpException");
const { Task } = require("@models");

exports.execute = async (req, res, next) => {
  await Promise.resolve()
    .then(async () => {
      const { title = null, content = null } = req.body;
      const idTask = req.params.id;
      const userId = req.accessToken.userId;
      let task = await Task.findOne({
        where: {
          id: idTask,
          userId: userId,
        },
      });
      if (task === null) {
        throw HttpException(HttpStatus.NOT_FOUND, "Task not found");
      }
      if (title !== null) {
        task.title = title;
      }
      if (content !== null) {
        task.content = content;
      }
      await task.save();
      res.json(task);
    })
    .catch(next);
};
