import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react'
import { useLayoutEffect } from 'react'
import { router, useNavigation, useRouter } from 'expo-router'
import CustomHeader from '@/common/components/Header'
import ScreenLayout from '@/common/components/ScreenLayout'
import { APPCOLORS } from '@/common/utils/colors'
import OfferCard from '@/common/components/OfferCard'
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { useDispatch } from 'react-redux';
import { getLoads } from '@/store/slices/loads';
import {  Load } from '@/common/interfaces/loadType';
import Ionicons from '@expo/vector-icons/Ionicons';



export default function Loads() {

  const router = useRouter()
  const { loads, loading, error } = useSelector((state: RootState) => state.loads)
  const dispatch = useDispatch<AppDispatch>()
  const navigation = useNavigation()
  useEffect(() => {
    dispatch(getLoads(false));
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <CustomHeader hasBack={false} />,
      tabBarLabel: 'Ofertas',
    })
  }, [])

  if (loading === 'pending') return <ActivityIndicator size={'large'} color={APPCOLORS.primary} style={{ flex: 1 }} />

  return (
    <View style={{ flex: 1, backgroundColor: APPCOLORS.tertiary }}>
      <ScreenHeader />
      <ScreenLayout backgroundColor={APPCOLORS.tertiary} margin={1} padding={0}>

        <FlatList
          horizontal={false}
          data={loads || []}
          renderItem={({ item }: { item: Load }) => <OfferCard load={item} />}
          style={{ paddingLeft: 30 }}
        />
        <View style={{ height: 75 }} />

      </ScreenLayout>
    </View>
  )
}

const ScreenHeader = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.screenTitleContainer}>
      <View>
        <Text style={styles.screenTitle}>Cargas</Text>
        <Text style={styles.screenSubtitle}>Tus ofertas Creadas:</Text>
      </View>
       <View>
        <TouchableOpacity onPress={() => { router.push('/createLoad') }} >
          <Ionicons name='add-circle-outline' size={40} color={APPCOLORS.textBlue} style={{ alignSelf: 'flex-end', marginRight: 15 }} />
        </TouchableOpacity>
      </View> 
    </View>
  )
}
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
    backgroundColor: 'white'
  }
})