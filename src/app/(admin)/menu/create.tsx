//import liraries
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "@/components/Button";
import defualtImage from "@/constants/Images";
import Colors from "@/constants/Colors";
import { Stack, useRouter } from "expo-router";

// create a component
const CreateProductScreen = () => {
  const router = useRouter();
  const [input, setInput] = useState({ name: "", price: "" });
  const [error, setError] = useState("");
  const [image, setImage] = useState<string>(defualtImage);

  const resetInput = () => {
    setInput({ name: "", price: "" });
    setError("");
    setImage(defualtImage);
  };

  const validateInput = () => {
    if (!input.name || !input.price) {
      setError("Please fill in all fields");
      return false;
    }
    if (isNaN(parseFloat(input.price))) {
      setError("Price must be a number");
      return false;
    }
    return true;
  };

  const onCreate = () => {
    if (!validateInput()) return;
    console.warn("Create product");
    // TODO: create product
    resetInput();
    router.back();
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Create Dish" }} />
      <Image style={styles.image} source={{ uri: image }} />
      <Text style={styles.imgBtn} onPress={pickImage}>
        Add Image
      </Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={input.name}
        onChangeText={(name) => setInput({ ...input, name })}
      />
      <Text style={styles.label}>Price</Text>
      <TextInput
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
        value={input.price}
        onChangeText={(price) => setInput({ ...input, price })}
      />
      <Text style={{ color: "red" }}>{error}</Text>
      <Button onPress={onCreate} text={"Create Product"} />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
  },
  imgBtn: {
    color: Colors.light.tint,
    alignSelf: "center",
    fontWeight: "bold",
    marginVertical: 10,
    fontSize: 16,
  },
});

//make this component available to the app
export default CreateProductScreen;
