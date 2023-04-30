const RoomModel = require("../models/Room");
const MessagesModel = require("../models/Messages");
const argon2 = require("argon2");
const { ResponseError, ResponseErrorTypes } = require("../libs");

exports.createRoom = async (req, res) => {
  try {
    if (!req?.body?.is_public) {
      if (req?.body?.password) {
        const hash = await argon2.hash(req?.body?.password);
        req.body.password = hash;
      }
    } else {
      delete req?.body?.password;
    }
    req.body.created_by = req.session_id;
    req.body.room_users = [
      {
        user_id: req.session_id,
        is_admin: true,
        is_active: true,
      },
    ];
    const room = await RoomModel.create(req.body);
    res.status(201).json({ success: true, room_code: room.room_code });
  } catch (error) {
    const { status, response } = ResponseError(error);
    res.status(status).json(response);
  }
};

exports.publicRoom = async (req, res) => {
  try {
    const { room_code } = req.body;
    const room = await RoomModel.findOne({ room_code, is_public: true });
    if (!room)
      throw {
        type: ResponseErrorTypes.NOT_FOUND,
        message: "no room found",
      };

    const is_prev_login = room?.room_users?.some(
      (val) => val.user_id == req.session_id
    );
    if (is_prev_login) {
      await RoomModel.updateOne(
        { room_code, is_public: true, "room_users.user_id": req.session_id },
        {
          $set: {
            "room_users.$.is_active": true,
          },
        }
      );
    } else {
      const data = {
        is_admin: false,
        is_active: true,
        user_id: req.session_id,
      };
      room?.room_users?.push(data);
      await room.save();
    }
    res.json({ success: true, room_code, room_name: room?.room_name });
  } catch (error) {
    const { status, response } = ResponseError(error);
    res.status(status).json(response);
  }
};

exports.privateRoom = async (req, res) => {
  try {
    const { password, room_code } = req.body;
    const room = await RoomModel.findOne({ room_code, is_public: false });
    if (!room)
      throw {
        type: ResponseErrorTypes.NOT_FOUND,
        message: "no room found",
      };

    const comparePassword = await argon2.verify(room?.password, password);
    if (!comparePassword)
      throw {
        type: ResponseErrorTypes.UNAUTHORIZE,
        message: "invalid credentials",
      };

    const is_prev_login = room?.room_users?.some(
      (val) => val.user_id == req.session_id
    );
    if (is_prev_login) {
      await RoomModel.updateOne(
        { room_code, is_public: true, "room_users.user_id": req.session_id },
        {
          $set: {
            "room_users.$.is_active": true,
          },
        }
      );
    } else {
      const data = {
        is_admin: false,
        is_active: true,
        user_id: req.session_id,
      };
      room?.room_users?.push(data);
      await room.save();
    }
    res.json({ success: true, room_code, room_name: room?.room_name });
  } catch (error) {
    const { status, response } = ResponseError(error);
    res.status(status).json(response);
  }
};

exports.leaveRoom = async (req, res) => {
  try {
    const { room_code } = req.body;
    const update = await RoomModel.updateOne(
      { room_code, "room_users.user_id": req.session_id },
      {
        $set: {
          "room_users.$.is_active": false,
        },
      }
    );
    if (!update.matchedCount && !update.modifiedCount)
      throw { type: ResponseErrorTypes.BAD_REQUEST, message: "request failed" };

    res.json({ success: true, message: "leave room successfully" });
  } catch (error) {
    const { status, response } = ResponseError(error);
    res.status(status).json(response);
  }
};

exports.geyAllRooms = async (req, res) => {
  try {
    const { query } = req.query;
    const filter = {};
    if (query && query !== "null") filter.$text = { $search: `${query}` };

    const match = { $match: filter };
    const lookup_user = {
      $lookup: {
        from: "users",
        localField: "created_by",
        foreignField: "_id",
        as: "user_details",
      },
    };
    const unwind = { $unwind: "$user_details" };
    const project = {
      $project: {
        room_name: 1,
        is_public: 1,
        email: "$user_details.email",
        display_name: "$user_details.display_name",
        created_at: 1,
        room_code: 1,
      },
    };
    const sort = { $sort: { created_at: -1 } };
    const limit = { $limit: 50 };

    const rooms = await RoomModel.aggregate([
      match,
      lookup_user,
      unwind,
      project,
      sort,
      limit,
    ]);

    res.json({ success: true, rooms });
  } catch (error) {
    const { status, response } = ResponseError(error);
    res.status(status).json(response);
  }
};

exports.getRoomUsers = async (req, res) => {
  try {
    const { room_id } = req.params;
    const room_details = await RoomModel.findById(room_id).select("room_users");
    if (!room_details)
      throw {
        type: ResponseErrorTypes.BAD_REQUEST,
        message: "failed to proceed request",
      };

    res.json({ success: true, room_users: room_details?.room_users });
  } catch (error) {
    const { status, response } = ResponseError(error);
    res.status(status).json(response);
  }
};

exports.getRoomMessages = async (req, res) => {
  try {
    const { room_code } = req.params;
    const messages = await MessagesModel.find({ sent_to: room_code }).sort({
      sent_at: -1,
    });

    res.json({ success: true, messages });
  } catch (error) {
    const { status, response } = ResponseError(error);
    res.status(status).json(response);
  }
};
