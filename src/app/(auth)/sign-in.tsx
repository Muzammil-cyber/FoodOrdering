//import liraries
import Button from "@/components/Button";
import Colors from "@/constants/Colors";
import supabase from "@/lib/supabase";
import { Link } from "expo-router";
import React, { Component, useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";

// create a component
const SignInScreen = () => {
  const [input, setInput] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: input.email,
      password: input.password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  const onSubmit = async () => {
    await signInWithEmail();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="johndoe@email.com"
        textContentType="emailAddress"
        keyboardType="email-address"
        onChangeText={(text) => setInput({ ...input, email: text })}
        value={input.email}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="*********"
        textContentType="password"
        onChangeText={(text) => setInput({ ...input, password: text })}
        value={input.password}
        secureTextEntry
      />

      <Button
        onPress={onSubmit}
        text={loading ? "Signing in..." : "Sign in"}
        disabled={loading}
      />
      <Link href={"/(auth)/sign-up"} style={styles.textButton}>
        Create an Account
      </Link>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

//make this component available to the app
export default SignInScreen;
