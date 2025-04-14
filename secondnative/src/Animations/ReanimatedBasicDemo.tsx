import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View} from 'react-native';
import Animated, {
    cancelAnimation,
    Easing,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const ReanimatedBasicDemo: React.FC = () => {
  const translate = useSharedValue(0);
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0)


  //this is the example of useDerivedValue.
//   const opacity = useDerivedValue(() => {
//     return Math.min(1, Math.max(0, 2 - scale.value)); 
//   });


  
  
  const boxStyle = useAnimatedStyle(() => {
      return {
        opacity:opacity.value,
          transform: [
              {
                  translateX: translate.value,
                },
                {
                    rotate: `${rotation.value}deg`,
                },
                {
                    scale: scale.value,
                },
            ],
        };
    });
    
    const textStyle = useAnimatedStyle(() => {
        return {
            transform: [{scale: 1 / scale.value}],
        };
    });
    
    const handleStartAnimation = () => {
    //   console.log(opacity)
    translate.value = withSpring(Math.random()*200-100);
    rotation.value = withRepeat(withTiming(360, {duration: 1000, easing:Easing.linear}), -1, false);

    scale.value = withRepeat(withTiming(1.5,{duration:1500}),-1, true);
    opacity.value = withRepeat(withTiming(1,{
        duration:1200,
     }),-1,true);
  };

  const handleStopAnimation = () => {
    cancelAnimation(translate);
    cancelAnimation(scale);
    cancelAnimation(rotation);
  };

  const AnimatedRef = useAnimatedRef<Animated.View>();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>ReanimatedBasic Demo</Text>
      <Animated.View style={[styles.box, boxStyle]} ref={AnimatedRef}>
        <Animated.Text style={[{fontSize: 18}, textStyle]}>
          Drag me!
        </Animated.Text>
      </Animated.View>

      <View style={styles.btnContainer}>
        <Pressable style={styles.btn} onPress={handleStartAnimation}>
          <Text style={styles.btnText}> Start</Text>
        </Pressable>
        <Pressable
          style={[styles.btn, {backgroundColor: 'red'}]}
          onPress={handleStopAnimation}>
          <Text style={styles.btnText}> Stop</Text>
        </Pressable>
      </View>
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
    width: 150,
    height: 150,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  btn: {
    width: '50%',
    marginHorizontal: 10,
    backgroundColor: 'green',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
export default ReanimatedBasicDemo;
