import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { APPCOLORS } from "../utils/colors";
import { useRouter } from "expo-router";
import { Load } from "../interfaces/loadType";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { deleteLoad } from "@/store/slices/loads";
import Ionicons from "@expo/vector-icons/Ionicons";

interface OfferCardProps {
  load: Load;
}
const OfferCard = ({ load }: OfferCardProps) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <View style={styles.offerCard}>
      <View style={{ paddingLeft: 10 }}>
        <Text>
          Lugar Carga:{" "}
          <Text style={{ color: APPCOLORS.cuaternary }}>
            {load.ubicacionInicial}
          </Text>
        </Text>
        <Text>
          Lugar Descarga:{" "}
          <Text style={{ color: APPCOLORS.cuaternary }}>
            {load.ubicacionFinal}
          </Text>
        </Text>
        <Text>
          Presentación:{" "}
          <Text style={{ color: APPCOLORS.cuaternary }}>
            {load.presentacion}
          </Text>
        </Text>
        {load.valorViaje.length > 1 && (
          <Text>
            Valor:{" "}
            <Text style={{ color: APPCOLORS.cuaternary }}>
              $ {load.valorViaje}
            </Text>{" "}
          </Text>
        )}
        <Text>
          Fecha Entrega:{" "}
          <Text style={{ color: APPCOLORS.cuaternary }}>{load.fechaCarga}</Text>{" "}
        </Text>
      </View>
      <View></View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
          onPress={() => router.push({ pathname: `/createLoad`, params: { ...load } as any })}
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: APPCOLORS.secondary,
            height: 40,
            borderRadius: 12,
            flexDirection: "row",
            paddingHorizontal: 10,
            gap: 2,
          }}
        >
          <Ionicons name="pencil" size={20} color={APPCOLORS.textGray} />
          <Text
            style={{
              color: APPCOLORS.textGray,
              fontWeight: "500",
              fontSize: 18,
            }}
          >
            Editar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(deleteLoad(load))}
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#b51a25",
            height: 40,
            borderRadius: 12,
            flexDirection: "row",
            gap: 2,
            paddingHorizontal: 10,
          }}
        >
          <Ionicons name="trash" size={20} color={"white"} />
          <Text
            style={{
              color: "white",
              fontWeight: "500",
              fontSize: 18,
            }}
          >
            Borrar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OfferCard;

const styles = StyleSheet.create({
  screenTitleContainer: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  screenTitle: {
    fontSize: 20,
    color: APPCOLORS.textBlue,
    fontWeight: "bold",
  },
  screenSubtitle: {
    fontSize: 14,
    color: APPCOLORS.textGray,
    fontWeight: "600",
  },
  filterBtn: {
    width: 90,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: APPCOLORS.primary,
    borderRadius: 12,
    alignContent: "center",
    marginTop: 10,
    marginLeft: 20,
    alignSelf: "flex-end",
  },
  filterBtnTitle: {
    fontSize: 14,
    color: APPCOLORS.textWhite,
    fontWeight: "500",
  },
  offerCard: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: APPCOLORS.darkGray,
    borderRadius: 12,
    padding: 10,
    width: "90%",
    height: 190,
    marginTop: 5,
    backgroundColor: "white",
  },
});
