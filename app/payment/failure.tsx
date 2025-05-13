import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'
import { APPCOLORS } from '@/common/utils/colors';
import { useRouter } from 'expo-router';

const PaymentFailureScreen = () => {
  const router = useRouter();

  const handleRetry = () => {
    router.navigate(`/driver/offersScreen`);
  };

  return (
    <View style={styles.container}>
      <Ionicons name="close-circle-outline" size={100} color="#D32F2F" />
      <Text style={styles.title}>Pago fallido</Text>
      <Text style={styles.message}>
        Hubo un problema al procesar tu pago. Por favor, intenta nuevamente.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleRetry}>
        <Text style={styles.buttonText}>Vuelva a intentarlo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 24,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: APPCOLORS.primary,
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    color: APPCOLORS.textBlue,
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: APPCOLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: APPCOLORS.secondary,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentFailureScreen;