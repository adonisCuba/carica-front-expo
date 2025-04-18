import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { clearLocation, setLocation } from "@/store/slices/locations";

export const useDeviceLocation = () => {
    const { location } = useSelector((state: RootState) => state.location)
    const dispatch = useDispatch<AppDispatch>()
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const getLocationPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      const message = "Sin la ubicación, no podrás acceder a las ofertas";
      setErrorMsg(message);
      Alert.alert(message);
      return false; 
    }

    return true; 
  };

  const getActualLocation = async () => {
    try {
      const hasPermission = await getLocationPermissions();

      if (!hasPermission) return;

      const currentLocation = await Location.getCurrentPositionAsync({});
      dispatch(setLocation(currentLocation));
      // Devuelve la ubicación
    } catch (error) {
      console.error("Error al obtener la ubicación:", error);
      setErrorMsg("Error al obtener la ubicación");
      dispatch(clearLocation());

    }
  };

  // Solicitar permisos al montar el componente
  useEffect(() => {
    getLocationPermissions();
  }, []);

  return {
    location, 
    errorMsg, 
    getActualLocation,
  };
};
