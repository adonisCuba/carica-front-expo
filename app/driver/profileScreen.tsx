import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, Button, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import CustomHeader from '@/common/components/Header'
import { useNavigation, useRouter } from 'expo-router'
import ScreenLayout from '@/common/components/ScreenLayout';
import { APPCOLORS } from '@/common/utils/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { supabase } from '@/lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DriverProfileModal } from '@/common/components/DriverProfileModal';
import * as WebBrowser from 'expo-web-browser';
import { integracionMP } from '@/common/utils/integracionMP';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { createCheckoutPreference } from '@/common/utils/integracionMP';


//TODO Cambiar por url de perfil de supabase
const AVATAR_URL: string = 'https://www.camionesybusesvolkswagen.cl/wp-content/uploads/2023/12/home-destacado-constellation-17280.jpg'
export default function ProfileScreen() {
  const [openModal, setOpenModal] = useState(false);
  const [profile, setProfile] = useState<any>({});
  const { isSubscribed } = useSelector((state: RootState) => state.subscribed)

  const toggleModal = () => {
    setOpenModal(!openModal)
  }
  const router = useRouter();
  const logout = async () => {
    await supabase.auth.signOut()
    await router.replace('/auth/login')
    await AsyncStorage.clear()
  }
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <CustomHeader hasBack={false} />
    })
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    const user = await supabase.auth.getUser()
    const { data: profileData, error: profileError } = await supabase.from('usuarios').select('*').eq('id', user.data.user!.id).single()
    setProfile(profileData)
  }
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
    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center'  }}>
      <ScreenLayout>
        <ScreenHeader onPress={toggleModal} />
        <ScrollView style={{ flex: 1 }}>
          <Avatar url={AVATAR_URL} />
          <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
            {/* info de perfil */}
            <Text style={{ fontSize: 20, color: APPCOLORS.primary, fontWeight: '600' }}> {profile?.nombre} {profile?.apellido} </Text>
            <Text style={{ fontSize: 15, color: APPCOLORS.darkGray, fontWeight: '400' }}> Telefono: {profile?.telefono} </Text>
            <Text style={{ fontSize: 15, color: APPCOLORS.darkGray, fontWeight: '400' }}> Correo: {profile.email} </Text>
            <Text style={{ fontSize: 15, color: APPCOLORS.darkGray, fontWeight: '400' }}> DNI: {profile.dni} </Text>

          </View>
          <View style={{ marginTop: 20, borderWidth: 2, borderColor: '#CDCDCD', width: '95%', height: 160, borderRadius: 20, marginBottom: 10, backgroundColor: APPCOLORS.clearBackground, flexDirection: 'column' }}>
            {/* CARD De suscripcion */}
            <View>
              <Image
                style={{
                  height: 80,
                  width: 80,
                  alignSelf: 'center',
                }}
                source={require('../../assets/images/tdc.png')}
              />
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 15, color: APPCOLORS.primary, fontWeight: '600', textAlign: 'center' }}> Necesitas suscribirte para ver Ofertas </Text>
            </View>
            <TouchableOpacity
              onPress={_handlePressButtonAsync}
              style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 6 }} activeOpacity={0.8}>
              <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 40, backgroundColor: APPCOLORS.primary, borderRadius: 12, borderColor: APPCOLORS.secondary, borderWidth: 2 }}>
                <Text style={{ fontSize: 20, color: APPCOLORS.textWhite, fontWeight: '600', textAlign: 'center' }}>Suscribirme</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ width: '100%', marginBottom: 30 }}>
            <TouchableOpacity
              onPress={logout}
              style={{ borderRadius: 30, backgroundColor: 'red', width: '100%', height: 50, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'white', fontWeight: '600' }}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={{height: 70}} />
      </ScreenLayout>
      <DriverProfileModal openModal={openModal} toggleModal={toggleModal} user={profile} />
    </View>
  )
}

const ScreenHeader = ({ onPress }: { onPress: () => void }) => {
  return (
    <View style={styles.screenTitleContainer}>
      <View>
        <Text style={styles.screenTitle}>Perfil</Text>
        <Text style={styles.screenSubtitle}>Tus Datos:</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => onPress()} style={styles.filterBtn}>
          <Text style={styles.filterBtnTitle}>Editar:</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const Avatar = ({ url }: { url: string }) => {
  return (
    <View style={{ width: 110, height: 110, borderRadius: 100, backgroundColor: 'white', borderColor: APPCOLORS.secondary, borderWidth: 6, overflow: 'hidden', alignSelf: 'center' }}>
      <Image source={{ uri: url }} width={100} height={100} resizeMode='cover' />
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
    fontWeight: 'bold'
  },
})