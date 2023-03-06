const UsersModel = require("../models/Users");
const jwt = require("jsonwebtoken");
const { ResponseError, ResponseErrorTypes } = require("../libs");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "")?.trim();
    if (!token)
      throw {
        type: ResponseErrorTypes.UNAUTHORIZE,
        message: "please attach token",
      };

    const { _id } = jwt.verify(token, process.env.JWT_ACCESS_KEY);
    const user = await UsersModel.findOne({
      _id,
      access_token: { $ne: null },
    });
    if (!user)
      throw {
        type: ResponseErrorTypes.UNAUTHORIZE,
        message: "please login first",
      };

    req.session_id = _id;
    req.user = user;
    next();
  } catch (error) {
    const { status, response } = ResponseError(error);
    res.status(status).json(response);
  }
};

module.exports = auth;
