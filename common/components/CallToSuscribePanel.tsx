import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react'
import * as WebBrowser from 'expo-web-browser';
import { createCheckoutPreference } from '../utils/integracionMP';

const CallToSuscribePanel = ({width}: {width: any}) => {
  const _handlePressButtonAsync = async () => {
      try {
        const data = await createCheckoutPreference();
        let result = await WebBrowser.openBrowserAsync(data);
        console.log('DATA', result);
        console.log('RESULTADO:',result);
  
      } catch (error) {
        console.log(error)
      }
    };
    
    return (
        
        <View style={{ width: width, height: 40, backgroundColor: 'orange', position: 'absolute', bottom: 65, justifyContent: 'center', alignSelf: 'center', borderTopLeftRadius: 30, borderTopRightRadius: 30, }}>
            <TouchableOpacity onPress={_handlePressButtonAsync}>

            <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', textAlign: 'center' }}>Suscribete para tener acceso a toda la app</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CallToSuscribePanel