import AsyncStorage from "@react-native-async-storage/async-storage"

export const evaluateASKeys = async (key:string, value:string, dispatch: any  ) => {

    const ASKey = await AsyncStorage.getItem(key) === null;
    console.log('DESDE ASKEY',ASKey)

    if(ASKey)return;
    await AsyncStorage.setItem(key, value)
    dispatch()
    return;

}