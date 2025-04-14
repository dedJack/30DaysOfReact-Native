import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const ReanimatedTYpes: React.FC = () => {

    //shared value.
  const translate = useSharedValue(0);
  const rotate = useSharedValue(0);
  const scale = useSharedValue(1);

  //creating boxStyle to change styling of the box.
  const boxStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translate.value},
        {rotate: `${rotate.value}deg`},
        {scale: scale.value},
      ],
    };
  });

  //withTiming().
  const handleTimingAnimation = () => {
    console.log(translate.value);
    translate.value = withTiming(120, {
      duration: 1500,
      easing: Easing.out(Easing.exp),
    });
  };

  //withSpring().
  const handleSpringAnimation = () => {
    scale.value = withSpring(1.5, {
      damping: 5,
      stiffness: 37,
    });    
  };

  //withDecay().
  const handleDecayAnimation = () => {
    translate.value = withDecay({
      velocity: 100,
      deceleration: 0.999,
    });
  };

  //withSwquence().
  const handleSequenceAnimation = () => {
    rotate.value = withSequence(
      withTiming(50, {duration: 550}),
      withTiming(-50, {duration: 550,easing:Easing.elastic(1.5)}), //Easing.elastic giving the bounciness effect
      withTiming(0, {duration: 550}),
    )
  };

  //withDecay().
  const handleDelayAnimation = ()=>{
    rotate.value= withDelay(1500,withSpring(180));
  }

//   withRepeat().
  const handleRepeatAnimation = ()=>{
    scale.value= withRepeat(withTiming(1.5,{duration:500}),8,true);
  }

  //Resetting all functions.
  const handleReset = () => {
    translate.value = withTiming(0);
    scale.value = withTiming(1);
    rotate.value = withTiming(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ReanimatedBasic Dem</Text>
      <Animated.View style={[styles.box, boxStyle]}>
        <Animated.Text style={[styles.boxText]}>Drag me!</Animated.Text>
      </Animated.View>
      <View style={styles.btnContainer}>
        <Button title="Timing" onPress={handleTimingAnimation} />
        <Button title="spring" onPress={handleSpringAnimation} />
        <Button title="decay" onPress={handleDecayAnimation} />
        <Button title="sequence" onPress={handleSequenceAnimation} />
        <Button title="repeat" onPress={handleRepeatAnimation}/>
        <Button title="delay" onPress={handleDelayAnimation} />
        <Button title="reset" onPress={handleReset} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    margin: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'lightpink',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginVertical: 10,
  },
  boxText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    margin: 10,
    paddingHorizontal: 10,
    gap: 20,
  },
});
export default ReanimatedTYpes;
