import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { APPCOLORS } from "@/common/utils/colors";
import { supabase } from "@/lib/supabase";
import { updateSubscription } from "@/common/supabase/users/fetchUser";
import { useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setSubscritionInfo } from "@/store/slices/suscribed";

const SuccessPaymentScreen = () => {
  const router = useRouter();
  const { payment_id } = useLocalSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    update();
  }, []);
  const handleGoHome = () => {
    router.navigate(`/driver/offersScreen`);
  };

  const update = async () => {
    console.log("payment_id", payment_id);
    try {
      if (payment_id) {
        const user = await supabase.auth.getUser();
        console.log("user", user.data.user!.id);
        await updateSubscription(
          user.data.user!.id,
          true,
          payment_id as string
        );
        dispatch(setSubscritionInfo(true));
      }
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.toString() || "Error al actualizar la suscripción"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons
        name="checkmark-circle-outline"
        size={100}
        color={APPCOLORS.primary}
      />
      <Text style={styles.title}>¡Felicidades!</Text>
      <Text style={styles.message}>
        Te has suscrito exitosamente. ¡Gracias por confiar en nosotros!
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleGoHome}>
        <Text style={styles.buttonText}>Ir al inicio</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SuccessPaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    color: APPCOLORS.primary,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 32,
    color: APPCOLORS.textBlue,
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
    fontWeight: "bold",
  },
});
