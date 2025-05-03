import { getLoadUnitIdFromString } from "@/common/interfaces/loadType";
import { MaterialEnum } from "@/common/interfaces/materialType";
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";
import { Alert } from "react-native";
import { ServiceLocation } from '../../services/locationService';
import { getTruckTypeIdFromString } from "@/common/utils/getTruckid";

export const editLoad = async (loadId: string, load: any) => {
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
    
    function formatDate(isoDate: any): string {
        console.log(isoDate);
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
        const year = date.getFullYear();
        
        return `${day}/${month}/${year}`;
    }
    
    try {
        // Primero obtenemos la carga actual para obtener los IDs de ubicación
        const { data: currentLoad, error: loadError } = await supabase
            .from('cargas')
            .select('ubicacioninicial_id, ubicacionfinal_id')
            .eq('id', loadId)
            .single();
            
        if (loadError) throw new Error('No se pudo obtener la información de la carga');
        
        // Obtiene coordenadas para carga
        const {data: latLngCarga} = await ServiceLocation.getGoogleGeocodingLatLng(newDirectionLoad);
        coordsCarga = latLngCarga;
        if (!coordsCarga) throw new Error('No se pudo actualizar la ubicación de carga');
        
        // Obtiene coordenadas para descarga
        const {data: latLngDescarga} = await ServiceLocation.getGoogleGeocodingLatLng(newDirectionDownload);
        coordsDescarga = latLngDescarga;
        if (!coordsDescarga) throw new Error('No se pudo actualizar la ubicación de descarga');
        
        // Actualiza ubicación de carga
        const { error: ubicacionCargaError } = await supabase
            .from('ubicaciones')
            .update({
                direccion: `${localidadCarga}`,
                lat: coordsCarga.lat,
                lng: coordsCarga.lng
            })
            .eq('id', currentLoad.ubicacioninicial_id);
            
        if (ubicacionCargaError) throw new Error(ubicacionCargaError.message);
        
        // Actualiza ubicación de descarga
        const { error: ubicacionDescargaError } = await supabase
            .from('ubicaciones')
            .update({
                direccion: `${localidadDescarga}`,
                lat: coordsDescarga.lat,
                lng: coordsDescarga.lng
            })
            .eq('id', currentLoad.ubicacionfinal_id);
            
        if (ubicacionDescargaError) throw new Error(ubicacionDescargaError.message);
        
        // Utilizamos los mismos IDs de ubicación
        ubicacionInicial = currentLoad.ubicacioninicial_id;
        ubicacionFinal = currentLoad.ubicacionfinal_id;
        
    } catch (error) {
        Alert.alert('Error', 'No se pudieron actualizar las ubicaciones');
        console.log(error);
        return;
    }
    
    // Actualización de la Carga
    try {
        const loadPresentation = 
            tipoCarga === 'Granel Bulto' 
                ? 'GranelBulto' 
                : tipoCarga === 'Big Bag' 
                    ? 'BigBag' 
                    : tipoCarga;
                    
        const material = MaterialEnum[tipo as keyof typeof MaterialEnum];
        
        const updateLoadData: Partial<Database['public']['Tables']['cargas']['Update']> = {
            peso: peso.toString(),
            telefonodador: telefono,
            puntoreferencia: puntoReferencia || " ",
            material_id: material,
            presentacion_id: getLoadUnitIdFromString(tipoCarga)!,
            valorviaje: precio.toString() ?? " ",
            fechacarga: formatDate(fechaCarga),
            fechadescarga: fechaDescarga === null ? "" : formatDate(fechaDescarga),
            email: correo ?? " ",
            tipo_equipo: getTruckTypeIdFromString(tipoEquipo)
        };
        
        const { data, error: loadError } = await supabase
            .from('cargas')
            .update(updateLoadData)
            .eq('id', loadId)
            .select();
            
        if (loadError) throw loadError;
        
        return { success: true, data };
        
    } catch (error) {
        Alert.alert('Error', 'No se pudo actualizar la carga');
        console.log(error);
        return { success: false, error };
    }
}