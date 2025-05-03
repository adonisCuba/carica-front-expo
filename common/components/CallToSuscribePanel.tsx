import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const CallToSuscribePanel = ({ width }: { width: any }) => {
  const _handlePressButtonAsync = async () => {
    router.push({ pathname: "/subscribeModal" });
  };

  return (
    <View
      style={{
        width: width,
        height: 40,
        backgroundColor: "orange",
        position: "absolute",
        bottom: 65,
        justifyContent: "center",
        alignSelf: "center",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      }}
    >
      <TouchableOpacity onPress={_handlePressButtonAsync}>
        <Text
          style={{
            color: "white",
            fontSize: 12,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Suscribete para tener acceso a toda la app
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CallToSuscribePanel;
