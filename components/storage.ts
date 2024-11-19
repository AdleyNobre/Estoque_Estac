// storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeItems = async (items: never[]) => {
  try {
    const jsonValue = JSON.stringify(items);
    await AsyncStorage.setItem('items', jsonValue);
  } catch (e) {
    console.error('Erro ao salvar itens:', e);
  }
};

export const getStoredItems = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('items');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Erro ao carregar itens:', e);
    return [];
  }
};
