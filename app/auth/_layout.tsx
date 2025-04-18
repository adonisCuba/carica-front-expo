import React from 'react'
import { Stack, useRouter } from 'expo-router'
import CustomHeader from '@/common/components/Header'

export default function AuthLayout() {
  const router = useRouter()
  return (
    <Stack  >
        <Stack.Screen name='login' options={{
      
      header: () => <CustomHeader hasBack={false}/>,
    }}/>
        <Stack.Screen name='createAccount' options={{
      
    }} />
    </Stack>
  )
}