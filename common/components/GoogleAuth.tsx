import * as Google from 'expo-auth-session/providers/google';
import { useAuthRequest } from 'expo-auth-session';
import { useEffect } from 'react';
import { Button } from 'react-native';

export const GoogleAuth = () => {
    const [request, response, promptAsync] = Google.useAuthRequest({
      clientId: '629445368241-472pr43tfrjk568muf72rmiccfkb68le.apps.googleusercontent.com',
    });
    
    useEffect(() => {
        if (response?.type === 'success') {
          const { authentication } = response;
          console.log(authentication); // Aquí puedes manejar el token
        }
        }, [response]);
        
        return (
        <Button title="Sign in with Google" onPress={() => promptAsync()} />
        );
}
