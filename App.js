import React, { useState } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
} from 'react-native';

const TodoList = () => {
  const [textInputValue, setTextInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const colors = ['#FFA500', '#800080', '#0000FF', '#FFFF00'];

  const handleAddTodo = () => {
    if (textInputValue.length === 0) {
      return;
    }
    setLoading(true);

    setTimeout(() => {
      if (textInputValue.trim() !== '') {
        setTodos([{ text: '• ' + textInputValue }, ...todos]); 
        setTextInputValue('');
        setLoading(false);
      }
    }, 2000);
  };

  const renderItem = ({ item, index }) => {
    const bgColor = colors[index % colors.length];
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedItem(item);
          setModalVisible(true);
        }}>
        <View style={[styles.todoItem, { backgroundColor: bgColor }]}>
          <Text style={{ color: 'white' }}>{item.text}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleRemoveTodo = () => {
    const updatedTodos = todos.filter((todo) => todo !== selectedItem);
    setTodos(updatedTodos);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter a todo"
        value={textInputValue}
        onChangeText={setTextInputValue}
      />
      <Button
        title="Add"
        color="#610C9F"
        style={{ backgroundColor: '#610C9F' }}
        onPress={handleAddTodo}
      />

      {isLoading && (
        <ActivityIndicator
          style={{ marginTop: 10 }}
          size="small"
          color="#0000ff"
        />
      )}
      <FlatList data={todos} renderItem={renderItem} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ textAlign: 'center', color: 'white' }}>
              Are you sure you want to remove "{selectedItem?.text}"?
            </Text>
            <View
              style={{
                alignItems: 'center',
                marginTop: 10,
                flexDirection: 'row',
                gap: 2,
                justifyContent: 'center',
              }}>
              <Button
                title="Remove"
                onPress={handleRemoveTodo}
                color="#D21312"
              />
              <Button
                title="Cancel"
                onPress={() => setModalVisible(false)}
                color="#313131"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  todoItem: {
    padding: 10,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBlockColor: 1,
  },
  modalContent: {
    backgroundColor: 'gray',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
});

export default TodoList;
