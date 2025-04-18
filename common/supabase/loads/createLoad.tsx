import { getCityIdByName } from "@/common/interfaces/ciudadesType";
import { getLoadUnitIdFromString, Load, LoadSupabaseResponse, LoadUnitWithIdEnum } from "@/common/interfaces/loadType";
import { getProvinciaIdByName } from "@/common/interfaces/provinciasType";
import { supabase } from "@/lib/supabase";
import { getUserId } from "../users/fetchUser";
import { MaterialEnum } from "@/common/interfaces/materialType";
import { Database } from "@/types/supabase";
import { Alert } from "react-native";
import { ServiceLocation } from '../../services/locationService';
import { getTruckTypeIdFromString } from "@/common/utils/getTruckid";
export interface UbicacionSupabaseResponse {
    id:           string;
    direccion:    string;
    provincia_id: number;
    ciudad_id:    number;
    lat:          number;
    lng:          number;
}

export const createLoad = async (load: any) =>{
    
    let ubicacionInicial;
    let ubicacionFinal;
    const {
        tipo,
        tipoCarga,
        peso,
        tipoEquipo,
        correo,
        telefono,
        puntoReferencia,
        precio,
       localidadCarga,
       localidadDescarga,
        fechaCarga, 
        fechaDescarga,
    } = load;
    let coordsCarga;
    let coordsDescarga;
    const newDirectionLoad = `${localidadCarga}`;
    const newDirectionDownload = `${localidadDescarga}`; 
    function formatDate(isoDate:any): string {
        console.log(isoDate)
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
        const year = date.getFullYear();
        
        return `${day}/${month}/${year}`;
      }
      
    try {
        //obtiene coord carga
        const {data:latLngCarga} = await ServiceLocation.getGoogleGeocodingLatLng(newDirectionLoad);
        coordsCarga = latLngCarga;
        if(!coordsCarga) throw new Error('No se pudo crear la carga/ubicacion')
        //obtiene coord descarga
        const {data:latLngDescarga} = await ServiceLocation.getGoogleGeocodingLatLng(newDirectionDownload);
        coordsDescarga = latLngDescarga;
        if(!coordsDescarga) throw new Error('No se pudo crear la carga/ubicacion')
    } catch (error) {
        Alert.alert('Error', 'No se pudo crear la carga/ubicacion')
        console.log(error);
    }
    try {
        const { data: ubicacionCarga, error: ubicacionCargaError } = await supabase.from('ubicaciones').insert({
            direccion: `${localidadCarga}`,
            lat: coordsCarga!.lat,
            lng: coordsCarga!.lng
        }).select('id');
        if(ubicacionCargaError)throw new Error(ubicacionCargaError.message)
        
        const { data: ubicacionDescarga, error: ubicacionDescargaError } = await supabase.from('ubicaciones').insert({
            direccion: `${localidadDescarga}`,
            lat: coordsDescarga!.lat,
            lng: coordsDescarga!.lng,
        }).select('id');

        if(ubicacionDescargaError)throw new Error(ubicacionDescargaError.message);
            //ID's  de las ubicaciones
        ubicacionInicial = ubicacionCarga[0].id;
        ubicacionFinal = ubicacionDescarga[0].id;

    } catch (error) {
        Alert.alert('Error', 'No se pudo crear la carga...')
        console.log(error);
    }

    //Creacion de Carga
    try {
        const loadPresentation = 
        tipoCarga === 'Granel Bulto' 
                ? 'GranelBulto' 
                : tipoCarga === 'Big Bag' 
                ? 'BigBag' 
                : tipoCarga;
        const material = MaterialEnum[tipo as keyof typeof MaterialEnum]
        const userID = (await getUserId()).toString();

        if(!userID)return;
        const newLoadData: Database['public']['Tables']['cargas']['Insert'] = {
            dador_id: userID,
            peso: peso.toString(),
            ubicacionfinal_id: ubicacionFinal!,
            ubicacioninicial_id: ubicacionInicial!,
            telefonodador: telefono,
            puntoreferencia: puntoReferencia || " ",
            material_id: material,
            presentacion_id: getLoadUnitIdFromString(tipoCarga)!,
            valorviaje: precio.toString() ?? " ",
            pagopor: 'Otros',
            otropagopor: null,
            fechacarga: formatDate(fechaCarga),
            fechadescarga: fechaDescarga === null ? "" : formatDate(fechaDescarga),
            formadepago_id: 'c96c6cd8-8742-4a8c-9df6-18554a7c87af',
            email: correo ?? " ",
            tipo_equipo: getTruckTypeIdFromString(tipoEquipo)
          };
         const {data: newLoad, error: loadError} = await supabase.from('cargas').insert(newLoadData).select('id');
                  
         if(loadError) throw loadError;
         console.log(loadError)
    } catch (error) {
        Alert.alert('Error', 'No se pudo crear la carga')
        console.log(error);
    }



}

