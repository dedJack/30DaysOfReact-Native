import react, {useRef} from 'react';
import {Animated, Button, StyleSheet, Text, View} from 'react-native';

const InterpolationDemo: React.FC = () => {
  const interpolateAnim = useRef(new Animated.Value(0)).current;

  const handleAnimation = () => {
    Animated.timing(interpolateAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false, //setting to false If animating Layout, size, color.
    }).start(() => interpolateAnim.setValue(0));
  };

  const background = interpolateAnim.interpolate({
    inputRange:[0, .25,.5,1],
    outputRange:["blue","red","yellow","darkgreen"]
  })

  const rotate = interpolateAnim.interpolate({
    inputRange:[0, 1],
    outputRange:["0deg", "360deg"]
  })

  const borderRadius = interpolateAnim.interpolate({
    inputRange:[0, 1],
    outputRange:[10,1000]
  })
  const size = interpolateAnim.interpolate({
    inputRange:[0,1],
    outputRange:[200,350]
  })

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Interpolation Demo</Text>
      <Animated.View
        style={[
          styles.box,
          {
            backgroundColor: background,
            transform:[{rotate:rotate}],
            width:size,
            height:size,
            borderRadius:borderRadius
          },
        ]}>
        <Text style={styles.boxText}>Interpolate me!!</Text>
      </Animated.View>
      <Button title="Start Animation" onPress={handleAnimation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
    alignItems: 'center',
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  box: {
    marginHorizontal: 10,
    marginBottom: 50,
    alignItems:"center",
    justifyContent:"center",
    borderRadius: 8,
    height: 200,
    width: 200,
    marginVertical: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  boxText:{
    fontSize:18,
    fontWeight:"bold"
  }
});

export default InterpolationDemo;
