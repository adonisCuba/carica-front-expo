import { LocationGeocodedAddress, LocationGeocodedLocation } from "expo-location";
import * as Location from 'expo-location';
import { Alert } from "react-native";
import { GoogleGeocodingStatus, GoogleLocationAddressResponse, NavigationPointLocation } from "../interfaces/googleLocation";
import { GoogleLatLngResponse, LatLng } from "../interfaces/lagLngType";


export class ServiceLocation {

    public static async getAddressFromExpoGeocoding({latitude, longitude}: Pick<LocationGeocodedLocation, 'latitude' | 'longitude'> ): Promise<LocationGeocodedAddress[] > {
        if(!latitude || !longitude) return [];
        let actualLocation;
        try {
            actualLocation = await Location.reverseGeocodeAsync({latitude,longitude});
            return actualLocation
        } catch (error: any) {
            Alert.alert('Error', error.message)
        }
        
        return[]
    }

    public static async getAddressFromGoogleGeoCoding(
        { latitude, longitude }: Pick<LocationGeocodedLocation, 'latitude' | 'longitude'> 
      ): Promise<GoogleLocationAddressResponse> {
        const key = process.env.EXPO_PUBLIC_GOOGLE_GEOCODING_KEY;
      
        if (!latitude || !longitude) return {} as GoogleLocationAddressResponse;
      
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${key}&language=es`;
      
        try {
          const actualLocation = await fetch(url);
      
          if (actualLocation.status !== 200) {
            return {} as GoogleLocationAddressResponse;
          }
      
          const locationJson: GoogleLocationAddressResponse = await actualLocation.json(); 
          return locationJson as GoogleLocationAddressResponse;
        } catch (error: any) {
          Alert.alert('Error', error.message);
          return {} as GoogleLocationAddressResponse;
        }
      }

      public static getGoogleFormattedAddress = ( address: GoogleLocationAddressResponse ): string => {
        if(address.status !== GoogleGeocodingStatus.OK) return '';
        return address.results[0].formatted_address;
      } 

      public static getGoogleGeocodingLatLng = async ( address: string): Promise<{locationJson: GoogleLatLngResponse, data: LatLng}> => {
        const key = process.env.EXPO_PUBLIC_GOOGLE_GEOCODING_KEY;
        const add = address.trim().toLowerCase();
        const formattedAddress = encodeURIComponent(add.replace(/ /g, '+'));
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${key}&language=es`;
        try {
            const actualLocation = await fetch(url);
        
            if (actualLocation.status !== 200) {
              return {} as any;
            };
        
            const locationJson: GoogleLatLngResponse = await actualLocation.json(); 
            const data: LatLng = locationJson.results[0].geometry.location ;
            return {
                locationJson, 
                data
            }

          } catch (error: any) {
            Alert.alert('Error', error.message);
            return {} as any;
          }


      }
}