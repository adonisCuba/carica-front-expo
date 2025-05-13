import { Stack } from "expo-router";

export function PaymentLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="success" />
      <Stack.Screen name="failure" />
    </Stack>
  );
}