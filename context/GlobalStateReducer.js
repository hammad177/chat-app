import { ACTION_TYPE } from "./ActionType";

export default (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ACTION_TYPE.GET_ROOM_LIST:
      return {
        ...state,
        roomsList: action.payload,
        isLoading: false,
      };
    case ACTION_TYPE.NEW_ROOM_CODE:
      return {
        ...state,
        newRoomCode: action.payload,
        isLoading: false,
      };
    default:
      state;
  }
};
