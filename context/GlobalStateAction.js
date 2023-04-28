import { ACTION_TYPE } from "./ActionType";
import {
  catchErrors,
  getToken,
  saveToken,
  deleteToken,
  decodeTokenDetails,
} from "../libs";
import { axiosInstance, AUTH_TOKEN_KEY, ROOM_TOKEN_KEY } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ToastMessages from "../components/ToastMessages";

const handleLoading = (dispatch, value) => {
  dispatch({ type: ACTION_TYPE.SET_LOADING, payload: value });
};

const handleSubmitting = (dispatch, value) => {
  dispatch({ type: ACTION_TYPE.SET_SUBMITTING, payload: value });
};

export const login = async (dispatch, value, resetForm) => {
  try {
    handleSubmitting(dispatch, true);
    const { data } = await axiosInstance.post("/login", value);
    if (data?.success) {
      await saveToken(AUTH_TOKEN_KEY, data?.access_token);
      const userId = await decodeTokenDetails(data?.access_token);
      const payload = { isSignIn: true, userId };
      dispatch({ type: ACTION_TYPE.USER_AUTH, payload });
      ToastMessages.show({ message: "Login Successfully" });
      return resetForm();
    }
  } catch (error) {
    catchErrors(dispatch, error);
  }
};

export const signUp = async (dispatch, value, resetForm) => {
  try {
    handleSubmitting(dispatch, true);
    const { data } = await axiosInstance.post("/register", value);
    if (data?.success) {
      await saveToken(AUTH_TOKEN_KEY, data?.access_token);
      const userId = await decodeTokenDetails(data?.access_token);
      const payload = { isSignIn: true, userId };
      dispatch({ type: ACTION_TYPE.USER_AUTH, payload });
      ToastMessages.show({ message: "Signup Successfully" });
      return resetForm();
    }
  } catch (error) {
    catchErrors(dispatch, error);
  }
};

export const logout = async (dispatch) => {
  try {
    handleLoading(dispatch, true);
    const { data } = await axiosInstance.post("/logout");
    if (data?.success) {
      await deleteToken(AUTH_TOKEN_KEY);
      await AsyncStorage.clear();
      const payload = { isSignIn: false, userId: "" };
      dispatch({ type: ACTION_TYPE.USER_AUTH, payload });
      return ToastMessages.show({ message: "Logout Successfully" });
    }
  } catch (error) {
    catchErrors(dispatch, error);
  }
};

export const joinPublicRoom = async (dispatch, value, resetForm) => {
  try {
    handleSubmitting(dispatch, true);
    const { data } = await axiosInstance.post("/public-room", value);
    if (data?.success) {
      await saveToken(ROOM_TOKEN_KEY, data?.room_code);
      await AsyncStorage.setItem("room_code", data?.room_code);
      await AsyncStorage.setItem("room_name", data?.room_name);
      const payload = {
        is_active: true,
        room: {
          code: data?.room_code,
          name: data?.room_name,
        },
      };
      dispatch({ type: ACTION_TYPE.JOIN_ROOM, payload });
      ToastMessages.show({ message: "Room Join Successfully" });
      return resetForm ? resetForm() : null;
    }
  } catch (error) {
    catchErrors(dispatch, error);
  }
};

export const joinPrivateRoom = async (dispatch, value, resetForm) => {
  try {
    handleSubmitting(dispatch, true);
    const { data } = await axiosInstance.post("/private-room", value);
    if (data?.success) {
      await saveToken(ROOM_TOKEN_KEY, data?.room_code);
      await AsyncStorage.setItem("room_code", data?.room_code);
      await AsyncStorage.setItem("room_name", data?.room_name);
      const payload = {
        is_active: true,
        room: {
          code: data?.room_code,
          name: data?.room_name,
        },
      };
      dispatch({ type: ACTION_TYPE.JOIN_ROOM, payload });
      ToastMessages.show({ message: "Room Join Successfully" });
      return resetForm ? resetForm() : null;
    }
  } catch (error) {
    catchErrors(dispatch, error);
  }
};

export const leaveRoom = async (dispatch) => {
  try {
    handleLoading(dispatch, true);
    const room_code = await getToken(ROOM_TOKEN_KEY);
    const { data } = await axiosInstance.post("/leave-room", { room_code });
    if (data?.success) {
      await deleteToken(ROOM_TOKEN_KEY);
      await AsyncStorage.removeItem("room_code");
      await AsyncStorage.removeItem("room_name");
      const payload = {
        is_active: false,
        room: {
          code: "",
          name: "",
          messages: [],
          users: [],
        },
      };
      dispatch({ type: ACTION_TYPE.JOIN_ROOM, payload });
      return ToastMessages.show({ message: "Leave Room Successfully" });
    }
  } catch (error) {
    catchErrors(dispatch, error);
  }
};

export const getAllRooms = async (dispatch, query = null) => {
  try {
    const { data } = await axiosInstance(`/rooms?query=${query}`);
    if (data?.success) {
      return dispatch({
        type: ACTION_TYPE.GET_ROOM_LIST,
        payload: data?.rooms,
      });
    }
  } catch (error) {
    catchErrors(dispatch, error);
  }
};

export const createRoom = async (dispatch, postData, resetForm) => {
  try {
    handleSubmitting(dispatch, true);
    const { data } = await axiosInstance.post("/create-room", postData);
    if (data?.success) {
      dispatch({ type: ACTION_TYPE.NEW_ROOM_CODE, payload: data?.room_code });
      resetForm();
      await AsyncStorage.setItem("new_room_code", data?.room_code);
      return ToastMessages.show({
        message: "The New Room is Created",
      });
    }
  } catch (error) {
    catchErrors(dispatch, error);
  }
};

export const addMessage = async (dispatch, message) => {
  dispatch({ type: ACTION_TYPE.ADD_MESSAGE, payload: message });
};

export const setInitMessages = async (dispatch, room_code) => {
  try {
    const { data } = await axiosInstance(`/room-messages/${room_code}`);
    if (data?.success) {
      return dispatch({
        type: ACTION_TYPE.SET_INIT_MESSAGES,
        payload: data?.messages,
      });
    }
  } catch (error) {
    catchErrors(dispatch, error);
  }
};

export const reloadPrevState = async (dispatch) => {
  try {
    const auth_token = await getToken(AUTH_TOKEN_KEY);
    const room_token = await getToken(ROOM_TOKEN_KEY);
    const new_room_code = await AsyncStorage.getItem("new_room_code");
    const room_name = await AsyncStorage.getItem("room_name");
    const room_code = await AsyncStorage.getItem("room_code");
    const user_id = await AsyncStorage.getItem("user_id");

    const data = {
      isUserInRoom: room_token ? true : false,
      isSignIn: auth_token ? true : false,
      newRoomCode: new_room_code ?? "",
      userId: user_id ?? "",
      room: {
        code: room_code ?? "",
        name: room_name ?? "",
      },
    };
    dispatch({ type: ACTION_TYPE.RELOAD_PREV_STATE, payload: data });
  } catch (error) {
    catchErrors(dispatch);
  }
};
