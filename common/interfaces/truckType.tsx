export interface TruckSupabaseResponse {
    id?:               string;
    patente:          string;
    modelo:            string;
    capacidad:            string;
    conductor_nombre: string;
    camionero_id:     string;
    tipoequipo_id:    string;
}

export interface Truck {
    id: string;
    patente: string;
    modelo: string;
    capacidad: string;
    conductor: string;
    camionero: string;
    equipo: string;
}