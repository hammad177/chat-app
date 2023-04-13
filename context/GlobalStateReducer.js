import { ACTION_TYPE } from "./ActionType";

export default (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_LOADING:
      return {
        ...state,
        isLoading: action?.payload,
      };
    case ACTION_TYPE.SET_SUBMITTING:
      return {
        ...state,
        isSubmitting: action?.payload,
      };
    case ACTION_TYPE.GET_ERROR:
      return {
        ...state,
        isLoading: action?.payload,
        isSubmitting: action?.payload,
      };

    case ACTION_TYPE.USER_AUTH:
      return {
        ...state,
        ...action?.payload,
        isLoading: false,
        isSubmitting: false,
      };
    case ACTION_TYPE.JOIN_ROOM:
      return {
        ...state,
        room: {
          ...state.room,
          ...action?.payload?.room,
        },
        isUserInRoom: action?.payload?.is_active,
        isLoading: false,
        isSubmitting: false,
      };
    case ACTION_TYPE.GET_ROOM_LIST:
      return {
        ...state,
        roomsList: action?.payload,
        isLoading: false,
        isSubmitting: false,
      };
    case ACTION_TYPE.NEW_ROOM_CODE:
      return {
        ...state,
        newRoomCode: action?.payload,
        isLoading: false,
        isSubmitting: false,
      };
    case ACTION_TYPE.ADD_MESSAGE:
      return {
        ...state,
        room: {
          ...state?.room,
          messages: [action?.payload, ...state?.room?.messages],
        },
      };
    case ACTION_TYPE.RELOAD_PREV_STATE:
      return {
        ...state,
        isSignIn: action?.payload?.isSignIn,
        isUserInRoom: action?.payload?.isUserInRoom,
        newRoomCode: action?.payload?.newRoomCode,
        userId: action?.payload?.userId,
        room: { ...state.room, ...action?.payload?.room },
        isLoading: false,
        isSubmitting: false,
      };
    default:
      state;
  }
};
