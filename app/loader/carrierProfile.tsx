import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import CustomHeader from '@/common/components/Header'
import { useNavigation, useRouter } from 'expo-router'
import ScreenLayout from '@/common/components/ScreenLayout';
import { APPCOLORS } from '@/common/utils/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { supabase } from '@/lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DriverProfileModal } from '@/common/components/DriverProfileModal';

//TODO Cambiar por url de perfil de supabase
const AVATAR_URL: string = 'https://plus.unsplash.com/premium_photo-1661811677567-6f14477aa1fa?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JhbmphfGVufDB8fDB8fHww'
export default function CarrierProfile() {
  const [openModal, setOpenModal] = useState(false);
  const [profile, setProfile] = useState<any>({});
  const router = useRouter();
  const logout = async () => {
    await supabase.auth.signOut()
    await router.replace('/auth/login')
    await AsyncStorage.clear()
  }
  const toggleModal = () => {
    console.log('Aqui');
    setOpenModal(!openModal)
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
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScreenLayout>
        <ScreenHeader  onPress={toggleModal}/>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 90 }}>
          <Avatar url={AVATAR_URL} />
          <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
            {/* info de perfil */}
            <Text style={{ fontSize: 20, color: APPCOLORS.primary, fontWeight: '600' }}> {profile?.nombre} {profile?.apellido} </Text>
            <Text style={{ fontSize: 15, color: APPCOLORS.darkGray, fontWeight: '400' }}> Telefono: {profile?.telefono} </Text>
            <Text style={{ fontSize: 15, color: APPCOLORS.darkGray, fontWeight: '400' }}> Correo: {profile?.correo} </Text>
            <Text style={{ fontSize: 15, color: APPCOLORS.darkGray, fontWeight: '400' }}> DNI: {profile.dni} </Text>

          </View>
          <View style={{ width: '100%', position: 'absolute', bottom: 0 }}>
            <TouchableOpacity
              onPress={logout}
              style={{ borderRadius: 30, backgroundColor: 'red', width: '100%', height: 50, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'white', fontWeight: '600' }}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </View>

        </View>
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
        <TouchableOpacity onPress={ () => onPress() } style={styles.filterBtn}>
          <Text style={styles.filterBtnTitle}>Editar:</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const Avatar = ({ url }: { url: string }) => {
  return (
    <View style={{ width: 110, height: 110, borderRadius: 100, backgroundColor: 'white', borderColor: APPCOLORS.secondary, borderWidth: 6, overflow: 'hidden' }}>
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