import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView, Pressable } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { APPCOLORS } from '@/common/utils/colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRoute } from '@react-navigation/native';
import { Formik, useFormikContext } from 'formik'
import { LoadTypeArray, LoadUnitArray } from '@/common/interfaces/loadType';
import CustomPicker from '@/common/components/CustomPicker';
import { MaterialTypeArray } from '@/common/interfaces/materialType';
import validationLoadSchema from '@/common/validation/loadSchema';
import { Alert } from 'react-native';
import { AllProvinciasArray } from '@/common/interfaces/provinciasType';
import { createLoad } from '@/common/supabase/loads/createLoad';
import { useNavigation } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { getLoads } from '@/store/slices/loads';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { citiesByProvinceName } from '@/common/interfaces/ciudadesType';
import CustomHeader from '@/common/components/Header';
import SuggestionsInput from '@/common/components/suggestionsInput';



interface CreateLoadProps {
  loadId?: any
}
const CreateLoad = ({ loadId }: CreateLoadProps) => {

  const [loading, setLoading] = useState(false);
  const [selectDownloadDate, setSelectDownloadDate] = useState(false);

  const dispatch = useDispatch<AppDispatch>()
  const offer = useRoute()
  const navigation = useNavigation();

  const handleLoad = async (values: any) => {
    setLoading(true)
    await createLoad(values);
    navigation.goBack();
    await dispatch(getLoads(false));
    setLoading(false)
  }

  if (loading) return <ActivityIndicator size={'large'} color={APPCOLORS.primary} style={{ flex: 1 }} />


  return (
    <View style={{ flex: 1, backgroundColor: APPCOLORS.tertiary }}>
      <CustomHeader hasBack onPress={() => navigation.goBack()} />
      <View>
        <ScreenHeader />
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} contentContainerStyle={{ flexGrow: 1 }} >


          <ScrollView style={{ backgroundColor: APPCOLORS.white }}>

            <View style={styles.container}>

              <View >
                <Text style={styles.inputTitle}>Informacion básica</Text>



              </View>
              <Formik
                initialValues={{
                  tipo: '',
                  tipoCarga: '',
                  peso: '',
                  tipoEquipo: '',
                  correo: '',
                  telefono: '',
                  puntoReferencia: '',
                  precio: '',
                  localidadCarga: '',
                  localidadDescarga: '',
                  fechaDescarga: new Date(),
                  fechaCarga: new Date()
                }}
                onSubmit={(values, { setSubmitting }) => {
                  console.log(values.localidadDescarga)
                  setSubmitting(true);
                  handleLoad(values) // Acción al enviar datos válidos
                  setSubmitting(false);
                }}
                validationSchema={validationLoadSchema}
              >
                {({ handleChange, handleSubmit, values, validateForm }) => (
                  <View style={{ flex: 1, paddingTop: 3, backgroundColor: APPCOLORS.white }} >
                    <View style={styles.inputContainer}>
                      <View style={styles.inputContent}>
                        <View>
                          <Ionicons name='beaker-outline' size={20} color={APPCOLORS.textGray} style={{ marginLeft: 8 }} />
                        </View>
                        <CustomPicker selectedValue={values.tipo} onValueChange={handleChange('tipo')} data={MaterialTypeArray} placeholder='Material a transportar' />
                      </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignContent: 'center', flexDirection: 'row', paddingHorizontal: 15, gap: 3, }}>
                      <View style={{ flex: 1 }}>
                        <View style={[styles.inputContent, { height: 55 }]}>
                          <View>
                            <Ionicons name='list-outline' size={20} color={APPCOLORS.textGray} style={{ marginLeft: 8 }} />
                          </View>
                          <CustomPicker selectedValue={values.tipoCarga} onValueChange={handleChange('tipoCarga')} data={LoadUnitArray}
                            placeholder='Tipo de Carga' />

                        </View>
                      </View>
                      <View style={{ flex: 1 }}>
                        <View style={[styles.inputContent, { height: 55 }]}>
                          <View>
                            <Ionicons name='scale-outline' size={20} color={APPCOLORS.textGray} style={{ marginLeft: 8 }} />
                          </View>
                          <TextInput
                            keyboardType='numeric'
                            autoCapitalize='none'
                            style={styles.input}
                            onChangeText={handleChange('peso')}
                            value={values.peso}
                            placeholder='Peso (kg)'
                            placeholderTextColor={APPCOLORS.textGray}

                          />
                        </View>
                      </View>

                    </View>
                    <View style={styles.inputContainer}>
                      <View style={styles.inputContent}>
                        <View>
                          <Ionicons name='pint-outline' size={20} color={APPCOLORS.textGray} style={{ marginLeft: 8 }} />
                        </View>
                        <CustomPicker selectedValue={values.tipoEquipo} onValueChange={handleChange('tipoEquipo')} data={LoadTypeArray} placeholder='Tipo de Equipo' />
                      </View>

                    </View>
                    <Text style={[styles.inputTitle, { marginTop: 10 }]}>Ubicacion y Fecha de Carga</Text>
                    <SuggestionsInput
                      placeholder='Ubicacion Carga'
                      value={values.localidadCarga}
                      onChange={handleChange('localidadCarga')}
                      onSuggestionSelected={(suggestion: any) => { }}
                    />
                    <View style={{ justifyContent: 'center', alignContent: 'center', flexDirection: 'row', paddingHorizontal: 5, gap: 10, marginTop: 10 }}>
                      {
                        Platform.OS !== 'ios'
                          ?
                          <AndroidDTPicker mode='date' value={values.fechaCarga} name={"fechaCarga"} />
                          :
                          (
                            <>
                              <Text style={[styles.inputTitle, { marginTop: 5, marginLeft: 0 }]}>Selecciona Fecha</Text>
                              <RNDateTimePicker mode='date' value={values.fechaCarga} onChange={() => handleChange('fechaCarga')} />)
                            </>
                          )
                      }

                    </View>

                    <Text style={[styles.inputTitle, { marginTop: 10 }]}>Ubicacion y Fecha de Descarga</Text>
                    <SuggestionsInput
                      placeholder='Ubicación Descarga'
                      value={values.localidadDescarga}
                      onChange={handleChange('localidadDescarga')}
                      onSuggestionSelected={(suggestion: any) => { }}
                    />
                    <View style={{ justifyContent: 'center', alignContent: 'center', flexDirection: 'row', paddingHorizontal: 5, gap: 10, marginTop: 10 }}>

                      { !selectDownloadDate ? <TouchableOpacity style={styles.submitBtn} onPress={() => setSelectDownloadDate(true)}>
                        <Text style={{ color: APPCOLORS.white, fontWeight: 'bold'}}> Seleccionar Fecha de Descarga (opcional)</Text>
                      </TouchableOpacity>
                      : null
}
                      {
                        selectDownloadDate && (
                          Platform.OS !== 'ios' ? (
                            <AndroidDTPicker mode="date" value={values.fechaDescarga} name="fechaDescarga" />
                          ) : (
                            <>  
                            <TouchableOpacity style={{  alignSelf:'center' }} onPress={() => setSelectDownloadDate(false)}>
                              <Ionicons name='close-outline' size={20} color={'red'}  />

                            </TouchableOpacity>
                              <Text style={[styles.inputTitle, { marginTop: 5, marginLeft: 0 }]}>
                                Selecciona Fecha
                              </Text>
                              <RNDateTimePicker
                                mode="date"
                                value={values.fechaDescarga}
                                onChange={(event, selectedDate) => {
                                  if( !selectDownloadDate ) return
                                  handleChange('fechaDescarga')
                                }}
                              />
                            </>
                          )
                        )
                      }



                    </View>
                    <Text style={[styles.inputTitle, { marginTop: 10 }]}>Informacion de Contacto</Text>
                    <View style={styles.inputContainer}>
                      <View style={styles.inputContent}>

                        <View>
                          <Ionicons name='mail-outline' size={20} color={APPCOLORS.textGray} style={{ marginLeft: 8 }} />
                        </View>
                        <TextInput
                          keyboardType='email-address'
                          autoCapitalize='none'
                          style={styles.input}
                          onChangeText={handleChange('correo')}
                          value={values.correo}
                          placeholder='Correo (Opcional)'
                          placeholderTextColor={APPCOLORS.textGray}

                        />

                      </View>
                    </View>
                    <View style={styles.inputContainer}>
                      <View style={styles.inputContent}>

                        <View>
                          <Ionicons name='phone-portrait-outline' size={20} color={APPCOLORS.textGray} style={{ marginLeft: 8 }} />
                        </View>
                        <TextInput
                          style={styles.input}
                          onChangeText={handleChange('telefono')}
                          value={values.telefono}
                          placeholder='Teléfono'
                          placeholderTextColor={APPCOLORS.textGray}

                        />

                      </View>

                    </View>
                    <View style={styles.inputContainer}>
                      <View style={styles.inputContent}>

                        <View>
                          <Ionicons name='locate-outline' size={20} color={APPCOLORS.textGray} style={{ marginLeft: 8 }} />
                        </View>
                        <TextInput
                          style={styles.input}
                          onChangeText={handleChange('puntoReferencia')}
                          value={values.puntoReferencia}
                          placeholder='Punto de Referencia (Opcional)'
                          placeholderTextColor={APPCOLORS.textGray}

                        />

                      </View>
                    </View>
                    <View style={styles.inputContainer}>
                      <View style={styles.inputContent}>

                        <View>
                          <Ionicons name='cash-outline' size={20} color={APPCOLORS.textGray} style={{ marginLeft: 8 }} />
                        </View>
                        <TextInput
                          keyboardType='numeric'
                          style={styles.input}
                          onChangeText={handleChange('precio')}
                          value={values.precio}
                          placeholder='Precio (Opcional)'
                          placeholderTextColor={APPCOLORS.textGray}

                        />

                      </View>
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, alignContent: 'center', alignSelf: 'center' }}>
                      <View style={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}>
                        <TouchableOpacity style={{ marginTop: 30, marginBottom: 10, alignItems: 'center', justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }} activeOpacity={0.7}
                          onPress={async () => {
                            const validationErrors: any = await validateForm();
                            if (Object.keys(validationErrors).length > 0) {
                              // Mostrar el primer error
                              const firstErrorField = Object.keys(validationErrors)[0];
                              const firstErrorMessage = validationErrors[firstErrorField];
                              Alert.alert('Error en el formulario', firstErrorMessage);
                            } else {
                              handleSubmit();
                            }
                          }}
                        >

                          <View style={styles.submitBtn}>
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: '500', textAlign: 'center' }}> {'Crear Carga'} </Text>
                          </View>

                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              </Formik>
            </View>
            <View style={{ height: 300 }} />
          </ScrollView>

        </KeyboardAvoidingView>
      </View>

    </View>
  )
}

