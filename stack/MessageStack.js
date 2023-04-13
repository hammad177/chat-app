import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MessagesScreen from "../views/MessagesScreen";

const Stack = createStackNavigator();

const horizontalAnimation = {
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

const MessageStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="chat"
      screenOptions={horizontalAnimation}
    >
      <Stack.Screen
        name="chat"
        options={{ headerShown: false }}
        component={MessagesScreen}
      />
    </Stack.Navigator>
  );
};

export default MessageStack;
