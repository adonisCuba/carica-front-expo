import React, { useEffect, useState } from 'react'
import { Button, Modal, StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import { APPCOLORS } from '../utils/colors';
import { TextInput } from 'react-native';
import { Platform } from 'react-native';
import { UserSupabaseResponse } from '../interfaces/userType';
import { updateProfile } from '../supabase/users/fetchUser';
import { ScrollView } from 'react-native';

interface CustomModalProps {
    openModal: boolean;
    toggleModal: () => void;
    user: UserSupabaseResponse

}
export const DriverProfileModal = ({ openModal, toggleModal, user }: CustomModalProps) => {
    const [formData, setFormData] = useState({
        Nombre: user.nombre,
        Apellido: user.apellido,
        Telefono: user.telefono,
        Email: user.email,
        DNI: user.dni
    });
    useEffect(() => {
        setFormData({
            Nombre: user.nombre,
            Apellido: user.apellido,
            Telefono: user.telefono,
            Email: user.email,
            DNI: user.dni
        })
    },[user, openModal])
    const handleChange = (key: keyof typeof formData, value: string) => {
        setFormData({ ...formData, [key]: value });
    };
    const handleSubmit = async () => {
        const userObj = {
            id: user.id,
            nombre: formData.Nombre,
            apellido: formData.Apellido,
            telefono: formData.Telefono,
            email: formData.Email,
            dni: formData.DNI,
            rol_id: user.rol_id
        }
        await updateProfile(userObj)
        toggleModal()
    }

    return (
        <Modal visible={openModal} transparent={true} animationType='fade'>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} contentContainerStyle={{ flexGrow: 1 }}
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
                        height: '70%',
                        borderRadius: 30,

                    }}>
                        <Text style={{ alignSelf: 'center', color: APPCOLORS.primary, fontWeight: 'bold', marginTop: 8, fontSize: 25 }}>Editar Datos:</Text>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>

                           
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                {Object.entries(formData).map(([key, value]) => (
                                    <View style={styles.inputContainer} key={key}>
                                        <View style={styles.inputContent}>
                                            <TextInput
                                                style={{
                                                    flex: 1,
                                                    fontSize: 20,
                                                    color: APPCOLORS.primary,
                                                    fontWeight: '500',
                                                    paddingLeft: 10,
                                                }}
                                                keyboardType='default'
                                                autoCapitalize='none'
                                                placeholder={`${key[0].toUpperCase() + key.slice(1)}:`}
                                                placeholderTextColor={APPCOLORS.textGray}
                                                value={value}
                                                onChangeText={(text) => handleChange(key as keyof typeof formData, text)}
                                            />
                                        </View>
                                    </View>
                                ))}

                            </View>
                            </ScrollView>
                        </View>
                        <Button
                            color={'orange'}
                            title='Editar Datos'
                            onPress={()=>handleSubmit()}
                        />
                        <Button
                            title='Cerrar'
                            onPress={toggleModal}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    )
}


const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        height: 70,
        borderRadius: 12,
        marginTop: 5,
        marginBottom: 5,
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
})