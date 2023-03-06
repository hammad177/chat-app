import React, { useRef } from "react";
import {
  Button,
  FormControl,
  Input,
  Stack,
  Text,
  IconButton,
} from "native-base";
import ClipBoardIcon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Clipboard from "expo-clipboard";

const JoinRoomForm = ({
  handleChange,
  handleSubmit,
  values,
  errors,
  isPublic,
  setFieldValue,
}) => {
  const RoomPasswordRef = useRef();
  return (
    <Stack space={5} w="100%">
      <FormControl isInvalid={errors.room_code}>
        <Input
          selectionColor={"#379"}
          onChangeText={handleChange("room_code")}
          value={values.room_code}
          size={"lg"}
          placeholder="Room code ..."
          InputRightElement={<ClipBoardButton setFieldValue={setFieldValue} />}
          returnKeyType={isPublic ? "done" : "next"}
          blurOnSubmit={isPublic ? true : false}
          onSubmitEditing={() => !isPublic && RoomPasswordRef.current.focus()}
        />
      </FormControl>
      {!isPublic ? (
        <FormControl isInvalid={errors.password}>
          <Input
            ref={RoomPasswordRef}
            selectionColor={"#379"}
            size={"lg"}
            placeholder="Enter password ..."
            onChangeText={handleChange("password")}
            secureTextEntry={true}
            value={values.password}
          />
        </FormControl>
      ) : null}
      <Button
        size={"lg"}
        isLoading={false}
        isLoadingText="Joining ..."
        onPress={handleSubmit}
      >
        <Text color={"#fff"} fontWeight="bold" fontSize={"lg"}>
          Join
        </Text>
      </Button>
    </Stack>
  );
};

const ClipBoardButton = ({ setFieldValue }) => {
  const getClipBoardValue = async () => {
    const value = await Clipboard.getStringAsync();
    if (value) {
      return setFieldValue("room_code", value);
    }
  };
  return (
    <IconButton
      backgroundColor="#111"
      variant="solid"
      _icon={{
        as: <ClipBoardIcon name="clipboard-arrow-left-outline" />,
        name: "search",
      }}
      onPress={getClipBoardValue}
    />
  );
};

export default JoinRoomForm;
