import React, {useRef} from 'react';
import {Animated, PanResponder, StyleSheet, Text, View} from 'react-native';

const Gestureanimationdemo: React.FC = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({

//  👇 Start responder on tap
    onStartShouldSetPanResponder: () => true,

// ✋ Movement
    onPanResponderMove: Animated.event([
      null,
      {
        dx: pan.x, // x,y are Animated.Value
        dy: pan.y,
      }],
      {useNativeDriver:false}
    ),

//  🛑 Finger lifted
    onPanResponderRelease: () => {
// Snap back to center
      Animated.spring(pan, {
        toValue: {x: 0, y: 0},
        useNativeDriver: false,
      }).start();
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gestureanimation demo</Text>
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.box, pan.getLayout()]}>
        <Text style={styles.boxText}>Drag me</Text>
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  box: {
    marginHorizontal: 10,
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: 120,
    width: 120,
    marginVertical: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 5,
    backgroundColor: '#0000ff',
  },
  boxText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Gestureanimationdemo;

