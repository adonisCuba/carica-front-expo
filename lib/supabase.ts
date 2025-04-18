import { AppState } from 'react-native'
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = 'https://ikiusmdtltakhmmlljsp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlraXVzbWR0bHRha2htbWxsanNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MjkyMzEsImV4cCI6MjA1MDIwNTIzMX0.q6NMMUK2ONGFs-b10XZySVlQiCXSLsjZbtBZyUTiVjc'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey,{
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})