import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const TouchableWithoutFeedbackDemo: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>TouchableWithoutFeedBack demo</Text>
      <TouchableWithoutFeedback onPress={() => setCount(count + 1)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Touchable no use {count}</Text>
        </View>
      </TouchableWithoutFeedback>

      {/* one way to use pressable on background btns */}
      <Pressable
        style={({pressed}) => [
          styles.btn,
          {backgroundColor: pressed ? 'white' : 'lightgrey'},
        ]}>
        <Text style={styles.btnText}>Pressable</Text>
      </Pressable>

      {/* another way to use pressable on texts because pressable doesnt render text itself*/}
      <Pressable style={styles.btn}>
        {({pressed}) => (
          <Text style={[styles.btnText, {color: pressed ? 'red' : 'white'}]}>
            Pressable 2
          </Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  btn: {
    paddingVertical: 15,
    margin: 10,
    minWidth: 40,
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default TouchableWithoutFeedbackDemo;
