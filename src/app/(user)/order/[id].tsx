import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "../../../../assets/data/orders";
import OrderItemListItem from "../../../components/OrderItemListItem";
import OrderListItem from "../../../components/OrderListItem";
import { useOrderDetails } from "@/api/orders";

const OrderDetailScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseInt(typeof idString === "string" ? idString : idString[0]);

  const { data: order, error, isLoading } = useOrderDetails(id);

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>Error fetching Orders</Text>;
  if (!order) {
    return <Text>Order not found!</Text>;
  }
  return (
    <View style={styles.container}>
      {/* <Stack.Screen name="[id]" options={{ title: `Hello` }} /> */}
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      <OrderListItem order={order} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
      <View style={styles.priceContainer}>
        <Text style={styles.priceTitle}>Total:</Text>
        <Text style={styles.price}>PKR {order.total}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
  priceContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  price: {
    fontSize: 20,
  },
});

export default OrderDetailScreen;