interface DatePickerProps {
  mode: 'date' | 'time' | 'datetime';
  value: Date; // Fecha actual
  name: string
}
const AndroidDTPicker = ({ value, name }: DatePickerProps) => {
  const { setFieldValue } = useFormikContext();

  const [showDT, setShowDT] = useState(false);
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDT(false); // Cierra el picker
    if (selectedDate) {
      setFieldValue(name, selectedDate);
      console.log(value)// Envía la fecha seleccionada al padre
    }
  };
  function formatDate(isoDate: any) {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity
        style={{
          backgroundColor: APPCOLORS.primary,
          width: 170,
          height: 40,
          borderRadius: 12,
          justifyContent: 'center',
        }}
        onPress={() => setShowDT(true)}>
        <Text style={{ justifyContent: 'center', alignSelf: 'center', color: 'white', fontWeight: '500', fontSize: 18 }}> Seleccionar Fecha: </Text>
      </TouchableOpacity>
      <Text style={[styles.inputTitle]}>Fecha {formatDate(value)} </Text>
      {showDT === true &&
        <DateTimePicker
          value={value}
          mode="date" // Cambia a "time" si necesitas seleccionar la hora
          display="calendar" // Cambia a "spinner" o "calendar" si es necesario
          onChange={handleDateChange}

        />

      }
    </View>
  )
}
const ScreenHeader = () => {
  return (
    <View style={styles.screenTitleContainer}>
      <View>
        <Text style={styles.screenTitle}>Crear Cargas</Text>
        <Text style={styles.screenSubtitle}>Recuerda ingresar todos los datos: </Text>
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
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 10
  },
  inputTitle: {
    fontSize: 18,
    color: APPCOLORS.textBlue,
    fontWeight: 'bold',
    marginLeft: 50
  },
  subtitle: {
    fontSize: 13,
    color: APPCOLORS.textGray,
    fontWeight: '500'
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
    marginVertical: 10,
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    backgroundColor: APPCOLORS.tertiary
  },
  roleButtonActive: {
    flexDirection: 'row',
    backgroundColor: APPCOLORS.primary,
    width: 170,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  roleButtonInactive: {
    flexDirection: 'row',
    borderWidth: 0.9,
    borderColor: 'gray',
    backgroundColor: APPCOLORS.tertiary,
    width: 170,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  submitBtn: {
    backgroundColor: APPCOLORS.primary,
    width: 300,
    height: 50,
    borderRadius: 12,
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: APPCOLORS.primary,
    height: '100%',
    paddingHorizontal: 8,
  }
})
export default CreateLoad