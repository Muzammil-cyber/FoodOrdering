import { Stack } from "expo-router";
import { View, Text } from "react-native";
const MenuStack = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Menu" }} />
    </Stack>
  );
};
export default MenuStack;
