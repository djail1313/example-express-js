const { body } = require("express-validator");
const HttpStatus = require("http-status-codes");
const { Task } = require("@models");

exports.validationRules = () => {
  return [
    body("title", "Title doesn't exists").exists(),
    body("content", "Content doesn't exists").exists(),
  ];
};

exports.execute = async (req, res, next) => {
  await Promise.resolve()
    .then(async () => {
      const { title, content } = req.body;
      const userId = req.accessToken.userId;
      let task = await Task.create({
        userId: userId,
        title: title,
        content: content,
      });
      res.status(HttpStatus.CREATED).json(task);
    })
    .catch(next);
};
