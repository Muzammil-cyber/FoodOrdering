import { Stack } from "expo-router";

export default function OrderLayout() {
  return (
    <Stack>
      <Stack.Screen name="list" options={{ headerShown: false }} />
    </Stack>
  );
}
