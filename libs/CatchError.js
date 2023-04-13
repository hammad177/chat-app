import ToastMessages from "../components/ToastMessages";
import { ACTION_TYPE } from "../context/ActionType";

export const catchErrors = (dispatch, error) => {
  console.log({ error: error?.response?.data });
  if (dispatch) dispatch({ type: ACTION_TYPE.GET_ERROR, payload: false });

  let message = error?.response?.data?.message || "something want wrong";

  if (Array.isArray(message)) message = message.join(", ");

  ToastMessages.show({
    message,
    status: "error",
  });
};
