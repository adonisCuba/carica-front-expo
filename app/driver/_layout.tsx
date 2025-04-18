import React from 'react'
import { Slot, Tabs } from 'expo-router'
import CustomHeader from '@/common/components/Header'
import CustomNavBar from '@/common/components/CustomTabBar'

export default function DriverTabs() {

  
  return (
    <>
    {/* Tab Navigator */}
    <Tabs tabBar={(props) => <CustomNavBar {...props} />}>
    <Tabs.Screen
      name="offersScreen"
      options={{
        title: 'Ofertas',
        tabBarLabel: 'Cargas',
      }}
    />
      <Tabs.Screen
        name="createTruck"
        options={{
          tabBarLabel: 'Mis Equipos',
          header: () => <CustomHeader />,
        }}
      />
        <Tabs.Screen
          name="profileScreen"
          options={{
            tabBarLabel: 'Perfil',
            header: () => <CustomHeader />,
          }}
        />
    </Tabs>

  </>
  )
}