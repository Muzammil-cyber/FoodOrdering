import Button from "@/components/Button";
import CartListItem from "@/components/CardListItems";
import { useCart } from "@/providers/CartProdiver";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { View, Text, Platform, FlatList } from "react-native";
const cart = () => {
  const { items, total, checkout } = useCart();
  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
      <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 5 }}>
        Total: $ {total}
      </Text>
      <Button text="CheckOut" onPress={checkout} />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};
export default cart;
