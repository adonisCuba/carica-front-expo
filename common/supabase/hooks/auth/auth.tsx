import { UserType } from "@/app/auth/createAccount";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import * as Router from 'expo-router';
import { useState } from "react";
import { Alert } from "react-native";

export interface SignUpProps {
    email: string,
    password: string,
    name: string,
    role: UserType,
    dni: string,
    telefono: string

}

export default function useAuthSupabase (){
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // const signUpWithEmail = async ({ email, password, name, role, dni, telefono }: SignUpProps) => {
    //     setLoading(true);
    
    //     // Verificar si el correo o el DNI ya existen
    //     const { data: existingUser, error: checkError } = await supabase
    //         .from('usuarios')
    //         .select('*')
    //         .or(`email.eq.${email},dni.eq.${dni}`)
    //         .single(); // Devuelve un solo resultado si coincide
    
    //     if (checkError) {
    //         console.log('Error al verificar usuario existente:', checkError);
    //         Alert.alert('Error', 'Ocurrió un error al verificar el usuario.');
    //         setLoading(false);
    //         return;
    //     }
    
    //     if (existingUser) {
    //         Alert.alert('Error', 'El correo o DNI ya están registrados en el sistema.');
    //         setLoading(false);
    //         return;
    //     }
    
    //     // Obtener el rol
    //     const { data: roleData, error: roleError } = await supabase
    //         .from('roles')
    //         .select('id')
    //         .eq('nombre', role)
    //         .single();
    
    //     if (roleError) {
    //         console.log('Error al obtener rol:', roleError);
    //         setLoading(false);
    //         return;
    //     }
    
    //     if (!roleData?.id) {
    //         console.log('Error: No se encontró un rol válido para el nombre proporcionado.');
    //         setLoading(false);
    //         return;
    //     }
    
    //     // Insertar en la tabla 'usuarios'
    //     const { error: insertError } = await supabase.from('usuarios').insert({
    //         email: email,
    //         nombre: name,
    //         apellido: name,
    //         dni: dni,
    //         telefono: telefono,
    //         rol_id: roleData.id,
    //     });
    
    //     if (insertError) {
    //         console.log('Error al insertar en usuarios:', insertError);
    //         setLoading(false);
    //         return;
    //     }
    
    //     // Registrar usuario en Supabase Auth
    //     const { data: { session }, error } = await supabase.auth.signUp({
    //         email: email,
    //         password: password,
    //         options: {
    //             data: {
    //                 nombre: name,
    //                 apellido: name,
    //                 dni: dni,
    //                 telefono: telefono,
    //                 rol_nombre: role,
    //             },
    //         },
    //     });
    
    //     if (error) {
    //         Alert.alert('Error al registrar el usuario:', error.toString());
    //         setLoading(false);
    //         return;
    //     }
    
    //     const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    //     if (userError) {
    //         Alert.alert('Error al obtener datos del usuario:', userError.toString());
    //         setLoading(false);
    //         return;
    //     }
    
    //     // Redirigir según el rol
    //     switch (user?.user_metadata?.rol_nombre) {
    //         case 'driver':
    //             setTimeout(() => {
    //                 setLoading(false);
    //                 router.push('/driver/offersScreen');
    //             }, 1000);
    //             break;
    //         case 'loader':
    //             setTimeout(() => {
    //                 setLoading(false);
    //                 router.push('/loader/loads');
    //             }, 1000);
    //             break;
    //         default:
    //             setLoading(false);
    //             break;
    //     }
    // };
    
    const signUpWithEmail = async ({ email, password, name, role, dni, telefono }: SignUpProps) => {
        setLoading(true);
    
        try {
            // Verificar si el correo o el DNI ya existen
            const { data: existingUser, error: checkError } = await supabase
                .from('usuarios')
                .select('*')
                .or(`email.eq.${email},dni.eq.${dni}`)
                .maybeSingle();
            
            if (checkError) {
                console.log('Error al verificar usuario existente:', checkError);
                Alert.alert('Error', 'Ocurrió un error al verificar el usuario.');
                return;
            }
            
            if (existingUser) {
                Alert.alert('Error', 'El correo o DNI ya están registrados en el sistema.');
                return;
            }
    
            // Obtener el rol
            const { data: roleData, error: roleError } = await supabase
                .from('roles')
                .select('id')
                .eq('nombre', role)
                .single();
            
            if (roleError || !roleData?.id) {
                console.log('Error al obtener rol:', roleError);
                Alert.alert('Error', 'Rol no válido.');
                return;
            }
    
            // Registrar usuario en Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        nombre: name,
                        apellido: name,
                        dni: dni,
                        telefono: telefono,
                        rol_nombre: role,
                    },
                },
            });
    
            if (authError || !authData?.user) {
                Alert.alert('Error al registrar el usuario:', authError?.message || 'Error desconocido');
                return;
            }
    
            const authUserId = authData.user.id;
    
            // Insertar en la tabla 'usuarios' con el ID del Auth
            const { error: insertError } = await supabase.from('usuarios').insert({
                id: authUserId, // Usar el ID del usuario creado en Auth
                email: email,
                nombre: name,
                apellido: name,
                dni: dni,
                telefono: telefono,
                rol_id: roleData.id,
            });
    
            if (insertError) {
                console.log('Error al insertar en usuarios:', insertError);
    
                // Eliminar el usuario de Auth si la inserción falla
                await supabase.auth.admin.deleteUser(authUserId);
    
                Alert.alert('Error', 'No se pudo completar el registro.');
                return;
            }
    
            // Redirigir según el rol
            const { user_metadata } = authData.user;
    
            switch (user_metadata?.rol_nombre) {
                case 'driver':
                    setTimeout(() => {
                        setLoading(false);
                        router.push('/driver/offersScreen');
                    }, 1000);
                    break;
                case 'loader':
                    setTimeout(() => {
                        setLoading(false);
                        router.push('/loader/loads');
                    }, 1000);
                    break;
                default:
                    setLoading(false);
                    break;
            }
        } catch (error) {
            console.log('Error en el proceso de registro:', error);
            Alert.alert('Error', 'Ocurrió un error inesperado. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };
    

    const signInWithEmail = async (email: string, password: string) => {
            setLoading(true);
            const { data: session, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            if (error) {
                console.log(error);
                const includeLoginMsj = error.message.includes('Invalid login');
                if (includeLoginMsj) {
                    Alert.alert('Correo o contraseña incorrectos');
                    setLoading(false)
                    return;
                }
                Alert.alert('Oops, algo sucedió. Inténtalo de nuevo');
                setLoading(false)
                return;
            }

            switch (session.user.user_metadata.rol_nombre) {
                case 'driver':
                    setTimeout(() => {
                        setLoading(false);
                        router.push('/driver/offersScreen');
                    }, 1000);
                    break;
                case 'loader':
                    setTimeout(() => {
                        setLoading(false);
                        router.push('/loader/loads');
                    }, 1000);
                    break;
                default:
                    break;
            }

    }
    return{
        signUpWithEmail,
        signInWithEmail, 
        loading,
        setLoading
    }
}
