import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect } from 'react'
import { AppDispatch, RootState } from '@/store/store'
import { useDispatch } from 'react-redux'
import { getTrucks } from '@/store/slices/trucks'
import { useAppSelector } from '@/hooks'
import { APPCOLORS } from '@/common/utils/colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useNavigation, router } from 'expo-router'
import TruckCard from '@/common/components/TruckCard';
import { Truck } from '@/common/interfaces/truckType';

const offerTrucks = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { trucks } = useAppSelector((state: RootState) => state.trucks)
  const fn = async () => {
    await dispatch(getTrucks('')).unwrap();
  } 
  useEffect(() => {
    fn()
  },[])

  
  return (
    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
      <ScreenHeader />
        <FlatList
        contentContainerStyle={{ gap: 10, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}
        data={trucks}
        renderItem={({item}: {item: Truck}) => <TruckCard truck={item} isLoader={true} />} />
        <View style={{height: 80}}/>
    </View>
  )
}
const ScreenHeader = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.screenTitleContainer}>
      <View>
        <Text style={styles.screenTitle}>Camiones</Text>
        <Text style={styles.screenSubtitle}>Disponibles para Cargas:</Text>
      </View>
       <View>
        {/* <TouchableOpacity onPress={() => { router.push('/createLoad') }} >
          <Ionicons name='add-circle-outline' size={30} color={APPCOLORS.textBlue} style={{ alignSelf: 'flex-end', marginRight: 10 }} />
        </TouchableOpacity> */}
      </View> 
    </View>
  )
}


export default offerTrucks

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
})