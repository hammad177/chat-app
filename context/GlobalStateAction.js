import { Alert, ToastAndroid } from "react-native";
import axiosInstance from "../config/axiosInstance";
import { ACTION_TYPE } from "./ActionType";

export const handleLoading = (dispatch, value) => {
  dispatch({ type: ACTION_TYPE.SET_LOADING, payload: value });
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
    Alert.alert("Server Error", "something want wrong");
  }
};

export const createRoom = async (dispatch, postData, resetForm) => {
  try {
    handleLoading(dispatch, true);
    const { data } = await axiosInstance.post("/create-room", postData);
    if (data?.success) {
      dispatch({ type: ACTION_TYPE.NEW_ROOM_CODE, payload: data?.room_code });
      resetForm();
      return ToastAndroid.showWithGravity(
        "Room Created",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
    }
  } catch (error) {
    handleLoading(dispatch, false);
    Alert.alert("Server Error", "something want wrong");
  }
};
