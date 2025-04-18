// import * as Location from 'expo-location';

//  export const getLocation = async () =>{
//      const location =  await getActualLocation().then((res) => { 
//         if(res){
//           return{
//             latitude: res.coords.latitude,
//             longitude: res.coords.longitude
//           } as Pick<Location.LocationGeocodedLocation, 'latitude' | 'longitude'>
//         }
//       })
//       return location
//     }

//     const getAddress = async () => {

//       const location = await getLocation();
//       const address = await ServiceLocation.getAddressFromGoogleGeoCoding(location!);
//       console.log(address);
