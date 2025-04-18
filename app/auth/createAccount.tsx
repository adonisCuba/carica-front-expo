import { View, Text, Platform, Pressable, TextInput, TouchableOpacity, StyleSheet, ScrollView, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import ScreenLayout from '@/common/components/ScreenLayout'
import { APPCOLORS } from '@/common/utils/colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Link, useNavigation } from 'expo-router'
import { Formik } from 'formik'
import SelectRoleBtn from '@/common/components/SelectRoleBtn'
import  useCustomAuth  from './hooks/useCustomAuth'
import CustomHeader from '@/common/components/Header'


export const enum UserType {
  driver =  'driver',
  loader = 'loader',
}
export default function CreateAccountScreen() {
  const navigation = useNavigation();

  const {loading,handleSignUp} = useCustomAuth();
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <CustomHeader hasBack={true} />,
    })
  })


  return (
        <KeyboardAvoidingView
        style={{backgroundColor: APPCOLORS.white, flex:1}}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{backgroundColor: APPCOLORS.white}}>
    
      <ScrollView  contentContainerStyle={{backgroundColor: 'white'}}>
    <View style={{marginHorizontal: 20, marginVertical: 10, flex: 1}}>

      <View style={styles.container}>
      
        <View >
          <Text style={styles.loginTitle}>Ingresa Tus Datos</Text>
          <Text style={styles.subtitle}>Para ingresar debes tener una cuenta. Crea una!!</Text>
          <Text style={styles.subtitle}>Si ya tienes cuenta: <Link href={'/auth/login'} style={{ color: APPCOLORS.primary }}>Ingresa Aqui</Link></Text>
        </View>
        <Formik
          initialValues={{ name: '', email: '', password: '', dni: '', telefono: '', role: UserType.driver }}
          onSubmit={handleSignUp}
        >
          {({ handleChange, handleBlur, handleSubmit, values,setFieldValue }) =>{  
             const { roleSelected, handleChangeRole } = useCustomAuth(setFieldValue);
          return(
        
            <View style={{ flex: 1, paddingTop: 20, backgroundColor: APPCOLORS.white }} >
              <View style={styles.inputContainer}>
                <View style={styles.inputContent}>

                  <View>
                    <Ionicons name='person-outline' size={30} color={APPCOLORS.textGray} style={{ marginLeft: 8 }} />
                  </View>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('name')}
                    value={values.name}
                    placeholder='Nombre Completo'
                    placeholderTextColor={APPCOLORS.textGray}

                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.inputContent}>

                  <View>
                    <Ionicons name='mail-outline' size={30} color={APPCOLORS.textGray} style={{ marginLeft: 8 }} />
                  </View>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('email')}
                    value={values.email}
                    placeholder='Email'
                    placeholderTextColor={APPCOLORS.textGray}

                  />

                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.inputContent}>

                  <View>
                    <Ionicons name='lock-closed-outline' size={30} color={APPCOLORS.textGray} style={{ marginLeft: 8 }} />
                  </View>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('password')}
                    value={values.password}
                    placeholder='Contraseña'
                    placeholderTextColor={APPCOLORS.textGray}

                  />

                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.inputContent}>

                  <View>
                    <Ionicons name='id-card-outline' size={30} color={APPCOLORS.textGray} style={{ marginLeft: 8 }} />
                  </View>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('dni')}
                    value={values.dni}
                    placeholder='DNI'
                    placeholderTextColor={APPCOLORS.textGray}

                  />

                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.inputContent}>

                  <View>
                    <Ionicons name='phone-portrait-outline' size={30} color={APPCOLORS.textGray} style={{ marginLeft: 8 }} />
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
                {/* botones de seleccion de rol  */}
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    {/* Boton de Dador */}
                    <SelectRoleBtn size={15} role={UserType.driver} handleRolChange={()=>handleChangeRole(UserType.driver)} title='Camionero'
                    isSelected={roleSelected === UserType.driver}
                    />
                    {/* Boton de Camionero */}
                    <SelectRoleBtn size={15} role={UserType.loader} handleRolChange={()=>handleChangeRole(UserType.loader)} title='Dador de Carga'
                    isSelected={roleSelected === UserType.loader} />
                </View>
                <View>

                <TouchableOpacity
                    disabled={loading}
                    onPress={()=>handleSubmit()} 
                    style={{ marginTop: 30, marginBottom: 10}} 
                    activeOpacity={0.7}>
                  
                  <View style={[styles.submitBtn, { backgroundColor: loading?'grey':APPCOLORS.primary}]}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: '500', textAlign: 'center' }}> Crear Cuenta </Text>
                  </View>
                </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          }
        </Formik>
      </View>
      
    </View>
      </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 20
  },
  loginTitle: {
    fontSize: 18,
    color: APPCOLORS.textBlue,
    fontWeight: '500'
  },
  subtitle: {
    fontSize: 13,
    color: APPCOLORS.textGray,
    fontWeight: '500'
  },
  inputContainer: {
    flexDirection: 'row',
    height: 70,
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
    height: '100%',
    borderRadius: 12,
    marginVertical: 20,
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    backgroundColor: APPCOLORS.tertiary
  },
  roleButtonActive:{
    flexDirection: 'row', 
    backgroundColor: APPCOLORS.primary,
    width: 170,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  roleButtonInactive:{
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
    width: '100%',
    height: 70,
    borderRadius: 12,
    alignContent: 'center',
    justifyContent: 'center'
  },
  input:{
    flex: 1,
    fontSize: 16,
    color: APPCOLORS.primary,
    height: '100%',
    paddingHorizontal: 8,
  }
})