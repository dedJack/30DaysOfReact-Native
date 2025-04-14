import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type ItemType = {
  id: string;
  title: string;
};

//child component
const DraggableComponent = ({
  item,
  onDelete,
}: {
  item: ItemType;
  onDelete: (id: string) => void;
}) => {
  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);

  //Gesture that perform animations.
  const panGesture = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
    })
    .onUpdate(e => {
      translateX.value = startX.value + e.translationX;
    })
    .onEnd(() => {
      if (translateX.value < -60) {
        translateX.value = withSpring(-120);
      } else {
        translateX.value = withSpring(0);
      }
    });

  //changing the style as per animations.
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  return (
    <GestureDetector gesture={Gesture.Simultaneous(panGesture)}>
      <Animated.View style={[styles.box, animatedStyles]}>
        <Text style={styles.boxText}>{item.title}, slide to delete --{">"}</Text>
        <View>
          <TouchableOpacity
            style={styles.dltBtn}
            onPress={() => onDelete(item.id)}>
            <Text style={styles.boxText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

//parent component.
const GesturePlayGround: React.FC = () => {
  const [list, setList] = useState<ItemType[]>(
    Array.from({length: 6}, (_, index) => ({
      id: (index + 1).toString(),
      title: `item ${index + 1}`,
    })),
  );

  //deleting the element from list
  const handleDelete = (id: string) => {
    setList(prev => prev.filter(item => item.id !== id));
  };
  return (
    <GestureHandlerRootView style={styles.container}>
      <View>
        <Text style={styles.header}>Gesture PlayGRound</Text>
      </View>
      <View>
        <FlatList
          data={list}
          renderItem={({item}) => (
            <DraggableComponent item={item} onDelete={handleDelete} />
          )}
        />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  box: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#b58df1',
    borderRadius: 10,
    marginBottom: 30,
    justifyContent: 'space-between',
  },
  boxText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  dltBtn: {
    left: 120,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});

export default GesturePlayGround;
