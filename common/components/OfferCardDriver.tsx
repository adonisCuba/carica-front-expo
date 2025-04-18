import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { APPCOLORS } from '../utils/colors'
import { OfferModal } from './OfferModal';
import { Load } from '../interfaces/loadType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface OfferCardDriverProps {
  load: Load
}
const OfferCardDriver = ({ load }: OfferCardDriverProps) => {
 const {isSubscribed} = useSelector((state:RootState) => state.subscribed)
  const verifySuscription = async ()=>{
    if(isSubscribed === false) {
      Alert.alert('Debes suscribirte para poder ver las ofertas.')
      return
    } 
    
      if(isSubscribed === true){
        toggleModal()
      }
    
  }
  const [openModal, setOpenModal] = useState(false)
  const toggleModal = () => {
    setOpenModal(!openModal)
  }
  return (
    <View style={styles.offerCard}>
      <View>
        {/* Informacion de la carga - izquierda*/}
        <Text>Material: <Text style={{ color: APPCOLORS.cuaternary }}>{load.material}</Text></Text>
        <Text>Lugar Carga: <Text style={{ color: APPCOLORS.cuaternary }}>{load.ubicacionInicial}</Text></Text>
        <Text>Lugar Descarga: <Text style={{ color: APPCOLORS.cuaternary }}>{load.ubicacionFinal}</Text></Text>
        <Text>Presentación: <Text style={{ color: APPCOLORS.cuaternary }}>{load.presentacion}</Text></Text>
        <Text>Valor: <Text style={{ color: APPCOLORS.cuaternary }}>$ {load.valorViaje}</Text> </Text>
        <Text>Fecha Publicacion: <Text style={{ color: APPCOLORS.cuaternary }}>{load.fechaCarga}</Text> </Text>
      </View>
      <View>
        {/* Informacion de la carga - derecha*/}
      </View>

      <View>
        <TouchableOpacity
          onPress={() => verifySuscription()}
          style={{ alignSelf: 'center', backgroundColor: APPCOLORS.primary, width: '80%', height: 40, borderRadius: 12 }}>
          <Text style={{ alignSelf: 'center', color: 'white', fontWeight: '500', marginTop: 8, fontSize: 18 }}>Ver Oferta</Text>
        </TouchableOpacity>
        <OfferModal
         load={load}
          openModal={openModal}
          toggleModal={toggleModal}

        />
      </View>
    </View>
  )
}

export default OfferCardDriver

const styles = StyleSheet.create({
  screenTitleContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'

  },
  screenTitle: {
    fontSize: 20,
    color: APPCOLORS.textBlue,
    fontWeight: 'bold'
  },
  screenSubtitle: {
    fontSize: 14,
    color: APPCOLORS.textGray,
    fontWeight: '600'
  },
  filterBtn: {
    width: 90,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: APPCOLORS.primary,
    borderRadius: 12,
    alignContent: 'center',
    marginTop: 10,
    marginLeft: 20,
    alignSelf: 'flex-end'
  },
  filterBtnTitle: {
    fontSize: 14,
    color: APPCOLORS.textWhite,
    fontWeight: '500'
  },
  offerCard: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: APPCOLORS.darkGray,
    borderRadius: 12,
    padding: 10,
    width: '90%',
    height: 190,
    marginTop: 5,
    backgroundColor: 'white'
  }
})