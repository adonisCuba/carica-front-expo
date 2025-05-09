import {
  checkPaymentStatus,
  createCheckoutPreference,
} from "@/common/utils/integracionMP";
import { TouchableOpacity } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import Ionicons from "@expo/vector-icons/Ionicons";
import { APPCOLORS } from "@/common/utils/colors";
import { router } from "expo-router";
import { supabase } from "@/lib/supabase";
import { updateSubscription } from "@/common/supabase/users/fetchUser";

export default function SubscribeModal() {
  const onSubscribePress = async () => {
    try {
      const data = await createCheckoutPreference();
      await WebBrowser.openBrowserAsync(data.init_point);
      const result = await checkPaymentStatus(data.id);
      if (
        result.status === "approved" ||
        result.status === "in_process" ||
        result.status === "authorized"
      ) {
        const user = await supabase.auth.getUser();
        await updateSubscription(user.data.user!.id, true, data.id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ position: "absolute", top: 5, right: 5 }}
        onPress={() => {
          router.dismiss();
        }}
      >
        <Ionicons name="close" size={28} color={APPCOLORS.darkGray} />
      </TouchableOpacity>
      <Image
        source={require("../assets/images/logo.jpeg")}
        style={{ height: "30%" }}
        resizeMode="contain"
      />
      <Text style={styles.title}>
        *¡Transforma cada viaje en una oportunidad!*
      </Text>
      <Text style={{ textAlign: "justify", fontSize: 14 }}>
        Con{" "}
        <Text style={{ fontWeight: "bold" }}>
          *CARICA, tu camión nunca volverá vacío. Accede a cargas exclusivas en
          todo el país por solo **15,000 ARS*
        </Text>
        . Aprovecha esta oportunidad para maximizar tus ingresos y optimizar tus
        recorridos.
      </Text>
      <TouchableOpacity onPress={onSubscribePress}>
        <Text
          style={{
            backgroundColor: "orange",
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
            color: "white",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Suscribirme
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    position: "relative",
  },
  title: {
    fontSize: 18,
    marginVertical: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
