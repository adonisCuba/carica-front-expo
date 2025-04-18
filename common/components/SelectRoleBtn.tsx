import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { APPCOLORS } from '../utils/colors'
import { UserType } from '@/app/auth/createAccount'
import { IconProps } from '@expo/vector-icons/build/createIconSet'
interface SelectRoleBtnProps {
    handleRolChange: (role: UserType) => void
    role: UserType;
    title:string;
    size?: number;
    isSelected: boolean

}
const SelectRoleBtn = ({handleRolChange, role, title, isSelected, size=20}: SelectRoleBtnProps) => {
  return (
    <View>
    <TouchableOpacity style={{ marginTop: 30}} activeOpacity={0.7} onPress={() => handleRolChange(role)}>
      <View style={isSelected ? styles.roleButtonActive : styles.roleButtonInactive}>
      <Ionicons name={role === UserType.driver ? 'bus' : 'business'} size={30}  color={isSelected ? APPCOLORS.secondary : APPCOLORS.primary} />
        <Text style={[isSelected ? styles.textRoleButtonActive : styles.textRoleButtonInactive,{fontSize: size}]}> {title} </Text>
      </View>
    </TouchableOpacity>
    </View>
  )
}
export default SelectRoleBtn

const styles = StyleSheet.create({
  roleButtonActive:{
    flexDirection: 'row', 
    backgroundColor: APPCOLORS.primary,
    width: 170,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  textRoleButtonActive:{
    color: APPCOLORS.white, 
    fontSize: 20, 
    fontWeight: '500', 
    textAlign: 'center' 
  },
  roleButtonInactive:{
    flexDirection: 'row', 
    borderWidth: 0.9,
    borderColor: 'gray',
    backgroundColor: APPCOLORS.tertiary,
    width: 170,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  textRoleButtonInactive:{
    color: APPCOLORS.primary, 
    fontSize: 20, 
    fontWeight: '500', 
    textAlign: 'center' 
  },
})

