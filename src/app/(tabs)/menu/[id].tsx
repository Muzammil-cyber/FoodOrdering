import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
const Product = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Stack.Screen options={{ title: "Details" }} />
      <Text style={{ fontSize: 20 }}>Product Id: {id}</Text>
    </View>
  );
};
export default Product;
