const UserModel = require("../models/Users");
const argon2 = require("argon2");
const {
  createAccessToken,
  ResponseError,
  ResponseErrorTypes,
} = require("../libs");

exports.signUp = async (req, res) => {
  try {
    if (req?.body?.password)
      req.body.password = await argon2.hash(req.body.password);

    const user = await UserModel.create(req.body);

    const { email, _id } = user;
    const access_token = createAccessToken({ email, _id });
    user.access_token = access_token;
    await user.save();

    res.status(201).json({ status: true, access_token });
  } catch (error) {
    const { status, response } = ResponseError(error);
    res.status(status).json(response);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({
      email,
    });
    if (!user)
      throw {
        type: ResponseErrorTypes.UNAUTHORIZE,
        message: "email not registered",
      };

    const comparePassword = await argon2.verify(user?.password, password);
    if (!comparePassword)
      throw {
        type: ResponseErrorTypes.UNAUTHORIZE,
        message: "invalid email or password",
      };

    const access_token = createAccessToken({ email, _id: user._id });
    user.access_token = access_token;
    await user.save();

    res.json({ status: true, access_token });
  } catch (error) {
    const { status, response } = ResponseError(error);
    res.status(status).json(response);
  }
};

exports.logout = async (req, res) => {
  try {
    const user = await UserModel.findById(req.session_id);
    user.access_token = null;
    await user.save();
    res.json({ status: true, message: "user logout successfully" });
  } catch (error) {
    const { status, response } = ResponseError(error);
    res.status(status).json(response);
  }
};
