import React from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, Image } from 'react-native';
import { APPCOLORS } from '../utils/colors';

const { width, height } = Dimensions.get('window');

interface CustomHeaderProps{
    hasBack? : boolean;
    onPress?: () => void

}
export default function CustomHeader({hasBack, onPress}: CustomHeaderProps) {

  return (
    <View style={styles.container}>
      {/* Sección curva superior */}
      <View style={styles.curvedBackground}>
      <Image
                style={{
                  height: 100,
                  width: 100,
                  justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop:70
                }}
                source={require('../../assets/images/logo.jpeg')}
              />
        <View style={styles.circleLeft} />
        <View style={styles.circleRight} />
        {
          hasBack ? (
            <Pressable
            onPress={onPress}>
                <Text style={styles.backText}>Atras</Text>
            </Pressable>
          ): null
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: height * 0.20, // Altura total del header
    overflow: 'hidden',
    backgroundColor : APPCOLORS.clearBackground
  },
  curvedBackground: {
    position: 'relative',
    top:-20,
    backgroundColor: APPCOLORS.primary, // Color azul oscuro
    height:  190,
    width: '100%',
    borderBottomRightRadius: width * 1, // Borde inferior derecho redondeado
    borderBottomLeftRadius: width * 1,
  },
  circleLeft: {
    position: 'absolute',
    top: -height * 0.060 + 30,
    left: - width * 0.1,
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: width * 1,
    borderWidth: 17,
    borderColor: '#F1F566', // Color amarillo
  },
  circleRight: {
    position: 'absolute',
    top: -height * 0.04,
    right: -width * 0.10,
    width: width * 0.4,
    height: width * 0.4,
    borderRadius:width * 1,
    borderWidth: 20,
    borderColor: '#F1F566', // Color amarillo
  },
  backText: {
    position: 'absolute',
    top: -10,
    left: 20,
    color: APPCOLORS.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
