export interface MaterialSupabaseResponse {
    id:          string;
    descripcion: string;
}

export const MaterialTypeArray: MaterialType[] = ['Soja', 'Trigo', 'Maiz', 'Fertilizante', 'Maderas', 'Papa', 'Mani', 'Vaca', 'Cerdo', 'Otro'];
export type MaterialType = 'Soja' | 'Trigo' | 'Maiz' | 'Fertilizante' | 'Maderas' | 'Papa' | 'Mani' | 'Vaca' | 'Cerdo' | 'Otro';
export enum MaterialTypeEnum {
    Soja = 'Soja',
    Trigo = 'Trigo',
    Maiz = 'Maiz',
    Fertilizante = 'Fertilizante',
    Maderas = 'Maderas',
    Papa = 'Papa',
    Mani = 'Mani',
    Vaca = 'Vaca',
    Cerdo = 'Cerdo',
    Otro = 'Otro',
};

 export enum MaterialEnum {
    Soja = '4edee3cb-7308-4d1b-96e7-a378052004e7',
    Trigo = '04ba66a5-6a87-4243-b8ed-45baf6cfc2e8',
    Maiz = '6def5e3b-358d-46e5-9170-8e42a2c97d23',
    Fertilizante = '220193b8-bafe-476d-a225-433b567db256',
    Maderas = 'bdb09420-ef80-4de0-a038-03285d48fb92',
    Papa = 'c921caf8-5e2b-4fdb-9190-d7fe624771bf',
    Mani = 'b93fcec6-b173-47d4-be39-52d272bc8a87',
    Vaca = 'b181d3b8-f92c-44fd-9334-c34041ef29df',
    Cerdo = '49ebf50f-d37a-446c-927c-f463fda953e0',
    Otro = '97ca010a-6375-40d6-880e-051ba3818516'
}

