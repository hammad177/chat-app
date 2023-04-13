import { View } from "native-base";
import { ActivityIndicator } from "react-native";
import React from "react";

const SplashScreen = () => {
  return (
    <View flex="1" alignItems="center" justifyContent="center">
      <ActivityIndicator size="large" color="#00ff" animating={true} />
    </View>
  );
};

export default SplashScreen;
