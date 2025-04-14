import React from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';

const Section_Data = [
  {
    title: 'Jeans',
    data: ['Sketchy jeans', 'denim jeans', 'Plain jeans'],
  },
  {
    title: 'Trousers',
    data: ['Black trousers', 'fitted trousers', 'Sports trousers'],
  },
  {
    title: 'Shorts',
    data: ['Mini', 'Half', 'Long'],
  },
  {
    title: 'Shirts',
    data: ['Half', 'Full', 'Cotton','PartyWear'],
  },
];
const SectionListDemo: React.FC = () => {
  const handleRenderItem = ({item}: {item: String}) => (
    <View>
      <Text>{item}</Text>
    </View>
  );

  //This function and below SectionList Header function both are same. we can use either way.
  const handlerenderSectionHeader = ({
    section: {title},
  }: {
    section: {title: String};
  }) => (
    <View style={styles.menuHeader}>
      <Text style={styles.menuText}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>SectionList Screen</Text>
      <SectionList
        // renderSectionHeader={handlerenderSectionHeader}
        renderSectionHeader={({section: {title}}) => (
          <View style={styles.menuHeader}>
            <Text style={styles.menuText}>{title}</Text>
          </View>
        )}
        keyExtractor={(item,index)=> item + index}
        sections={Section_Data}
        renderItem={handleRenderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  menuHeader: {
    marginVertical: 10,
    
  },
  menuText: {
    fontSize: 25,
    fontWeight:"bold",
    paddingVertical:5
  },
});

export default SectionListDemo;
