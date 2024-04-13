import CartListItem from "@/components/CardListItems";
import { useCart } from "@/providers/CartProdiver";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { View, Text, Platform, FlatList } from "react-native";
const cart = () => {
  const { items } = useCart();
  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};
export default cart;
