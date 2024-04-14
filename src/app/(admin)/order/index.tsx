import OrderListItem from "@/components/OrderListItem";
import Colors from "@/constants/Colors";
import orders from "@assets/data/orders";
import { Stack } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

const OrderScreen = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />
    </>
  );
};
export default OrderScreen;
