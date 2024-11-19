// components/ItemList.tsx
import React, { useState } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet } from 'react-native';

const ItemList = ({ items, onEdit, onDelete, onSell }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Nome: {item.name}</Text>
      <Text style={styles.itemText}>Quantidade: {item.quantity}</Text>
      <Text style={styles.itemText}>Preço de Compra: R${item.purchasePrice.toFixed(2)}</Text>
      <Text style={styles.itemText}>Preço de Venda: R${item.salePrice.toFixed(2)}</Text>
      <Text style={styles.itemText}>Estoque Mínimo: {item.minStock}</Text>
      {item.quantity <= item.minStock && (
        <Text style={styles.warningText}>Necessário Reposição</Text>
      )}
      <Text style={styles.itemText}>
        Potencial de Lucro: R${((item.salePrice - item.purchasePrice) * item.quantity).toFixed(2)}
      </Text>
      <View style={styles.buttonRow}>
        <Button title="Editar" onPress={() => onEdit(item)} />
        <Button title="Remover" onPress={() => onDelete(item.id)} color="red" />
        <Button title="Vender" onPress={() => onSell(item.id)} />
      </View>
    </View>
  );

  return (
    <View>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar item..."
        placeholderTextColor="white"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
    backgroundColor: 'black', color: 'white',
  },
  itemContainer: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#333',
    borderRadius: 4,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#fff',
  },
  warningText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ItemList;
