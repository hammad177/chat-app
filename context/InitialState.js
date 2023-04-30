export const initialState = {
  roomsList: [],
  isLoading: false,
  isSubmitting: false,
  newRoomCode: "",
  userId: "",
  isSignIn: null,
  isUserInRoom: null,
  room: {
    code: "",
    name: "",
    users: [],
    messages: [],
  },
};
