import { FlatList, View } from "react-native";

import products from "@assets/data/products";

import { ProductListItem } from "@components/ProductListItem";
import { Product } from "@/types";

export default function MenuScreen() {
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
