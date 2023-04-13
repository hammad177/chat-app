import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";
import { catchErrors } from "./CatchError";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToken = async (key, token) => {
  try {
    await SecureStore.setItemAsync(key, token);
  } catch (error) {
    catchErrors();
  }
};

export const getToken = async (key) => {
  try {
    const token = await SecureStore.getItemAsync(key);
    if (!token) return false;
    return token;
  } catch (error) {
    catchErrors();
    return false;
  }
};

export const deleteToken = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    catchErrors();
  }
};

export const decodeTokenDetails = async (token) => {
  try {
    const { _id } = jwtDecode(token);
    await AsyncStorage.setItem("user_id", _id);
    return _id;
  } catch (error) {
    catchErrors();
  }
};
