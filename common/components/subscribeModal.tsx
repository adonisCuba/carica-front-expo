import {
  createCheckoutPreference,
} from "@/common/utils/integracionMP";
import { TouchableOpacity } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import Ionicons from "@expo/vector-icons/Ionicons";
import { APPCOLORS } from "@/common/utils/colors";

import { Modal } from "react-native";

interface CustomModalProps {
  openModal: boolean;
  toggleModal: () => void;
}

export default function SubscribeModal({
  openModal,
  toggleModal,
}: CustomModalProps) {
  const onSubscribePress = async () => {
    try {
      const data = await createCheckoutPreference();
      await WebBrowser.openBrowserAsync(data.init_point);
      toggleModal();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal visible={openModal} transparent animationType="fade">
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity
            style={{ position: "absolute", top: 5, right: 5 }}
            onPress={toggleModal}
          >
            <Ionicons name="close" size={28} color={APPCOLORS.darkGray} />
          </TouchableOpacity>
          <Image
            source={require("../../assets/images/logo.jpeg")}
            style={{ height: "30%" }}
            resizeMode="contain"
          />
          <Text style={styles.title}>
            ¡Transforma cada viaje en una oportunidad!
          </Text>
          <Text style={{ textAlign: "justify", fontSize: 14 }}>
            Con{" "}
            <Text style={{ fontWeight: "bold" }}>
              CARICA, tu camión nunca volverá vacío. Accede a cargas exclusivas
              en todo el país por solo 15,000 ARS
            </Text>
            . Aprovecha esta oportunidad para maximizar tus ingresos y optimizar
            tus recorridos.
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
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    padding: 20,
    position: "relative",
    backgroundColor: "white",
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
});
