import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";

// import Button from "../../../components/Button";
// import { useCart } from "../../../providers/CartProvider";
import { PizzaSize } from "../../../types";
// import { useProduct } from "../../../api/products";
import products from "../../../../assets/data/products";
import Colors from "@/constants/Colors";
import Button from "@/components/Button";
import { useCart } from "@/providers/CartProdiver";
import defualtImage from "@/constants/Images";
import { useProduct } from "@/api/products";
import RemoteImage from "@/lib/RemoteImage";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const { setCartItem } = useCart();
  const { data: product, isLoading, error } = useProduct(id);

  const addToCart = () => {
    if (!product) return;
    setCartItem(product, selectedSize);
  };

  if (isLoading) {
    return <ActivityIndicator size={"large"} />;
  }

  if (error) {
    return <Text>Failed to Fetch products</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />
      <RemoteImage
        path={product?.image}
        fallback={defualtImage}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.subtitle}>Select size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => setSelectedSize(size)}
            key={size}
            style={[
              styles.size,
              {
                backgroundColor:
                  size === selectedSize ? Colors.light.tint : "white",
              },
            ]}
          >
            <Text
              style={[
                styles.sizeText,
                { color: size === selectedSize ? "white" : "gray" },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>Price: ${product?.price.toFixed(2)}</Text>
      <Button onPress={addToCart} text="Add to cart" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    flex: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  subtitle: {
    marginVertical: 10,
    fontWeight: "600",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: "auto",
  },

  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  size: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
    color: "black",
  },
});

export default ProductDetailsScreen;
