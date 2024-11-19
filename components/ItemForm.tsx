// components/ItemForm.tsx
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';

const ItemForm = ({ onSubmit, itemToEdit }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [minStock, setMinStock] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [salePrice, setSalePrice] = useState('');

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name);
      setQuantity(itemToEdit.quantity.toString());
      setMinStock(itemToEdit.minStock.toString());
      setPurchasePrice(itemToEdit.purchasePrice.toString());
      setSalePrice(itemToEdit.salePrice.toString());
    }
  }, [itemToEdit]);

  const handleSubmit = () => {
    if (!name || !quantity || !minStock || !purchasePrice || !salePrice) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    onSubmit({
      id: itemToEdit?.id || Math.random().toString(),
      name,
      quantity: parseInt(quantity),
      minStock: parseInt(minStock),
      purchasePrice: parseFloat(purchasePrice),
      salePrice: parseFloat(salePrice),
    });

    clearInputs();
  };

  const clearInputs = () => {
    setName('');
    setQuantity('');
    setMinStock('');
    setPurchasePrice('');
    setSalePrice('');
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Nome do Item"
        placeholderTextColor="white"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        placeholderTextColor="white"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Estoque Mínimo"
        placeholderTextColor="white"
        value={minStock}
        onChangeText={setMinStock}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Preço de Compra"
        placeholderTextColor="white"
        value={purchasePrice}
        onChangeText={setPurchasePrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Preço de Venda"
        placeholderTextColor="white"
        value={salePrice}
        onChangeText={setSalePrice}
        keyboardType="numeric"
      />
      <Button
        title={itemToEdit ? 'Atualizar Item' : 'Adicionar Item'}
        onPress={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginVertical: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
    backgroundColor: 'black', color: 'white',
  },
});

export default ItemForm;
