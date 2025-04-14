import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { StackScreenTypeProp} from '../types';
import {StackNavigationProp} from '@react-navigation/stack';

const topic = [
  {
    id: 1,
    name: 'FadeDemo',
    screen: 'FadeDemoScreen',
  },
  {
    id: 2,
    name: 'InterpolationDemo',
    screen: 'InterpolateScreen',
  },
  {
    id: 3,
    name: 'CombineAnimation',
    screen: 'CombineAnimationScreen',
  },
  {
    id: 4,
    name: 'GestureAnimation',
    screen: 'GestureAnimationScreen',
  },
  {
    id: 5,
    name: 'Reanimated Basics',
    screen: 'BasicReanimatedScreen',
  },
  {
    id: 6,
    name: 'Reanimated Types',
    screen: 'ReanimatedTypeScreen',
  },
  {
    id: 7,
    name: 'Gesture Handler',
    screen: 'GestureHandlerScreen',
  },
  {
    id: 8,
    name: 'Gesture PlayGround',
    screen: 'GesturePlayGroundScreen',
  },
  {
    id: 9,
    name: 'Reanimation FormValidation Screen',
    screen: 'ReanimationFormValidationScreen',
  },
];

//Animation screen prop to navigate
type AnimationScreenNavigationProp = StackNavigationProp<
  StackScreenTypeProp,
  'AnimationScreen'
>;

//to navigate on other screens we use navigation in props.
type props = {
  navigation: AnimationScreenNavigationProp;
};

//main function.
const AnimationDemo: React.FC<props> = ({navigation}) => {
  //handle renderItem
  const handleRenderItem = ({
    item,
  }: {
    item: {id: number; name: string; screen: string};
  }) => (
    <TouchableOpacity
      style={styles.listContainer}
      onPress={() =>
        navigation.navigate(item.screen as keyof StackScreenTypeProp)
      }>
      <Text style={styles.listText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Animation Screen</Text>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={topic}
        renderItem={handleRenderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  header: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
  listContainer: {
    margin: 10,
    paddingHorizontal: 15,
    backgroundColor: 'lightgrey',
    paddingVertical: 15,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  listText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default AnimationDemo;
