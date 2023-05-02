import React, { useContext, useEffect, useState } from "react";
import {
  Divider,
  HStack,
  Modal,
  Pressable,
  Text,
  Input,
  Button,
} from "native-base";
import DeleteIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EditIcon from "react-native-vector-icons/Feather";
import BackIcon from "react-native-vector-icons/Ionicons";
import { SocketContext } from "../context/SocketContext";
import GlobalStateContext from "../context/GlobalStateContext";
import { deleteMessage, editMessage } from "../context/GlobalStateAction";

const ActionModal = ({ actionModal, handleActionModal }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [message, setMessage] = useState("");
  const socket = useContext(SocketContext);
  const { dispatch } = useContext(GlobalStateContext);
  const closeModal = () => {
    setIsEdit(false);
    handleActionModal(false);
  };
  const editMsg = () => {
    if (message !== "" && actionModal?.message !== message) {
      const { room_code, message_id } = actionModal;
      socket.emit("edit-message", {
        room_code,
        message_id,
        message,
      });
      editMessage(dispatch, message_id, message);
      closeModal();
    }
  };
  const deleteMsg = () => {
    const { room_code, message_id } = actionModal;
    socket.emit("delete-message", { room_code, message_id });
    deleteMessage(dispatch, message_id);
    closeModal();
  };

  useEffect(() => {
    setMessage(actionModal?.message);
  }, [actionModal?.message]);
  return (
    <Modal
      isOpen={actionModal?.open}
      closeOnOverlayClick={true}
      onClose={closeModal}
      size="sm"
    >
      <Modal.Content>
        {!isEdit ? (
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
            <Pressable p="2" onPress={() => setIsEdit(true)}>
              <HStack justifyContent="space-between">
                <Text fontSize="xl" color="#444">
                  Edit
                </Text>
                <EditIcon name="edit" size={20} color="#555" />
              </HStack>
            </Pressable>
          </Modal.Body>
        ) : (
          <>
            <Modal.Header>
              <HStack>
                <BackIcon
                  onPress={() => setIsEdit(false)}
                  name="chevron-back"
                  size={22}
                  color="#555"
                />
                <Text mx="2" fontSize="lg">
                  Edit Message
                </Text>
              </HStack>
            </Modal.Header>
            <Modal.Body p="3" pt="0">
              <Input
                selectionColor={"#379"}
                size={"lg"}
                placeholder="edit message ..."
                multiline
                value={message}
                onChangeText={(text) => setMessage(text)}
                autoCapitalize="none"
                py="1.5"
                mt="4"
              />
            </Modal.Body>
            <Button onPress={editMsg}>
              <Text color="#fff" fontSize="md" fontWeight="semibold">
                Edit Message
              </Text>
            </Button>
          </>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default ActionModal;
