const { Task } = require("@models");

exports.execute = async (req, res, next) => {
  const userId = req.accessToken.userId;
  const { page = 1, perPage = 10 } = req.query;
  const options = {
    page: page,
    paginate: parseInt(perPage),
    order: [["id", "DESC"]],
    where: {
      userId: userId,
    },
  };
  result = await Task.paginate(options);
  res.json(result);
};
