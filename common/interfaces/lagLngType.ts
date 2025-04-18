

export interface GoogleLatLngResponse {
    results: GoogleLatLng[];
    status:  string;
}

export interface GoogleLatLng {
    address_components: AddressComponent[];
    formatted_address:  string;
    geometry:           Geometry;
    navigation_points:  NavigationPoint[];
    place_id:           string;
    plus_code:          PlusCode;
    types:              string[];
}

export interface AddressComponent {
    long_name:  string;
    short_name: string;
    types:      string[];
}

export interface Geometry {
    location:      LatLng;
    location_type: string;
    viewport:      Viewport;
}

export interface LatLng {
    lat: number;
    lng: number;
}

export interface Viewport {
    northeast: LatLng;
    southwest: LatLng;
}

export interface NavigationPoint {
    location: NavigationPointLocation;
}

export interface NavigationPointLocation {
    latitude:  number;
    longitude: number;
}

export interface PlusCode {
    compound_code: string;
    global_code:   string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toGoogleLatLngResponse(json: string): GoogleLatLngResponse {
        return JSON.parse(json);
    }

    public static googleLatLngResponseToJson(value: GoogleLatLngResponse): string {
        return JSON.stringify(value);
    }
}
