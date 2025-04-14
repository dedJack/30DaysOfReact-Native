import React, {isValidElement, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  TextInput,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const ReanimationFormValidation: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailChecker, setEmailChecker] = useState('');
  const [password, setPassword] = useState('');
  const [passwordChecker, setPasswordChecker] = useState('');

  //declare shared value.
  const emailShake = useSharedValue(0);
  const passShake = useSharedValue(0);

  //declare animation Style.
  const animationStyle = useAnimatedStyle(() => ({
    transform: [{translateX: emailShake.value}],
  }));

  const animationStyle2 = useAnimatedStyle(() => ({
    transform: [{translateX: passShake.value}],
  }));

  const validateEmail = (text: string) => {
    const validEmailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (!text) {
      setEmailChecker('email required!!');
      return false;
    } else if (!validEmailRegex.test(text)) {
      setEmailChecker('Invalid email!!');
      return false;
    } else {
      setEmailChecker('');
      return true;
    }
  };

  const validatePass = (text: string) => {
    if (!text) {
      setPasswordChecker('password necessary!');
      return false;
    } else if (password.length < 8) {
      setPasswordChecker('password must contain 8 characters');
      return false;
    }
    setPasswordChecker('');
    return true;
  };
  const handleEmail = (text: string) => {
    setEmail(text);
    //validate Email
    const isValidEmail = validateEmail(text);
  };

  const handlePassword = (text: string) => {
    setPassword(text);
    //validate password
    const validPass = validatePass(text);
  };

  const onSubmit = (email: string, pass: string) => {};
  const handleSubmit = () => {
    const validEmail = validateEmail(email);
    const validPass = validatePass(password);

    console.log(validEmail);
    console.log(validPass);
    if (!validEmail) {
      emailShake.value = withSequence(
        withSpring(-8, {duration: 50}),
        withSpring(8, {duration: 50}),
        withSpring(0, {duration: 50}),
      );
    } else {
      emailShake.value = withSpring(0);
    }
    if (!validPass) {
      passShake.value = withSequence(
        withSpring(-8, {duration: 50}),
        withSpring(8, {duration: 50}),
        withSpring(0, {duration: 50}),
      );
    } else {
      passShake.value = withSpring(0);
    }

    if (validEmail && validPass) {
      onSubmit(email, password);
    } else {
    }
  };
  return (
    <GestureHandlerRootView style={styles.container}>
      <View>
        <Text style={styles.header}>Reanimation FormValidation Demo</Text>
        <Animated.View style={[styles.inputContainer, animationStyle]}>
          <TextInput
            style={styles.input}
            onChangeText={handleEmail}
            value={email}
            placeholder="Email@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </Animated.View>
        <Animated.View style={styles.errorMark}>
          <Text style={styles.errorMarkText}>{emailChecker}</Text>
        </Animated.View>
        <Animated.View style={[styles.inputContainer, animationStyle2]}>
          <TextInput
            style={styles.input}
            onChangeText={handlePassword}
            value={password}
            placeholder="password"
            secureTextEntry
            autoCapitalize="none"
          />
        </Animated.View>
        <Animated.View style={styles.errorMark}>
          <Text style={styles.errorMarkText}>{passwordChecker}</Text>
        </Animated.View>
        <Pressable
          onPress={handleSubmit}
          style={({pressed}) => [
            styles.btnContainer,
            {backgroundColor: pressed ? 'lightgreen' : 'green'},
          ]}>
          <View>
            <Text style={styles.btnText}>close</Text>
          </View>
        </Pressable>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: 'lightgrey',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowColor: 'black',
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginVertical: 10,
    paddingTop: 5,
    paddingHorizontal: 10,
    borderWidth: 0.4,
    borderRadius: 25,
    backgroundColor: 'white',
  },
  input: {
    padding: 10,
    marginBottom: 5,
    fontSize: 18,
  },
  btnContainer: {
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: 'green',
    minWidth: 300,
    paddingVertical: 10,
    borderRadius: 6,
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  errorMark: {
    // marginVertical:5,
    paddingHorizontal: 10,
  },
  errorMarkText: {
    color: 'red',
    fontSize: 14,
  },
});
export default ReanimationFormValidation;
