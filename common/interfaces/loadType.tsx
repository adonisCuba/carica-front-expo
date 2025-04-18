
//Truck types
export type LoadType = 'Tolva' | 'Camioneta' | 'Furgon' | 'Chasis + Acoplado' | 'Semi' | 'Carreton' | 'Camion Jaula' | 'Otros' | 'Batea';
export const LoadTypeArray: LoadType[] = ['Tolva', 'Camioneta', 'Furgon', 'Chasis + Acoplado', 'Semi', 'Carreton', 'Camion Jaula', 'Otros', 'Batea'];
export enum LoadTypeEnum {
    Tolva = 'Tolva',
    Camioneta = 'Camioneta',
    Furgon = 'Furgon',
    ChasisAcoplado = 'Chasis + Acoplado',
    Otros = 'Otros',
    Carreton = 'Carreton',
    CamionJaula = 'Camion Jaula',
    Semi = 'Semi',
    Batea = 'Batea'
}
export enum EnumTruckTypes {
    Tolva = "5939b8d1-71d7-4e37-851b-db388856945e",
    Camioneta = "8fa614ad-af82-4909-b0ff-b1d288ea97a3",
    Furgon = "9eb2b303-5c92-45ae-8120-4cc40dd3fa49",
    ChasisAcoplado = "a16bdd90-df15-4adf-8cc4-7a74ad375ffd",
    Otros = "e1c0cc7d-27fb-4206-9fe3-280ffc40d742",
    Carreton = "779ba2a1-f4e3-4121-be59-3e1cdd2c6da8",
    CamionJaula = "1933f25d-eb8e-43cf-b2e8-5224ab6a4ef2",
    Semi = 'be085c4d-f6a5-4f36-b869-9ec606bef794',
    Batea = '85bf5951-50a7-4abc-af6e-ea3b9550d97d'
  }
//Unit Types
export type LoadUnit = 'Bolsa' | 'Big Bag' | 'Pallet' | 'Granel' | 'Otros';
export const LoadUnitArray: LoadUnit[] = ['Bolsa', 'Big Bag', 'Pallet', 'Granel', 'Otros'];
export enum LoadUnitEnum {
    Bolsa = 'Bolsa',
    BigBag = 'Big Bag',
    Pallet = 'Pallet',
    Granel = 'Granel',
    Otros = 'Otros',
}

export enum LoadUnitWithIdEnum {
    Bolsa = 'e676ca36-8a96-4338-9a41-2692c18664f5',
    BigBag = 'ca7cf082-837c-4c14-b2ad-c85f0821d86c',
    Pallet = '234a739b-6666-4595-a8df-51e840c09599',
    GranelBulto = '3923f3da-eb7d-4438-8fcd-74d53891c392',
    Otros = '510db5c8-eb5f-4ef1-b23a-96d4e4869f2d'
}
export function getLoadUnitIdFromString(loadUnit: string): string | undefined {
    // Mapeamos cada valor de LoadUnitArray al UID correspondiente en LoadUnitWithIdEnum
    const loadUnitMap: Record<LoadUnit, LoadUnitWithIdEnum> = {
      Bolsa: LoadUnitWithIdEnum.Bolsa,
      'Big Bag': LoadUnitWithIdEnum.BigBag,
      Pallet: LoadUnitWithIdEnum.Pallet,
      Granel: LoadUnitWithIdEnum.GranelBulto,
      Otros: LoadUnitWithIdEnum.Otros,
    };
  
    // Retornamos el UID correspondiente o undefined si no se encuentra
    return loadUnitMap[loadUnit as LoadUnit];
  }

//Transaction Types
export type PaymentMethod = 'Efectivo' | 'Transferencia' | 'Cheque' | 'E-check' | 'Otros';
export const PaymentMethodArray: PaymentMethod[] = ['Efectivo', 'Transferencia', 'Cheque', 'E-check', 'Otros'];
export enum PaymentMethodEnum {
    Efectivo = 'Efectivo',
    Transferencia = 'Transferencia',
    Cheque = 'Cheque',
    Echeck = 'E-check',
    Otros = 'Otros',
}
export enum PaymentMethodWithId {
    Efectivo = 'c96c6cd8-8742-4a8c-9df6-18554a7c87af',
    Transferencia = '7b998228-2121-465b-9721-679a320e50ae', 
    Cheque = '48c0c41f-ed88-4b3a-b06d-9a1f03131fe8', 
    Echeck = '692684a5-9103-4257-a3e3-6486f907177a', 
    Otros = 'e0f74bf6-2886-44da-9469-c68ffaf53e4f',  
}

//Tipado Cargas (respuestas y caso de uso)
export interface LoadSupabaseUnit {
    dador_id:            string;
    fechacarga:          string;
    fechadescarga:       string;
    formadepago_id:      string;
    id?:                  string;
    material_id:         string;
    otropagopor:         null;
    pagopor:             string;
    peso:                string;
    presentacion_id:     string;
    puntoreferencia:     string;
    telefonodador:       string;
    ubicacionfinal_id:    string;
    ubicacioninicial_id: string;
    valorviaje:          string;
    tipo_equipo: string
}
export interface LoadSupabaseResponse{
    data: LoadSupabaseUnit[];
    error?: any;
}

//Load:

export interface Load{
    id: string;
    dador: string;
    material: string;
    peso: string;
    presentacion: string;
    ubicacionInicial: string;
    ubicacionFinal: string;
    fechaCarga: string;
    fechaDescarga: string;
    valorViaje: string;
    pagoPor: string;
    formadepago: string 
    otroPagoPor:  null;
    telefonoDador: string;
    puntoReferencia: string;
    tipoEquipo: string;
}