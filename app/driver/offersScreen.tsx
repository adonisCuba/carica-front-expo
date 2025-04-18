import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Button, Modal, Pressable, KeyboardAvoidingView, Platform, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react'
import Slider from '@react-native-community/slider';
import { useLayoutEffect } from 'react'
import { useNavigation } from 'expo-router'
import CustomHeader from '@/common/components/Header'
import ScreenLayout from '@/common/components/ScreenLayout'
import { APPCOLORS } from '@/common/utils/colors'
import Ionicons from '@expo/vector-icons/Ionicons';

import { AppDispatch, RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getLoads, getLoadsByLocation } from '@/store/slices/loads';
import OfferCardDriver from '@/common/components/OfferCardDriver';
import CustomPicker from '@/common/components/CustomPicker';
import { AllProvinciasArray } from '@/common/interfaces/provinciasType';
import { AllCitiesArray, citiesByProvinceName } from '@/common/interfaces/ciudadesType';
import { TextInput } from 'react-native';
import { getPlaces } from '@/common/utils/getPlaces';
import { GetPlacesResponse } from '@/common/interfaces/googlePlaces';
import { getLoadsByRadius } from '@/common/supabase/loads/getLoadsByRadius';



export default function OfferScreen() {

  const { loads, loading, error } = useSelector((state: RootState) => state.loads)
  const { isSubscribed } = useSelector((state: RootState) => state.subscribed)
  console.log(isSubscribed)

  const [isSelectingSuggestion, setIsSelectingSuggestion] = useState(false);

  const dispatch = useDispatch<AppDispatch>()
  const [openModal, setOpenModal] = useState(false)
  const [value, setValue] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [debouncedText, setDebouncedText] = useState('');
  const [suggestions, setSuggestions] = useState<GetPlacesResponse[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const toggleModal = () => {
    setOpenModal(!openModal)
    setSearchText('')
    setDebouncedText('')
    setSuggestions([])

  }
  let btnActive = searchText.includes('Argentina')
  const navigation = useNavigation()
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <CustomHeader hasBack={false} />,
      tabBarLabel: 'Ofertas',
    })
  }, []);

  useEffect(() => {
    dispatch(getLoads(true))
  }, [])

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(searchText);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchText]);

  useEffect(() => {
    if (isSelectingSuggestion) {
      setIsSelectingSuggestion(false); // Resetea el estado después de evitar la búsqueda
      return;
    }
    if (debouncedText) {
      fetchPlaces(debouncedText);
    } else {
      setSuggestions([]);
    }

  }, [debouncedText]);
  const fetchPlaces = async (query: string) => {
    const mockData = await getPlaces(query);
    setSuggestions(mockData as any);
  };

  const handleSubmitModal = async () => {
    if (value === 0) {

      Alert.alert('Debes Seleccionar un Radio en Kms')
      return;
    };
    await dispatch(getLoadsByLocation({ address: searchText, radius: value }))
    toggleModal();
  }
    const onRefresh = React.useCallback(async () => {
      setRefreshing(true);
      await dispatch(getLoads(true))
      setRefreshing(false);
      
    }, []);
  const handleSuggestionPress = useCallback((suggestion: GetPlacesResponse) => {
    setIsSelectingSuggestion(true);
    setSearchText(`${suggestion.first.trim()} ${suggestion.secondary.trim()}`);
    setSuggestions([]);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: APPCOLORS.tertiary, }} >
      <ScreenHeader onPress={toggleModal} />
      <ScreenLayout backgroundColor={APPCOLORS.tertiary} margin={5}>
        <ScrollView refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/> } style={{ flex: 1, backgroundColor: APPCOLORS.tertiary, }} contentContainerStyle={{ justifyContent: 'center', gap: 15 }}>
          {/*Listado de cargas */}
          <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', }}>
            {/* <OfferCard /> */}
            {
              (loads.length > 0) &&
                loads.map((load, index) => (
                  <OfferCardDriver key={index} load={load} />
                ))
               
            }
            {
              loads === undefined || loads.length === 0    &&
              (
                <View style={{ flexDirection: 'column', justifyContent: 'center', flex: 1, width: '90%', height: 150, borderRadius: 30, backgroundColor: 'white', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 90 }}>

                  <Text style={{ fontSize: 20, color: APPCOLORS.primary, fontWeight: 'bold' }}> NO HAY CARGAS PARA MOSTRAR</Text>
                  <Text style={{ fontSize: 20, color: APPCOLORS.primary, fontWeight: '400', marginTop: 10 }}> Intenta filtrar con otros parámetros </Text>
                </View>
              )
            }
          </View>
          <View style={{ height: 100 }} />
        </ScrollView>
      </ScreenLayout>

      <Modal visible={openModal} transparent={true} animationType='fade'>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.32)' }}>
          <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.32)' }}>
            <View style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 6,
              },
              shadowOpacity: 0.39,
              shadowRadius: 8.30,
              elevation: 13,
              backgroundColor: 'white',
              padding: 20,
              height: 500,
              borderRadius: 30,
              margin: 20
            }}>
              <Text style={{
                alignSelf: 'center',
                color: APPCOLORS.primary,
                fontWeight: 'bold',
                marginTop: 8,
                fontSize: 18

              }}>Filtrar Ofertas:</Text>
              <Text style={{
                alignSelf: 'center',
                color: APPCOLORS.primary,
                fontWeight: '500',
                marginTop: 8,
                fontSize: 18

              }}>Por Kms</Text>

              <Slider
                thumbTintColor='black'
                style={{ width: '100%', height: 40, marginTop: 10 }}
                step={50}
                minimumValue={0}
                maximumValue={400}
                minimumTrackTintColor="#000000"
                maximumTrackTintColor="#acacac"
                onValueChange={setValue}
              />
              <Text style={{ alignSelf: 'center', color: APPCOLORS.primary, fontWeight: '500', marginTop: 2, fontSize: 18 }}>{value} Kms</Text>

              <View style={{ flex: 1, backgroundColor: '', marginTop: 8, }}>

                <Text style={{
                  alignSelf: 'center',
                  color: APPCOLORS.primary,
                  fontWeight: '500',
                  fontSize: 18,
                  marginTop: 20

                }}>Escribe una direccion/localidad</Text>
                <TextInput
                  placeholder="Buscar dirección"
                  value={searchText}
                  onChangeText={setSearchText}
                  style={{
                    borderWidth: 1,
                    borderColor: APPCOLORS.textGray,
                    borderRadius: 10,
                    padding: 10,
                    marginTop: 10,
                  }}
                />
                <ScrollView style={{ marginTop: 10, maxHeight: 150 }}>
                  {
                    suggestions.length > 0
                      ? suggestions.map((item, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => handleSuggestionPress(item)}
                          style={{
                            flexDirection: 'row',
                            padding: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: '#ccc',
                          }}
                        >
                          {
                            btnActive && null
                          }
                          <Text style={{ fontWeight: 'bold' }}>{item.first}, </Text>
                          <Text>{item.secondary}</Text>
                        </TouchableOpacity>
                      ))
                      : btnActive ? '' : (<Text style={{ textAlign: 'center', flexDirection: 'column', justifyContent: 'center', flex: 1, marginTop: 40, fontSize: 18, fontWeight: 'bold', color: APPCOLORS.primary }}> Sin Resultados... </Text>)}
                </ScrollView>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>

                {
                  btnActive && (<Pressable
                    style={styles.filterBtn}
                    onPress={searchText.length < 10 ? null : handleSubmitModal}>
                    <Text style={{ color: 'white', fontWeight: '600', fontSize: 20 }}>Aplicar</Text>
                  </Pressable>)
                }

                <Pressable
                  style={styles.filterBtnCancel}
                  onPress={toggleModal}>
                  <Text style={{ color: 'white', fontWeight: '600', fontSize: 20 }}>Cancelar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  )
}

const ScreenHeader = ({ onPress }: { onPress: () => void }) => {

  return (
    <View style={styles.screenTitleContainer}>
      <View>
        <Text style={styles.screenTitle}>Cargas</Text>
        <Text style={styles.screenSubtitle}>Ofertas de cargas disponibles:</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => onPress()}>
          <Ionicons name='filter' size={30} color={APPCOLORS.textBlue} />
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
    width: 120,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: APPCOLORS.primary,
    borderRadius: 12,
    alignContent: 'center',
    marginTop: 10,
    marginLeft: 20,
    alignSelf: 'flex-end'
  },
  filterBtnCancel: {
    width: 120,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b51a25',
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
    height: 170,
    backgroundColor: 'white'
  },
  inputContainer: {
    flexDirection: 'row',
    height: 55,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 2,
    alignSelf: 'center',
    width: '90%',
    backgroundColor: APPCOLORS.tertiary

  },
  inputContent: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 50,
    borderRadius: 12,
    marginVertical: 20,
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    backgroundColor: APPCOLORS.tertiary
  },
})