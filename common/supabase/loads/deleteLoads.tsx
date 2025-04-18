import { supabase } from "@/lib/supabase";

export const deleteLoads = async (id: string) => {
    if(!id)return;
    
    const { data, error } = await supabase
      .from('cargas')
      .delete()
      .eq('id', id);
      if(error) throw error;
    if (error) {
      console.error(error);
      throw error;
    }
}