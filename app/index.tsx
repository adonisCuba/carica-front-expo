import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ActivityIndicator, Alert } from "react-native";
import { configureFontScaling } from "@/common/utils/fontScaling";
import { checkSubscription } from "@/common/supabase/users/fetchUser";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setSubscritionInfo } from "@/store/slices/suscribed";

export default function StartRoute() {
  configureFontScaling();
  const [loading, setLoading] = useState<any>(true);
  const [session, setSession] = useState<any>();
  const [role, setRole] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    //AsyncStorage.clear();
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        const userID = data.session?.user?.id ?? "";
        const result = await checkSubscription(userID);
        if (result) {
          dispatch(setSubscritionInfo(result));
        }
        if (error) {
          console.error("Error al obtener la sesión:", error);
          return;
        } else {
          setSession(data.session);
          const role = data.session?.user?.user_metadata?.rol_nombre;
          setRole(role);
        }
        setLoading(false);
      } catch (error) {
        Alert.alert("Error al iniciar la aplicacion");
      }
    };

    // Escuchar cambios en el estado de la sesión
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth event:", session);
        setSession(session);
      }
    );

    checkSession();

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Solo redirigir después de haber resuelto el estado inicial
    console.log("Role:", role);
    if (!loading) {
      switch (role) {
        case "driver":
          router.replace("/driver/offersScreen");
          break;
        case "loader":
          router.replace("/loader/loads");
          break;
        default:
          router.replace("/auth/login");
      }
    }
  }, [loading, role]);

  if (loading) {
    return <ActivityIndicator />;
  }
  return null;
}
