import * as Linking from 'expo-linking';
import { Alert } from 'react-native';

export class ActionsButton {

    public static async actionCallButton(number: string) {
        try {
            const supported = await Linking.canOpenURL(`tel:+${number}`);

            if (!supported) {
                Alert.alert('No se puede realizar llamado en este momento')
            }
            Linking.openURL(`tel:+${number}`);
        } catch (error) {
            Alert.alert('Error al realizar llamado');

        }

    }

    public static async actionWhatsappButton(number: string) {
        try {
            const supported = await Linking.canOpenURL(`https://wa.me/${number}`);

            if (!supported) {
                Alert.alert('No se puede dirigir a whatsapp en este momento')
            }
            Linking.openURL(`whatsapp://send?phone=${number}`);
        } catch (error) {
            Alert.alert('Error en la acción');

        }
    }
}
        