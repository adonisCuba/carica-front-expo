import { GetPlacesResponse, GooglePlacesResponse } from "../interfaces/googlePlaces";

export const getPlaces = async (place:string): Promise<GetPlacesResponse[]> => {
    const APIKEY = "AIzaSyASe9Id-6Dr6lxr5mCb7O3l2HlmNrY-mRU";
    const URL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${place}&types=(cities)&components=country:AR&locationbias=rectangle:-55.053,-73.560|-21.781,-53.637&key=${APIKEY}`
    try {
         const response = await fetch(URL, { 
         method: 'POST', 
         headers:{
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': APIKEY,
            'X-Goog-FieldMask':'places.description,places.place_id' 
         } 
        })
        //  const response = await fetch(URL, { method: 'POST' })

        const data = await response.json() as GooglePlacesResponse;
        if(!data.predictions) return [];
         const finalData: GetPlacesResponse[]  = data.predictions.map(place => {
            return {
                first: place.structured_formatting.main_text || '',
                secondary: place.structured_formatting.secondary_text || '',
                fullAddress: place.description || ''
            }
        });
        return finalData 
    
    } catch (error) {
        // console.log('Catch getplaces',error);
        return[];
    }

}
