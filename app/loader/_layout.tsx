
import React from 'react'
import {  Tabs } from 'expo-router'
import CustomHeader from '@/common/components/Header'
import CustomNavBar from '@/common/components/CustomTabBar'

export default function AppTabs() {

  return (
    <Tabs  tabBar={(props) => <CustomNavBar {...props}/>}>
      <Tabs.Screen name="offerTrucks" options={{
        header: () => <CustomHeader hasBack={false}/>,
        tabBarLabel: 'Perfil'
      }}/>
      <Tabs.Screen name="loads"  options={{
        tabBarLabel: 'Mis Cargas',
        header:() => <CustomHeader hasBack={false} />
      }} />
        <Tabs.Screen name="carrierProfile" options={{
          header: () => <CustomHeader hasBack={false}/>,
          tabBarLabel: 'Perfil'
          }}/>

    </Tabs>
  )
}