import { UserSupabaseResponse } from "@/common/interfaces/userType";
import { supabase } from "@/lib/supabase";
import { Alert } from "react-native";

export const fetchProfile = async () => {
  const user = await supabase.auth.getUser();
  const { data: profileData, error: profileError } = await supabase
    .from("usuarios")
    .select("*")
    .eq("id", user.data.user!.id)
    .single();

  if (profileError) throw profileError;
  return profileData;
};

export const getUserId = async () => {
  const user = await supabase.auth.getUser();
  return user.data.user!.id;
};

export const updateProfile = async (user: UserSupabaseResponse) => {
  if (!user) return false;
  try {
    const { data, error } = await supabase
      .from("usuarios")
      .update({
        nombre: user!.nombre,
        apellido: user!.apellido,
        telefono: user!.telefono,
        email: user!.email,
        dni: user!.dni,
        rol_id: user!.rol_id,
      })
      .eq("id", user!.id);
    if (error) throw error;
    Alert.alert("Exito", "Perfil editado con exito");
    return true;
  } catch (error: any) {
    Alert.alert("Error", error.message);
  }
};

export const updateSubscription = async (
  userId: string,
  isSuscribed: boolean,
  mp_subscription_id = ""
) => {
  try {
    const { data, error } = await supabase
      .from("usuarios")
      .update({
        isSuscribed: isSuscribed,
        mp_subscription_id: mp_subscription_id,
      })
      .eq("id", userId);
    if (error) throw error;
  } catch (error: any) {
    Alert.alert("Error", error.message);
  }
};

export const checkSubscription = async (userID: string) => {
    const { data: userData, error: UserError } = await supabase
      .from("usuarios")
      .select()
      .eq("id", userID)
      .maybeSingle();
    const ASValue = userData?.isSuscribed;
    console.log(ASValue === null);

    // const subsData = await AsyncStorage.setItem('isSuscribed', JSON.stringify(userData?.isSuscribed)) ?? false
    // dispatch(setSubscritionInfo(subsData))
    if (
      userData?.isSuscribed === true &&
      userData?.mp_subscription_id !== null
    ) {
      return ASValue!;
      dispatch(setSubscritionInfo(ASValue!));
      // const result = await checkPaymentStatus(userData?.mp_subscription_id);
      // if (result.status === "approved" || result.status === "authorized") {
      //   await evaluateASKeys(
      //     "isSuscribed",
      //     JSON.stringify(ASValue),
      //     dispatch(setSubscritionInfo(ASValue!))
      //   );
      // }
    }
    return false;
  };
