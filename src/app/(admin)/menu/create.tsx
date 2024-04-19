//import liraries
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "@/components/Button";
import defualtImage from "@/constants/Images";
import Colors from "@/constants/Colors";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@assets/data/products";
import {
  useDeleteProduct,
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from "@/api/products";

// create a component
const CreateProductScreen = () => {
  const router = useRouter();
  const { id }: { id: string } = useLocalSearchParams();
  const isUpdating = !!id;

  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { mutate: deleteProduct } = useDeleteProduct();

  const {
    data: product,
    error: invalidProduct,
    isLoading,
  } = useProduct(parseInt(id));

  const [input, setInput] = useState<{ name: string; price: string }>({
    name: product?.name || "",
    price: product?.price.toString() || "",
  });
  const [error, setError] = useState("");
  const [image, setImage] = useState<string>(product?.image || defualtImage);

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

  const onSubmit = () => {
    if (!validateInput()) return;
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  const onDelete = () => {
    deleteProduct(parseInt(id), {
      onSuccess: () => {
        resetInput();
        router.replace("/(admin)/menu");
      },
    });
  };

  const confirmDelete = () => {
    Alert.alert(
      "Delete Dish",
      "Are you sure you want to delete this product?",
      [
        {
          text: "Cancel",
          style: "default",
        },
        { text: "Delete", style: "destructive", onPress: onDelete },
      ]
    );
  };

  const onUpdate = () => {
    // TODO: update product
    updateProduct(
      {
        id: parseInt(id),
        name: input.name,
        price: parseFloat(input.price),
        image,
      },
      {
        onSuccess: () => {
          resetInput();
          router.back();
        },
      }
    );
  };

  const onCreate = () => {
    // TODO: create product
    insertProduct(
      {
        name: input.name,
        price: parseFloat(input.price),
        image,
      },
      {
        onSuccess: () => {
          resetInput();
          router.back();
        },
      }
    );
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

  if (isLoading) {
    return <ActivityIndicator size={"large"} />;
  }

  if (invalidProduct) {
    return <Text>Failed to Fetch product</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? "Update Dish" : "Create Dish" }}
      />
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
      <Button
        onPress={onSubmit}
        text={isUpdating ? "Update Dish" : "Create Product"}
      />
      {isUpdating && (
        <Text style={styles.delBtn} onPress={confirmDelete}>
          Delete Product
        </Text>
      )}
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
  delBtn: {
    color: "red",
    alignSelf: "center",
    fontWeight: "bold",
    marginVertical: 10,
    fontSize: 16,
  },
});

//make this component available to the app
export default CreateProductScreen;
