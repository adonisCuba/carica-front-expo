import { EnumTruckTypes } from "../interfaces/loadType";

export function getTruckTypeIdFromString(loadType: string): string | undefined {
    const truckTypeMap: Record<string, EnumTruckTypes> = {
      'Tolva': EnumTruckTypes.Tolva,
      'Camioneta': EnumTruckTypes.Camioneta,
      'Furgon': EnumTruckTypes.Furgon,
      'Chasis + Acoplado': EnumTruckTypes.ChasisAcoplado,
      'Semi': EnumTruckTypes.Semi,
      'Carreton': EnumTruckTypes.Carreton,
      'Camion Jaula': EnumTruckTypes.CamionJaula,
      'Otros': EnumTruckTypes.Otros,
      'Batea': EnumTruckTypes.Batea,
    };
  
    return truckTypeMap[loadType];
  }