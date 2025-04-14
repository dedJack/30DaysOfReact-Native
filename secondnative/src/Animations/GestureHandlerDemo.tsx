import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type contextType = {
  startX: number;
  startY: number;
};
const GestureHandlerDemo: React.FC = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const gestureAnimation = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    contextType
  >({
    onStart: (_, context) => {
      context.startX = translateX.value;
      context.startY = translateY.value;
    },

    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
      translateY.value = context.startY + event.translationY;
    },

    onEnd: () => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    },
  });

  const colors = ['red', 'green', 'orange', 'lightblue'];

  const bgColor = useSharedValue(0);
  const scale = useSharedValue(1);

  //for Tap gesture.
  const singleTap = Gesture.Tap().onStart(() => {
    console.log('Single Tap!');
    bgColor.value = Math.ceil((bgColor.value + 1) % colors.length);
  });

  //for longPress
  const longPress = Gesture.LongPress()
    .minDuration(300)
    .onStart(() => {
      console.log('long press!');
      scale.value = withSpring(1.3);
    })
    .onEnd(() => {
      scale.value = withSpring(1);
    });

  const AnimatedStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      bgColor.value,
      [0, 1, 2, 3],
      colors,
    );
    return {
      backgroundColor: backgroundColor,
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
        {scale: scale.value},
      ],
    };
  });

  return (
    <GestureHandlerRootView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.container}>
        <Text style={styles.header}>GestureHandler Demo</Text>
        <PanGestureHandler onGestureEvent={gestureAnimation}>
          <Animated.View>
            <GestureDetector gesture={Gesture.Exclusive(singleTap, longPress)}>
              <Animated.View style={[styles.box, AnimatedStyles]}>
                <Animated.Text style={styles.boxText}>
                  Drag and drop me
                </Animated.Text>
              </Animated.View>
            </GestureDetector>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
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
    width: 200,
    height: 200,
    borderRadius: 10,
    backgroundColor: 'lightpink',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GestureHandlerDemo;
