import { Image, StyleSheet, Text, Pressable } from "react-native";
import Colors from "../constants/Colors";
import { Tables } from "../types";
import { Link, useSegments } from "expo-router";
import defualtImage from "@/constants/Images";
import RemoteImage from "@/lib/RemoteImage";

type ProductListItemProps = {
  product: Tables<"products">;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
  const segment = useSegments();
  return (
    <Link href={`${segment[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <RemoteImage
          path={product.image}
          fallback={defualtImage}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>PKR{product.price}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: "50%",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    color: Colors.light.tint,
  },
});
