export interface MaterialSupabaseResponse {
  id: string;
  descripcion: string;
}

export const MaterialTypeArray: MaterialType[] = [
  "Soja",
  "Trigo",
  "Maiz",
  "Fertilizante",
  "Girasol",
  "Otros cultivos",
  "Agroquímicos",
  "Ganado",
  "Materiales construcción",
  "Alimentos y bebidas",
  "Refrigerados",
  "Maquinarias",
  "Otras cargas generales",
];
export type MaterialType =
  | "Soja"
  | "Trigo"
  | "Maiz"
  | "Fertilizante"
  | "Girasol"
  | "Otros cultivos"
  | "Agroquímicos"
  | "Ganado"
  | "Materiales construcción"
  | "Alimentos y bebidas"
  | "Refrigerados"
  | "Maquinarias"
  | "Otras cargas generales";
export enum MaterialTypeEnum {
  Soja = "Soja",
  Trigo = "Trigo",
  Maiz = "Maiz",
  Fertilizante = "Fertilizante",
  Girasol = "Girasol",
  "Otros cultivos" = "Otros cultivos",
  Agroquímicos = "Agroquímicos",
  Ganado = "Ganado",
  "Materiales construcción" = "Materiales construcción",
  "Alimentos y bebidas" = "Alimentos y bebidas",
  Refrigerados = "Refrigerados",
  Maquinarias = "Maquinarias",
  "Otras cargas generales" = "Otras cargas generales",
}

export enum MaterialEnum {
  Soja = "4edee3cb-7308-4d1b-96e7-a378052004e7",
  Trigo = "04ba66a5-6a87-4243-b8ed-45baf6cfc2e8",
  Maiz = "6def5e3b-358d-46e5-9170-8e42a2c97d23",
  Fertilizante = "220193b8-bafe-476d-a225-433b567db256",
  Girasol = "bdb09420-ef80-4de0-a038-03285d48fb92",
  "Otros cultivos" = "c921caf8-5e2b-4fdb-9190-d7fe624771bf",
  Agroquímicos = "b93fcec6-b173-47d4-be39-52d272bc8a87",
  Ganado = "b181d3b8-f92c-44fd-9334-c34041ef29df",
  "Materiales construcción" = "49ebf50f-d37a-446c-927c-f463fda953e0",
  "Alimentos y bebidas" = "97ca010a-6375-40d6-880e-051ba3818516",
  Refrigerados = "176bf83f-3109-431d-8a35-1d157ae4d91f",
  Maquinarias = "4e9efe3d-8eb6-4600-96dd-eb35cbad8699",
  "Otras cargas generales" = "8cd407f6-297e-4730-a1d6-15a2ac485809",
}
