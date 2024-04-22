import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

import OrderItemListItem from "../../../components/OrderItemListItem";
import OrderListItem from "../../../components/OrderListItem";
import Colors from "@/constants/Colors";
import { OrderStatus, OrderStatusList } from "@/types";
import { useOrderDetails, useUpdateOrder } from "@/api/orders";
import { useUpdateOrderSubscription } from "@/api/orders/subcription";

const OrderDetailScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseInt(typeof idString === "string" ? idString : idString[0]);

  const { data: order, error, isLoading } = useOrderDetails(id);
  const { mutate: updateOrder } = useUpdateOrder(id);

  useUpdateOrderSubscription(id);

  const updateStatus = (status: OrderStatus) => {
    updateOrder({ status });
  };

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!order) {
    return <Text>Order not found!</Text>;
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />
      <OrderListItem order={order} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListFooterComponent={
          <>
            <Text style={{ fontWeight: "bold" }}>Status</Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => updateStatus(status)}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order?.status === status
                        ? Colors.light.tint
                        : "transparent",
                  }}
                >
                  <Text
                    style={{
                      color:
                        order?.status === status ? "white" : Colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        }
      />
      <View style={styles.priceContainer}>
        <Text style={styles.priceTitle}>Total:</Text>
        <Text style={styles.price}>$ {order.total}</Text>
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
