import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Pressable, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView, Keyboard, StyleProp, Alert } from 'react-native';
import React, { useEffect } from 'react'
import { APPCOLORS } from '@/common/utils/colors'
import { Formik } from 'formik';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link,  } from 'expo-router';
import useCustomAuth  from './hooks/useCustomAuth';
import * as Location from 'expo-location';
import { useDeviceLocation } from '@/hooks/useDeviceLocation';





export default function LoginScreen() {
  const { 
    location,
    errorMsg,
    getActualLocation } = useDeviceLocation();

  const {setLoading, loading, handleLogin} = useCustomAuth()
  const OS = Platform.OS
  const marginBottom = OS === 'android' ? 40 : 0
  


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }} >


          <View style={{ marginHorizontal: 20, marginVertical: 10, flex: 1, backgroundColor: APPCOLORS.white }}>
            <View style={styles.container}>
              <View >
                <Text style={styles.loginTitle}>Iniciar Sesion</Text>
              </View>
              <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={handleLogin}
                validateOnChange={false}
                validateOnBlur={true}
              >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                  <View style={{ flex: 1, paddingTop: 20 }} >
                    <View style={styles.inputContainer}>
                      <View style={styles.inputContent}>

                        <View style={styles.iconContainer}>
                          <Ionicons name='mail-outline' size={30} color={APPCOLORS.textGray} style={{ marginLeft: 8 }} />
                        </View>
                        <TextInput
                          style={styles.input}
                          keyboardType='email-address'
                          // onBlur={handleBlur('email')}
                          autoCapitalize='none'
                          onChangeText={handleChange('email')}
                          value={values.email}
                          placeholder='Email'
                          placeholderTextColor={APPCOLORS.textGray}

                        />
                      </View>
                    </View>
                    <View style={styles.inputContainer}>
                      <View style={styles.inputContent}>

                        <View style={styles.iconContainer}>
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

                    <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                      <TouchableOpacity disabled= {loading} style={{ marginTop: 30, marginBottom: 10 }} activeOpacity={0.7} onPress={()=>handleSubmit()}>
                          <View style={[styles.submitBtn, { backgroundColor: loading?'grey':APPCOLORS.primary}]}>
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: '500', textAlign: 'center' }}> Iniciar Sesion </Text>
                          </View>
                      </TouchableOpacity>
                      <View style={{width: '100%', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginBottom: 20 }}>

                        <Text style={{ fontSize: 15, color: APPCOLORS.textGray }}> ¿No tienes una cuenta? </Text>
                        <Pressable>
                          <Link href="/auth/createAccount"> <Text style={{ fontSize: 15, color: APPCOLORS.primary, fontWeight: 'bold' }}> Registrate </Text> </Link>
                        </Pressable>
                        
                      </View>
                    </View>
                  </View>
                )}
              </Formik>
            </View>

            {/* <View
              style={{ backgroundColor: 'white', width: '100%', height: 200, flexDirection: 'column', alignItems: 'center', marginBottom: marginBottom, marginTop: 20 }}>
              <Text style={{ fontSize: 20, color: 'black' }}> - Inicia Sesión con - </Text>
                <TouchableOpacity>

                  <Ionicons name='logo-google' size={60} color={APPCOLORS.primary} />
                </TouchableOpacity>

            </View> */}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 20
  },
  loginTitle: {
    marginLeft:10,
    fontSize: 25,
    color: APPCOLORS.textBlue,
    fontWeight: 'bold'
  },
  iconContainer: {
    width: 46,
    justifyContent: 'center',
    alignItems: 'center'
  },
    inputContainer: {
      flexDirection: 'row',
      height: 70,
      borderRadius: 12,
      marginTop: 20,
      marginBottom: 15,
      alignSelf: 'center',
      width: 300,
      backgroundColor: APPCOLORS.tertiary,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        android: {
          elevation: 4,
        },
      }),

    },
  inputContent: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 80,
    borderRadius: 12,
    marginVertical: 20,
    alignItems: 'center',
    alignSelf: 'center',
    width: 300,
    backgroundColor: APPCOLORS.tertiary
  },
  submitBtn: {
    backgroundColor: APPCOLORS.primary,
    width: 350,
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