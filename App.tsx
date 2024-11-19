// App.tsx
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Alert, StyleSheet } from 'react-native';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import { storeItems, getStoredItems } from './components/storage';
import { FlatList } from 'react-native';


const App = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const loadItems = async () => {
      const storedItems = await getStoredItems();
      setItems(storedItems);
    };
    loadItems();
  }, []);

  useEffect(() => {
    storeItems(items);
  }, [items]);

  const addItem = (newItem: { name: string; }) => {
    if (items.some(item => item.name.toLowerCase() === newItem.name.toLowerCase())) {
      Alert.alert('Erro', 'Este item já existe no estoque.');
      return;
    }
    setItems([...items, newItem]);
    Alert.alert('Sucesso', 'Item adicionado.');
  };

  const updateItem = (updatedItem: { id: any; }) => {
    setItems(prevItems =>
      prevItems.map(item => (item.id === updatedItem.id ? updatedItem : item))
    );
    setEditingItem(null);
    Alert.alert('Sucesso', 'Item atualizado.');
  };

  const deleteItem = (id: any) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
    Alert.alert('Sucesso', 'Item removido.');
  };

  const sellItem = (id: any) => {
    setItems(prevItems =>
      prevItems.map(item => 
        item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const handleSubmit = (item: { id?: any; name?: string; }) => {
    if (editingItem) {
      updateItem(item);
    } else {
      addItem(item);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ItemForm onSubmit={handleSubmit} itemToEdit={editingItem} />
      <ItemList
        items={items}
        onEdit={setEditingItem}
        onDelete={deleteItem}
        onSell={sellItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000',
  },
});

export default App;
