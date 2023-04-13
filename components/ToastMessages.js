import {
  Alert,
  VStack,
  HStack,
  Text,
  IconButton,
  CloseIcon,
  useToast,
} from "native-base";
import React from "react";

export default function ToastMessages() {
  const toast = useToast();
  ToastMessages.show = ({
    status = "success",
    message = "default message",
    duration = 3000,
  }) => {
    toast.show({
      placement: "top",
      duration,
      render: ({ id }) => (
        <Alert w="400px" maxW="100%" status={status} variant="top-accent">
          <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} justifyContent="space-between">
              <HStack space={2} flexShrink={1}>
                <Alert.Icon mt="1" />
                <Text fontSize="md" color="coolGray.800">
                  {message}
                </Text>
              </HStack>
              <IconButton
                onPress={() => toast.close(id)}
                variant="unstyled"
                _focus={{
                  borderWidth: 0,
                }}
                icon={<CloseIcon size="3" />}
                _icon={{
                  color: "coolGray.600",
                }}
              />
            </HStack>
          </VStack>
        </Alert>
      ),
    });
  };
  return <></>;
}
