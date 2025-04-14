import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const ModelDemo: React.FC = () => {
  const [showModel, setShowModel] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Model Demo</Text>
      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() => setShowModel(!showModel)}>
        <View>
          <Text style={styles.btnText}>Open Model</Text>
        </View>
      </TouchableOpacity>

      <Modal 
      visible={showModel}
      onRequestClose={() => 
        setShowModel(!showModel)}
       animationType='slide'
       transparent={true}
       >
        <View style={styles.modelContainer}>
          <View style={styles.modelView}>
            <Text style={styles.Modeltext}>Model </Text>
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() => setShowModel(!showModel)}>
              <View>
                <Text style={styles.btnText}>close</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  btnContainer: {
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: 'lightgreen',
    minWidth: 300,
    paddingVertical: 10,
    borderRadius: 6,
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modelContainer: {
    flex: 1,
    backgroundColor: 'rgba(33, 30, 30, 0.5)',
    justifyContent: 'center',
  },
  modelView: {
    // flex: 1,
    marginHorizontal: 20,
    paddingTop: 35,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 5,
  },
  Modeltext: {
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default ModelDemo;
