import * as Linking from "expo-linking";
import { Alert } from "react-native";

export class ActionsButton {
  public static async actionCallButton(number: string) {
    try {
        console.log("number", number);
      Linking.openURL(`tel:${number}`);
    } catch (error) {
      Alert.alert("Error al realizar llamado");
    }
  }

  public static async actionWhatsappButton(number: string) {
    try {
      Linking.openURL(`whatsapp://send?phone=${number}`);
    } catch (error) {
      Alert.alert("Error en la acción");
    }
  }
}
