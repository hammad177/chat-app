import React, { useRef } from "react";
import {
  Button,
  FormControl,
  Input,
  Stack,
  Text,
  IconButton,
  HStack,
  Pressable,
} from "native-base";
import ClipBoardIcon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Clipboard from "expo-clipboard";
import { useFormik } from "formik";
import * as yup from "yup";

const JoinRoomForm = () => {
  const RoomPasswordRef = useRef();
  // form initial state
  const initialValues = {
    room_code: "",
    password: "",
    is_public: true,
  };

  const validationSchema = yup.object().shape({
    room_code: yup.string().required("enter valid room code"),
    password: yup.string().when("is_public", {
      is: false,
      then: yup.string().required("enter room password"),
    }),
    is_public: yup.boolean(),
  });

  const onSubmit = (value, { resetForm }) => {
    console.log(value);
  };

  const { handleChange, setFieldValue, handleSubmit, values, errors } =
    useFormik({
      initialValues,
      validationSchema,
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit,
    });
  const changeRoom = (val) => setFieldValue("is_public", val);
  return (
    <Stack space={5} w="80%" maxW={"350px"} mx="auto">
      <HStack>
        <Pressable
          w="50%"
          backgroundColor={values?.is_public ? "#5984de" : "blueGray.200"}
          alignItems="center"
          py="10px"
          borderRadius="sm"
          onPress={() => changeRoom(true)}
        >
          <Text
            fontSize="xl"
            color={values?.is_public ? "#fff" : "blueGray.500"}
          >
            PUBLIC
          </Text>
        </Pressable>
        <Pressable
          w="50%"
          backgroundColor={!values?.is_public ? "#5984de" : "blueGray.200"}
          alignItems="center"
          py="10px"
          borderRadius="sm"
          onPress={() => changeRoom(false)}
        >
          <Text
            fontSize="xl"
            color={!values?.is_public ? "#fff" : "blueGray.500"}
          >
            PRIVATE
          </Text>
        </Pressable>
      </HStack>
      <FormControl isInvalid={errors.room_code}>
        <Input
          selectionColor={"#379"}
          onChangeText={handleChange("room_code")}
          value={values.room_code}
          size={"lg"}
          placeholder="Room code ..."
          InputRightElement={<ClipBoardButton setFieldValue={setFieldValue} />}
          returnKeyType={values?.is_public ? "done" : "next"}
          blurOnSubmit={values?.is_public ? true : false}
          onSubmitEditing={() =>
            !values?.is_public && RoomPasswordRef.current.focus()
          }
        />
      </FormControl>
      {!values?.is_public ? (
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
