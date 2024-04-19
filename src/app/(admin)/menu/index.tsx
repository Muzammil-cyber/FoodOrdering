import { ActivityIndicator, FlatList, View, Text } from "react-native";

import { ProductListItem } from "@components/ProductListItem";
import { Tables } from "@/types";
import { useProductList } from "@/api/products";
type Product = Tables<"products">;
export default function MenuScreen() {
  const { data: products, error, isLoading } = useProductList();

  if (isLoading) {
    return <ActivityIndicator size={"large"} />;
  }

  if (error) {
    return <Text>Failed to Fetch products</Text>;
  }
  return (
    <FlatList
      data={products}
      renderItem={({ item }: { item: Product }) => (
        <ProductListItem key={item.id} product={item} />
      )}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
}
