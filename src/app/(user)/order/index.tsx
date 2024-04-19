import { useMyOrders } from "@/api/orders";
import OrderListItem from "@/components/OrderListItem";

import { Stack } from "expo-router";
import { ActivityIndicator, FlatList, Text } from "react-native";

const OrderScreen = () => {
  const { data: orders, error, isLoading } = useMyOrders();
  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>Error fetching Orders</Text>;
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
