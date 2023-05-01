import React, { useContext } from "react";
import { Divider, HStack, Modal, Pressable, Text } from "native-base";
import DeleteIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EditIcon from "react-native-vector-icons/Feather";
import ToastMessages from "./ToastMessages";
import { SocketContext } from "../context/SocketContext";
import GlobalStateContext from "../context/GlobalStateContext";
import { deleteMessage } from "../context/GlobalStateAction";

const ActionModal = ({ actionModal, handleActionModal }) => {
  const socket = useContext(SocketContext);
  const { dispatch } = useContext(GlobalStateContext);
  const closeModal = () => handleActionModal(false);
  const editMessage = () => {
    ToastMessages.show({
      message: "This functionality is not implemented yet",
      status: "warning",
    });
  };
  const deleteMsg = () => {
    const { room_code, message_id } = actionModal;
    socket.emit("delete-message", { room_code, message_id });
    deleteMessage(dispatch, message_id);
    closeModal();
  };
  return (
    <Modal
      isOpen={actionModal?.open}
      closeOnOverlayClick={true}
      onClose={closeModal}
      size="sm"
    >
      <Modal.Content>
        <Modal.Body>
          <Pressable p="2" onPress={deleteMsg}>
            <HStack justifyContent="space-between">
              <Text fontSize="xl" color="#444">
                Delete
              </Text>
              <DeleteIcon name="delete" size={22} color="#555" />
            </HStack>
          </Pressable>
          <Divider />
          <Pressable p="2" onPress={editMessage}>
            <HStack justifyContent="space-between">
              <Text fontSize="xl" color="#444">
                Edit
              </Text>
              <EditIcon name="edit" size={20} color="#555" />
            </HStack>
          </Pressable>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default ActionModal;
