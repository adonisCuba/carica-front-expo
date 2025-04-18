import { Load, LoadSupabaseUnit } from "@/common/interfaces/loadType";
import { supabase } from "@/lib/supabase";

interface FetchLoadsProps{
    isDriver?: boolean;
}
export const fetchLoads = async ({isDriver = false}: FetchLoadsProps): Promise<Load[] | undefined>=> {
    let fullLoads: Load[] = []; 
    const fetchUser = await supabase.auth.getUser()
    const userId = fetchUser.data.user?.id;
    if(!userId) return undefined;

    switch (isDriver) {
        case false:
            let { data: cargas, error:ErrorTotalLoads } = await supabase
            .from('cargas')
            .select('*')
            .eq('dador_id', userId)
            .returns<LoadSupabaseUnit[]>(); 
        
        if(ErrorTotalLoads) throw ErrorTotalLoads;
    
        try{
            fullLoads = await Promise.all(cargas?.map(async (carga) => {
                const cargacompleta = await loadsMapper(carga);
                return cargacompleta as Load
            }) || []);
            return fullLoads;
        } catch (error) {
            console.log(error);
            return undefined;
        }
            
        case true:
            let { data: cargasDriver, error:ErrorLoads } = await supabase
            .from('cargas')
            .select('*')
            .returns<LoadSupabaseUnit[]>();
        
        if(ErrorLoads) throw ErrorLoads;
    
        try{
            fullLoads = await Promise.all(cargasDriver?.map(async (carga) => {
                const cargacompleta = await loadsMapper(carga);
                return cargacompleta as Load
            }) || []);
            return fullLoads;
        } catch (error) {
            console.log(error);
            return undefined;
        }
        default:
            break;
    }

};


const loadsMapper = async (carga: LoadSupabaseUnit): Promise<Load | undefined> => {
    try {
        const { data: dador, error: errorDador } = await supabase
        .from('usuarios')
        .select('nombre,telefono')
        .eq('id', carga.dador_id)
        .maybeSingle()
      if (errorDador || !dador) throw new Error('Error obteniendo dador');
      
  
      const { data: formaDePago, error: errorFormaDePago } = await supabase
        .from('formadepago')
        .select('descripcion')
        .eq('id', carga.formadepago_id)
        .maybeSingle();
      if (errorFormaDePago || !formaDePago) throw new Error('Error obteniendo forma de pago');
  
      const { data: presentacion, error: errorPresentacion } = await supabase
        .from('presentacion')
        .select('descripcion')
        .eq('id', carga.presentacion_id)
        .maybeSingle();
      if (errorPresentacion || !presentacion) throw new Error('Error obteniendo presentación');
  
      const { data: material, error: errorMaterial } = await supabase
        .from('material')
        .select('descripcion')
        .eq('id', carga.material_id)
        .maybeSingle();
      if (errorMaterial || !material) throw new Error('Error obteniendo material');
  
      const { data: ubicacionInicial, error: errorUbicacionInicial } = await supabase
        .from('ubicaciones')
        .select('direccion')
        .eq('id', carga.ubicacioninicial_id)
        .maybeSingle();
      if (errorUbicacionInicial || !ubicacionInicial) throw new Error('Error obteniendo ubicación inicial');
  
      const { data: ubicacionFinal, error: errorUbicacionFinal } = await supabase
        .from('ubicaciones')
        .select('direccion')
        .eq('id', carga.ubicacionfinal_id)
        .maybeSingle();
      if (errorUbicacionFinal || !ubicacionFinal) throw new Error('Error obteniendo ubicación final');
  
      return {
        id: carga.id,
        dador: dador.nombre ,
        formadepago: formaDePago.descripcion,
        presentacion: presentacion.descripcion,
        material: material.descripcion,
        ubicacionInicial: ubicacionInicial.direccion,
        ubicacionFinal: ubicacionFinal.direccion,
        peso: carga.peso,
        puntoReferencia: carga.puntoreferencia,
        fechaCarga: carga.fechacarga,
        fechaDescarga: carga.fechadescarga,
        valorViaje: carga.valorviaje,
        telefonoDador: dador.telefono,
        pagoPor: carga.pagopor,
        otroPagoPor: carga.otropagopor,
      } as Load;
    } catch (error) {
      console.error('Error en el mapeo de cargas:', error);
      return undefined;
    }
  };
  