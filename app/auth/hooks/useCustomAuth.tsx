import { supabase } from "@/lib/supabase"
import { useRouter } from "expo-router"
import useAuthSupabase, { SignUpProps } from "@/common/supabase/hooks/auth/auth"
import { UserType } from "../createAccount";
import { useState } from "react";


export default  function useCustomAuth (setFieldValue?: (field: string, value: any) => void) {
    const router = useRouter();
    const {signUpWithEmail, loading, setLoading, signInWithEmail} = useAuthSupabase()
     const [roleSelected, setRoleSelected] = useState<UserType>(UserType.driver);
    const handleChangeRole = (role: UserType) => {
        setRoleSelected(role); 
        setFieldValue && setFieldValue('role', role); 
      };
      

    const handleSignUp = async (values: SignUpProps) => {

        const { email, password, name, dni, telefono, role } = values;
         await signUpWithEmail({ email:email, password: password, name: name, dni: dni, role: role,  telefono: telefono })
      }
      const handleLogin = async (values: { email: string, password: string }) =>{
        try {
          await signInWithEmail(values.email, values.password)
        } catch (error) {
          console.log('desde el handleLogin',error)
        }
      }
    


    return {
        handleSignUp,
        handleLogin,
        loading,
        setLoading,
        roleSelected,
        setRoleSelected,
        handleChangeRole
    }
}
