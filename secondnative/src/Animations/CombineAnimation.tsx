import React, { useRef } from 'react';
import {Animated, Button, StyleSheet, Text, View} from 'react-native';

const CombineAnimation: React.FC = () => {

    const combineAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    const handleAnimation = ()=>{
        combineAnim.setValue(0);
        Animated.sequence([
            Animated.timing(combineAnim,{
                toValue:1,
                duration:1000,
                useNativeDriver:false
            }),
        ])
        .start();
    }

    const pulseAnimation = () => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseAnim, {
              toValue: 1.3,
              duration: 1200,
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration: 1200,
              useNativeDriver: true,
            }),
          ])
        ).start();
    }


    const translateY = combineAnim.interpolate({
        inputRange:[0,1],
        outputRange:[0,50]
    })
    const translateX = combineAnim.interpolate({
        inputRange:[0,1],
        outputRange:[0,50]
    })
    const rotate = combineAnim.interpolate({
        inputRange:[0,0.5,1],
        outputRange:["0deg","0deg","360deg"]
    })
    const background = combineAnim.interpolate({
        inputRange:[0,0.5,1],
        outputRange:["red","blue","green"]
    })
    const borderRadius = combineAnim.interpolate({
        inputRange:[0,0.5,1],
        outputRange:[4,20,100]
    })
    
    



  return (
    <View style={styles.container}>
      <Text style={styles.header}>CombineAnimation demo</Text>
      <Animated.View style={[styles.box,{
        transform:[{translateY:translateY},
            {translateX:translateX},
            {rotate:rotate},
            {scale:pulseAnim}
        ],
        backgroundColor:background,
        borderRadius:borderRadius,

      }]}>
        <Text style={styles.boxText}>I am Box</Text>
      </Animated.View>
      <View style={styles.btnContainer}>
      <Button title="start" onPress={handleAnimation} />
      <Button title="pulse" onPress={pulseAnimation} />
      </View>
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
    height: 100,
    width: 100,
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
  },
  btnContainer:{
    flexDirection:"row",
    gap:20
  }
});

export default CombineAnimation;
