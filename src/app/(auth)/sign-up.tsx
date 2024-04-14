//import liraries
import Button from "@/components/Button";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import React, { Component, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

// create a component
const SignUpScreen = () => {
  const [input, setInput] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const validateInput = () => {
    setError("");
    if (!input.email || !input.password) {
      setError("Please fill in all fields");
      return false;
    }
    // Check email format
    if (
      !input.email.includes("@") ||
      !input.email.includes(".") ||
      input.email.length < 5
    ) {
      setError("Please enter a valid email");
      return false;
    }
    if (input.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (!validateInput()) return;
    console.warn("Sign up");
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
      <Text style={{ color: "red" }}>{error}</Text>
      <Button onPress={onSubmit} text="Sign up" />
      <Link href={"/(auth)/sign-in"} style={styles.textButton}>
        Use an existing account
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
export default SignUpScreen;
