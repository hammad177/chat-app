import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StartUp from "../views/StartUp";
import CreateRoom from "../views/CreateRoom";
import SearchRoom from "../views/SearchRoom";

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

const MyStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="startup"
      screenOptions={horizontalAnimation}
    >
      <Stack.Screen
        name="startup"
        options={{ headerShown: false }}
        component={StartUp}
      />
      <Stack.Screen
        options={{ headerTitle: "Create New Room" }}
        name="create-room"
        component={CreateRoom}
      />
      <Stack.Screen
        options={{ headerTitle: "Search Rooms" }}
        name="search-room"
        component={SearchRoom}
      />
    </Stack.Navigator>
  );
};

export default MyStack;
