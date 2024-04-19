import { useOrderList } from "@/api/orders";
import { useInsertOrderSubscription } from "@/api/orders/subcription";
import OrderListItem from "@/components/OrderListItem";
import supabase from "@/lib/supabase";

import orders from "@assets/data/orders";
import { useEffect } from "react";

import { ActivityIndicator, FlatList, Text } from "react-native";

const OrderScreen = () => {
  const { data: orders, error, isLoading } = useOrderList({ archived: false });

  useInsertOrderSubscription();

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />
    </>
  );
};
export default OrderScreen;
