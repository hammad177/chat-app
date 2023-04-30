import React, { useContext, useState } from "react";
import { Modal, Text, Button, HStack, Input } from "native-base";
import { joinPrivateRoom, joinPublicRoom } from "../context/GlobalStateAction";
import GlobalStateContext from "../context/GlobalStateContext";

const JoinRoomModal = ({ modal: { open, data }, handelModal }) => {
  const [password, setPassword] = useState("");
  const closeModal = () => handelModal(false);
  const {
    state: { isSubmitting },
    dispatch,
  } = useContext(GlobalStateContext);
  const joinRoom = () => {
    if (data?.is_public) {
      return joinPublicRoom(dispatch, { room_code: data?.room_code });
    }
    if (!data?.is_public) {
      if (password.length > 3) {
        return joinPrivateRoom(dispatch, {
          room_code: data?.room_code,
          password,
        });
      }
    }
  };

  return (
    <Modal
      isOpen={open}
      onClose={closeModal}
      closeOnOverlayClick={true}
      size="lg"
    >
      <Modal.Content>
        <Modal.Header>
          <Modal.CloseButton />
          <Text isTruncated={true} maxW="85%" fontSize="lg">
            {data?.room_name}
          </Text>
        </Modal.Header>
        <Modal.Body py="3">
          <HStack>
            <Text fontSize="md" w="30%">
              Created by:
            </Text>
            <Text fontSize="md">{data?.display_name}</Text>
          </HStack>
          <HStack mt="3">
            <Text fontSize="md" w="30%">
              Room type:
            </Text>
            <Text fontSize="md">{data?.is_public ? "Public" : "Private"}</Text>
          </HStack>

          {!data?.is_public ? (
            <Input
              selectionColor={"#379"}
              size={"lg"}
              placeholder="Enter password ..."
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
              autoCapitalize="none"
              py="1.5"
              mt="4"
            />
          ) : null}
        </Modal.Body>

        <Button onPress={joinRoom} isLoading={isSubmitting}>
          <Text color="#fff" fontSize="md" fontWeight="semibold">
            Join {data?.is_public ? "Public" : "Private"} Room
          </Text>
        </Button>
      </Modal.Content>
    </Modal>
  );
};

export default JoinRoomModal;
