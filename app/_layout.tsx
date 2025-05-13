import CustomHeader from '@/common/components/Header';
import { store } from '@/store/store';
import {  Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }} edges={[ 'bottom']}>
        <StatusBar translucent backgroundColor="transparent" />
        <Stack screenOptions={{ headerShown: false }}>
          {/* Esto define las rutas principales */}
          <Stack.Screen name="/auth/login" /> {/* Ruta inicial */}
          <Stack.Screen name="driver" options={{ headerShown: false }} /> {/* Layout para tabs */}
          <Stack.Screen name="loader" options={{ headerShown: false }} /> {/* Layout para auth */}
          <Stack.Screen name="createLoad" options={{ header: () => <CustomHeader hasBack={true} /> }} /> {/* Layout para auth */}
          <Stack.Screen name="payment" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </Provider>
  );
}