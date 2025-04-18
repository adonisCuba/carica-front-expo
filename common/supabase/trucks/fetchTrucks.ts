import { View, Text, Alert } from 'react-native'
import React from 'react'
import { supabase } from '@/lib/supabase'
import { Truck, TruckSupabaseResponse } from '@/common/interfaces/truckType';
import { LoadTypeArray } from '@/common/interfaces/loadType';

const fetchTrucks = async (): Promise<Truck[] | undefined> => {
    const { data: dataTrucks, error } = await supabase.auth.getUser();
    if (error) throw error
    const role = dataTrucks.user!.user_metadata.rol_nombre;
    const userId = dataTrucks?.user?.id
    if (!userId) return undefined


    switch (role) {
        case 'driver':
           console.log(userId)
            const {data:trucksDriver , error:driverError} = await supabase.from('camiones').select('*').eq('camionero_id', userId)
            
            console.log(trucksDriver?.length)
            if(driverError) Alert.alert('Error al entregar Camiones')
            const dataDriver = await trucksDriver as TruckSupabaseResponse[]
            if (!dataDriver) return undefined
            try {
                const allTrucks = Promise.all(dataDriver.map(async (truck) => {
                    const fullTrucks = await truckMapper(truck)
                    return fullTrucks as Truck
                }) || [])
                return allTrucks
            } catch (error) {
                console.log(error, 'error catch fetch trucks')
                Alert.alert('Error', 'Ocurrio un error al traer los camiones')
            }
            break;
        case 'loader':
            console.log('Estoy pasando aqui');
            const {data: trucks, error} = await supabase.from('camiones').select('*')
            if(error) console.log(error)
            if(!trucks) return;
            const data = await trucks

            if (!data) return undefined
            try {
                const allTrucks = Promise.all(data.map(async (truck) => {
                    const fullTrucks = await truckMapper(truck as TruckSupabaseResponse)
                    return fullTrucks as Truck
                }) || [])
                return allTrucks
            } catch (error) {
                console.log(error, 'error catch fetch trucks')
                Alert.alert('Error', 'Ocurrio un error al traer los camiones')
            }
            break
        default:
            break;
    }


}

export default fetchTrucks

const truckMapper = async (truck: TruckSupabaseResponse): Promise<Truck | undefined> => {
    const {
        camionero_id,
        capacidad,
        conductor_nombre,
        id,
        modelo,
        patente,
        tipoequipo_id,
    } = truck
    try {
        const { data: camionero, error: errorCamionero } = await supabase.from('usuarios').select('nombre,telefono').eq('id', camionero_id).single();
        if (errorCamionero) {throw errorCamionero};
        const { data: tipoEquipo, error: errorTipoEquipo } = await supabase.from('tipoequipo').select('descripcion').eq('id', tipoequipo_id).single();
        if (errorTipoEquipo) {throw errorTipoEquipo};
        return {
            id: id!,
            modelo: modelo,
            patente: patente,
            capacidad: capacidad,
            conductor: camionero.nombre,
            camionero: camionero.telefono,
            equipo: tipoEquipo.descripcion
        }
    } catch (error) {
        console.log(error)
        return undefined
    }

}


export const editTrucks = async (truck: TruckSupabaseResponse): Promise<boolean> => {
    if (!truck) return false;
    try {

        const { data, error } = await supabase.from('camiones').update({
            camionero_id: truck.camionero_id,
            modelo: truck.modelo,
            conductor_nombre: truck.conductor_nombre,
            id: truck.id,
            capacidad: truck.capacidad,
            patente: truck.patente,
            tipoequipo_id: truck.tipoequipo_id
        }).eq('id', truck.id!);
        if (error) throw error;
        return true

    } catch {
        Alert.alert('Error', 'Ocurrio un error al editar el camion')
        return false
    }

}

export const addTruck = async (truck: TruckSupabaseResponse): Promise<boolean> => {
    try {
        console.log(truck.tipoequipo_id,'IDTRUCK')
        console.log(LoadTypeArray.find((type) => type === truck.tipoequipo_id))
        const { data, error } = await supabase.from('camiones').insert({
            camionero_id: truck.camionero_id,
            modelo: truck.modelo,
            conductor_nombre: truck.conductor_nombre,
            capacidad: truck.capacidad,
            patente: truck.patente,
            tipoequipo_id: truck.tipoequipo_id

        })
        console.log(truck.tipoequipo_id)
        if (error) throw error
        return true
    } catch (error) {
        console.log(error)
        Alert.alert('Error', 'Ocurrio un error al crear el camion')
        return false
    }

}

