import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { APPCOLORS } from '../utils/colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import { AddTruckModal } from './AddTruckModal';
import { Truck } from '../interfaces/truckType';
interface Props {
  truck: Truck
  isLoader?: boolean
}
const TruckCard = ({ truck, isLoader = false }: Props) => {

  const {
    id,
    patente,
    modelo,
    capacidad,
    conductor,
    camionero,
    equipo, } = truck;
  const [openModal, setOpenModal] = useState(false)
  const toggleModal = () => {
    setOpenModal(!openModal)

  }

  return (
    <View style={styles.offerCard}>
      <View style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
        {/* Informacion de la carga - izquierda*/}
        <Ionicons name='bus' size={40} />

      </View>
      <View style={{ flexDirection: 'column' }}>
        {/* Informacion de la carga - izquierda*/}
        <Text>{equipo}</Text>
        <Text>Modelo <Text style={{ color: APPCOLORS.primary, fontWeight: 'bold', fontSize: 16 }}>{modelo}</Text></Text>
        <Text>Capacidad <Text style={{ color: APPCOLORS.primary, fontWeight: 'bold', fontSize: 16 }}>{capacidad}</Text></Text>
        <Text>Patente: <Text style={{ color: APPCOLORS.primary, fontWeight: 'bold', fontSize: 16 }}>{patente}</Text></Text>

      </View>
      <View>
        {/* Informacion de la carga - derecha*/}
      </View>
      { isLoader ? <AvailableBtn /> : <EditBtn toggleModal={toggleModal} />} 

      <AddTruckModal openModal={openModal} toggleModal={toggleModal} truck={truck} />
    </View>
  )
}

export default TruckCard


const EditBtn = ({toggleModal}:{toggleModal:() => void}) => {
  return (
    <View style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
      <TouchableOpacity
        style={{ alignSelf: 'center', backgroundColor: APPCOLORS.primary, width: 90, height: 40, borderRadius: 12 }} onPress={toggleModal}>
        <Text style={{ alignSelf: 'center', color: 'white', fontWeight: '500', marginTop: 8, fontSize: 18 }}>Editar</Text>
      </TouchableOpacity>
    </View>
  )
}

const AvailableBtn = () => {
  return (
    <View style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
      <View
        style={{ alignSelf: 'center', backgroundColor: APPCOLORS.secondary, width: 100, height: 40, borderRadius: 12 }}>
        <Text style={{ alignSelf: 'center', color: APPCOLORS.primary, fontWeight: '500', marginTop: 8, fontSize: 18 }}>Disponible</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  offerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: APPCOLORS.darkGray,
    borderRadius: 12,
    alignContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 25,
    width: '90%',
    height: 110,
    backgroundColor: 'white'
  }
})