import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {StackScreenTypeProp} from '../types';


const FlatListDemo: React.FC = () => {
  //Sample Data || Data From Api, if using.
  const Flat_Data = Array.from({length: 40}, (_, index) => ({
    id: `${index + 1}`,
    title: `item ${index + 1}`,
  }));

  const handleRenderitem = ({item}: {item: {id: String; title: String}}) => (
    <View style={styles.container1}>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>FlatList Example</Text>
      <FlatList
        ListHeaderComponent={
          <Text style={styles.FlatListHeader}> FlatList Header</Text>
        }
        ListFooterComponent={
          <Text style={styles.FlatListFooter}> FlatList Footer</Text>
        }
        data={Flat_Data}
        renderItem={handleRenderitem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'darkgrey',
    marginBottom: 5,
    flex: 1,
  },

  header: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  container1: {
    marginBottom: 5,
    borderWidth: 0.5,
    borderRadius: 5,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    paddingVertical: 15,
  },
  FlatListHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  FlatListFooter: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default FlatListDemo;
