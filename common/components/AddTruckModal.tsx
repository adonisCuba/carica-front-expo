import React, { useEffect, useState } from 'react';
import { Button, KeyboardAvoidingView, Modal, Pressable, StyleSheet, Text, View, TextInput, Platform, Alert } from 'react-native';
import { APPCOLORS } from '../utils/colors';
import { Truck, TruckSupabaseResponse } from '../interfaces/truckType';
import { editTrucks } from '../supabase/trucks/fetchTrucks';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { createTruck, updateTruck } from '@/store/slices/trucks';
import { useSelector } from 'react-redux';
import { supabase } from '@/lib/supabase';
import CustomPicker from './CustomPicker';
import { EnumTruckTypes, LoadTypeArray } from '../interfaces/loadType';
import { ScrollView } from 'react-native';
import { getTruckTypeIdFromString } from '../utils/getTruckid';

interface CustomModalProps {
    openModal: boolean;
    toggleModal: () => void;
    truck?: Truck
}

export const AddTruckModal = ({ openModal, toggleModal, truck }: CustomModalProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const { trucks } = useSelector((state: RootState) => state.trucks)
    const [formData, setFormData] = useState({
        patente: truck?.patente || '',
        modelo: truck?.modelo || '',
        capacidad: truck?.capacidad || '',
    });
    const [truckType, setTruckType] = useState(truck?.equipo || '');
    const [otherType, setOtherType] = useState('');
    const [shouldUpdate, setShouldUpdate] = useState(false);
    console.log(typeof EnumTruckTypes.Otros)
    useEffect(() => {
        if (shouldUpdate) {
            setShouldUpdate(false);
        }
    }, [trucks, shouldUpdate]);
    const handleChange = (key: keyof typeof formData, value: string) => {

        setFormData({ ...formData, [key]: value });
    };

    const handleSubmit = async () => {
        if (formData.capacidad.trim().length === 0 || formData.modelo.trim().length === 0 || formData.patente.trim().length === 0) {
            Alert.alert('Todos los campos son oblicatorios') 
            return;
        }
        const truckTypeId = await getTruckTypeIdFromString(truckType)
        console.log(truckTypeId, 'CamionID')
        const truckid = await supabase.auth.getUser();
        const { id } = truckid.data.user!
        if (truck) {
            const truckData: TruckSupabaseResponse = {
                ...formData,
                id: truck.id,
                camionero_id: id,
                conductor_nombre: truck.conductor,
                tipoequipo_id: truckTypeId ?? ""
                // tipoequipo_id: truckType === 'Camion Jaula' ? EnumTruckTypes.CamionJaula : EnumTruckTypes[truckType as keyof typeof EnumTruckTypes]
            }
            const newTruck = await dispatch(updateTruck(truckData))
            if (newTruck) {
                Alert.alert('Exito', 'Equipo editado con exito')

            } else {
                Alert.alert('Error', 'Ocurrio un error al editar el equipo')
            }

        } else {
            const truckData: TruckSupabaseResponse = {
                ...formData,
                camionero_id: id,
                conductor_nombre: '',
                tipoequipo_id: truckTypeId ?? ""

            }
            console.log(truckData.tipoequipo_id)
            await dispatch(createTruck(truckData))
        }

        toggleModal();


    }

    return (
        <Modal visible={openModal} transparent={true} animationType='fade'>


            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.32)' }}
            >
                <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.32)' }}>
                    <View style={{
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 6 },
                        shadowOpacity: 0.39,
                        shadowRadius: 8.3,
                        elevation: 13,
                        backgroundColor: 'white',
                        padding: 20,
                        height: '65%',
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                    }}>
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>


                            <Text style={{ fontSize: 30, alignSelf: 'center', color: APPCOLORS.primary, fontWeight: 'bold', marginTop: 18, }}>
                                {truck ? 'Editar Equipo' : 'Añadir Equipo'}
                            </Text>
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
                                <View style={styles.inputContainer}>
                                    <View style={styles.inputContent}>
                                        <CustomPicker selectedValue={truckType} onValueChange={setTruckType} data={LoadTypeArray} placeholder='Seleccionar Equipo' />
                                    </View>
                                </View>
                                {
                                    truckType === 'Otros' && (
                                        <View style={styles.inputContainer}>
                                    <View style={styles.inputContent}>
                                        <TextInput
                                            style={{
                                                flex:1,
                                                fontSize: 20,
                                                color: APPCOLORS.primary,
                                                fontWeight: '500',
                                                paddingLeft: 10,
                                            }}
                                            keyboardType='default'
                                            autoCapitalize='none'
                                            placeholder={`Tipo de Equipo`}
                                            placeholderTextColor={APPCOLORS.textGray}
                                            value={otherType}
                                            onChangeText={(text) => setOtherType(text)}
                                        />
                                    </View>
                                </View>
                                    )
                                }
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 50 }}>
                                <Pressable style={styles.filterBtn} onPress={handleSubmit}>
                                    <Text style={{ color: 'white', fontWeight: '600', fontSize: 25 }}>{truck ? 'Editar' : 'Añadir'}</Text>
                                </Pressable>
                                <Pressable style={styles.filterBtnCancel} onPress={toggleModal}>
                                    <Text style={{ color: 'white', fontWeight: '600', fontSize: 25 }}>Cancelar</Text>
                                </Pressable>
                            </View>
                        </ScrollView>
                    </View>
                </View>

            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        height: 70,
        borderRadius: 12,
        marginTop: 5,
        marginBottom: 5,
        alignSelf: 'center',
        width: '90%',
        backgroundColor: APPCOLORS.tertiary,
    },
    inputContent: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        height: '100%',
        borderRadius: 12,
        marginVertical: 20,
        alignItems: 'center',
        alignSelf: 'center',
        flex: 1,
        backgroundColor: APPCOLORS.tertiary,
    },
    filterBtn: {
        width: 130,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: APPCOLORS.primary,
        borderRadius: 12,
        alignSelf: 'flex-end',
    },
    filterBtnCancel: {
        width: 130,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b51a25',
        borderRadius: 12,
        alignSelf: 'flex-end',
    },
});
