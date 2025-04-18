import { Load } from "@/common/interfaces/loadType";
import { supabase } from "@/lib/supabase";
import { loadsMapper } from "./fetchLoads";
export interface LoadByRadiusInterface{
    lat: number,
    lng: number,
    radius: number
}
export const getLoadsByRadius = async (
    {lat,lng,radius} : LoadByRadiusInterface
  ): Promise<Load[] | []> => {
    try {
    //   const { data, error } = await supabase.rpc('get_loads_by_radius', {
    //     lat_input : -32.9476327,
    //     lng_input : -60.6309132,
    //     radius_km :50
    //   }).select('*');
  
    //   console.log('Desde GLBR: ', data);
    //   console.log('Desde GLBR ERROR: ', error);
    //   if (error) {
    //     console.error('Error executing function:', error.message);
    //     return null;
    //   }
    //   return data as any;
    const getLoads = await fetch('https://ikiusmdtltakhmmlljsp.supabase.co/rest/v1/rpc/get_loads_by_radius',{
        headers: {
        "Content-Type": "application/json",
         "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlraXVzbWR0bHRha2htbWxsanNwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDYyOTIzMSwiZXhwIjoyMDUwMjA1MjMxfQ.p_kUAS2mgxQH-AllJd24Qh87Vg2GpVk_2pkCcAGEa1U",
         "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlraXVzbWR0bHRha2htbWxsanNwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDYyOTIzMSwiZXhwIjoyMDUwMjA1MjMxfQ.p_kUAS2mgxQH-AllJd24Qh87Vg2GpVk_2pkCcAGEa1U`
         
        },
        body: JSON.stringify({
            lat_input :  lat,
            lng_input : lng,
            radius_km : radius
        }),
        method: 'POST'
    });
    const data = await getLoads.json();
    const cargasID = data.map((item: any) => item.carga_id);
    const {data: allLoads, error:allError} = await supabase.from('cargas').select('*').in('id', cargasID);
    if(allError) console.log(allError);
    const finalData = await Promise.all(allLoads?.map(async (carga) => {
        const cargacompleta = await loadsMapper(carga) || [];
        return cargacompleta as Load
    }) || []);
    console.log('Desde Final Data',finalData)
      return finalData;
    } catch (err) {
      console.error('Unexpected error:', err);
      return [];
    }
  };