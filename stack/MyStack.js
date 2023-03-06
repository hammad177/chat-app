import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import StartUp from "../views/StartUp";
import CreateRoom from "../views/CreateRoom";
import Loading from "../components/Loading";
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
    <NavigationContainer fallback={Loading}>
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
    </NavigationContainer>
  );
};

export default MyStack;
