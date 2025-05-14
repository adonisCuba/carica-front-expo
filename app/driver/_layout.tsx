import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import CustomHeader from "@/common/components/Header";
import CustomNavBar from "@/common/components/CustomTabBar";
import { supabase } from "@/lib/supabase";
import { checkSubscription } from "@/common/supabase/users/fetchUser";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setSubscritionInfo } from "@/store/slices/suscribed";

export default function DriverTabs() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const check = async () => {
      const { data, error } = await supabase.auth.getSession();
      const userID = data.session?.user?.id ?? "";
      const result = await checkSubscription(userID);
      if (result) {
        dispatch(setSubscritionInfo(result));
      }
    };
    check();
  }, []);

  return (
    <>
      {/* Tab Navigator */}
      <Tabs tabBar={(props) => <CustomNavBar {...props} />}>
        <Tabs.Screen
          name="offersScreen"
          options={{
            title: "Ofertas",
            tabBarLabel: "Cargas",
          }}
        />
        <Tabs.Screen
          name="createTruck"
          options={{
            tabBarLabel: "Mis Equipos",
            header: () => <CustomHeader />,
          }}
        />
        <Tabs.Screen
          name="profileScreen"
          options={{
            tabBarLabel: "Perfil",
            header: () => <CustomHeader />,
          }}
        />
      </Tabs>
    </>
  );
}
