export interface LocationResponse {
    coords:    Coords;
    timestamp: number;
}

export interface Coords {
    accuracy:         number;
    altitude:         number;
    altitudeAccuracy: number;
    heading:          number;
    latitude:         number;
    longitude:        number;
    speed:            number;
}

export class ConvertLocation {
    public static toLocationResponse(json: string): LocationResponse {
        return JSON.parse(json);
    }

    public static locationResponseToJson(value: LocationResponse): string {
        return JSON.stringify(value);
    }
}
