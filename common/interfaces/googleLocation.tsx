//
export enum GoogleGeocodingStatus {
    OK = "OK",
    ZERO_RESULTS = "ZERO_RESULTS",
    OVER_QUERY_LIMIT = "OVER_QUERY_LIMIT",
    REQUEST_DENIED = "REQUEST_DENIED",
    INVALID_REQUEST = "INVALID_REQUEST",
    UNKNOWN_ERROR = "UNKNOWN_ERROR"
  }
export interface GoogleLocationAddressResponse {
    plus_code: PlusCode;
    results:   GoogleAddress[];
    status:    string;
}

export interface PlusCode {
    compound_code: string;
    global_code:   string;
}

export interface GoogleAddress {
    address_components: AddressComponent[];
    formatted_address:  string;
    geometry:           Geometry;
    navigation_points?: NavigationPoint[];
    place_id:           string;
    plus_code?:         PlusCode;
    types:              string[];
}

export interface AddressComponent {
    long_name:  string;
    short_name: string;
    types:      string[];
}

export interface Geometry {
    location:      NortheastClass;
    location_type: string;
    viewport:      Bounds;
    bounds?:       Bounds;
}

export interface Bounds {
    northeast: NortheastClass;
    southwest: NortheastClass;
}

export interface NortheastClass {
    lat: number;
    lng: number;
}

export interface NavigationPoint {
    location: NavigationPointLocation;
}

export interface NavigationPointLocation {
    latitude:  number;
    longitude: number;
}

// Converts JSON strings to/from your types
export class ConvertGoogleLocationAddressResponse {
    public static toGoogleLocationAddressResponse(json: string): GoogleLocationAddressResponse {
        return JSON.parse(json);
    }

    public static googleLocationAddressResponseToJson(value: GoogleLocationAddressResponse): string {
        return JSON.stringify(value);
    }
}
