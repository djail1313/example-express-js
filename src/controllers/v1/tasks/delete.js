const { Task } = require("@models");
const HttpStatus = require("http-status-codes");
const HttpException = require("@exceptions/httpException");

exports.execute = async (req, res, next) => {
  await Promise.resolve()
    .then(async () => {
      const idTask = req.params.id;
      const userId = req.accessToken.userId;
      const task = await Task.findOne({
        where: {
          id: idTask,
          userId: userId,
        },
      });
      if (task === null) {
        throw HttpException(HttpStatus.NOT_FOUND, "Task not found");
      }
      await task.destroy();
      res.status(HttpStatus.NO_CONTENT).json();
    })
    .catch(next);
};
