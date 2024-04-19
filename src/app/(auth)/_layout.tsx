import { useAuth } from "@/providers/AuthProvider";
import { Redirect, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
const AuthLayout = () => {
  const { session } = useAuth();
  if (session) {
    return <Redirect href="/" />;
  }
  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ title: "Sign In" }} />
      <Stack.Screen name="sign-up" options={{ title: "Sign Up" }} />
    </Stack>
  );
};
export default AuthLayout;
const styles = StyleSheet.create({});
