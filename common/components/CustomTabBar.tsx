import { View, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { APPCOLORS } from "../utils/colors";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import CallToSuscribePanel from "./CallToSuscribePanel";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const PRIMARY_COLOR = APPCOLORS.primary;
const SECONDARY_COLOR = APPCOLORS.secondary;

const CustomNavBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const {isSubscribed} = useSelector((state:RootState) => state.subscribed)

  const [isDriver, setIsDriver] = useState(false)
  useEffect(() => {
    const getUser = async ( ) =>{
      const user = await supabase.auth.getUser()
      console.log(user.data.user?.user_metadata.rol_nombre);
      setIsDriver( user.data.user?.user_metadata.rol_nombre);
    }
   getUser()

  }, [])
  

  return (
    <View style={styles.container}>
     { !isSubscribed && isDriver === 'driver' && <CallToSuscribePanel width={"90%"}/>}
      {state.routes.map((route, index) => {
        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <AnimatedTouchableOpacity
            layout={LinearTransition.springify().mass(0.5)}
            key={route.key}
            onPress={onPress}
            style={[
              styles.tabItem,
              { backgroundColor: isFocused ? SECONDARY_COLOR : "transparent" },
            ]}
          >
            {getIconByRouteName(
              route.name,
              isFocused ? PRIMARY_COLOR : SECONDARY_COLOR
            )}
            {isFocused && (
              <Animated.Text
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(200)}
                style={styles.text}
              >
                {label as string}
              </Animated.Text>
            )}
          </AnimatedTouchableOpacity>
        );
      })}
    </View>
  );

  function getIconByRouteName(routeName: string, color: string) {
    switch (routeName) {
      case "loads":
        return <Ionicons name="home" size={26} color={color} />;
      case "createLoad":
        return <Ionicons name="add-circle" size={26} color={color} />;
      case "carrierProfile":
        return <Ionicons name="person" size={26} color={color} />;
        case "offerScreen":
          return <Ionicons name="home" size={26} color={color} />;
      case "createTruck":
        return <Ionicons name="bus" size={26} color={color} />;
      case "offerTrucks":
        return <Ionicons name="bus" size={26} color={color} />;
      case "profileScreen":
        return <Ionicons name="person" size={26} color={color} />;
      default:
        return <Ionicons name="add-circle" size={26} color={color} />;
    }
  }
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: PRIMARY_COLOR,
    width: "80%",
    alignSelf: "center",
    bottom: 10,
    borderRadius: 40,
    paddingHorizontal: 12,
    paddingVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  tabItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 36,
    paddingHorizontal: 13,
    borderRadius: 30,
  },
  text: {
    color: PRIMARY_COLOR,
    marginLeft: 8,
    fontWeight: "500",
  },
});

export default CustomNavBar;