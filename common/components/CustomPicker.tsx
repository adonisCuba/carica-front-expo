import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  GestureResponderEvent,
} from 'react-native';
import { APPCOLORS } from '../utils/colors';

interface CustomPickerProps {
  selectedValue: string | null; // Valor seleccionado
  onValueChange: (value: string) => void; // Callback para manejar el cambio
  data: string[] | null; // Opciones del Picker
  placeholder?: string; // Texto inicial o predeterminado
}

const CustomPicker: React.FC<CustomPickerProps> = ({
  selectedValue,
  onValueChange,
  data,
  placeholder = 'Seleccionar',
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string>(selectedValue || placeholder);

  const handleSelect = (item: string) => {
    setSelectedLabel(item);
    onValueChange(item);
    setModalVisible(false);
  };
  return (
    <View>
      {/* Botón para abrir el Picker */}
      <TouchableOpacity disabled={data === null}
        style={{ paddingLeft: 5, width: 250, height: 40, justifyContent: 'center' }}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.pickerText}>{selectedLabel}</Text>
      </TouchableOpacity>

      {/* Modal para mostrar las opciones */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {
              data === null ?
               ( <Text style={[styles.optionText,{textAlign: 'center',justifyContent: 'center', flex:1, alignSelf: 'center'}]}>Selecciona una provincia</Text>)
                :
                (<FlatList
                  data={data}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.optionButton}
                      onPress={() => handleSelect(item)}
                    >
                      <Text style={styles.optionText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />)
            }
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomPicker;

const styles = StyleSheet.create({
  pickerButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerText: {
    fontSize: 16,
    color: APPCOLORS.primary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    height: '70%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  optionButton: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
  },
});
