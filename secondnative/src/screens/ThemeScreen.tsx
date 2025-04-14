import React from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import {useTheme} from '../context/ThemeProvider';

const ThemeScreen: React.FC = () => {
  const {theme, toggleTheme} = useTheme();
  const isDarkMode = theme === 'light';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode ? 'black' : 'rgba(126, 124, 124, 0.5)',
        },
      ]}>
      <Text
        style={[
          styles.header,
          {
            color: isDarkMode ? 'white' : 'black',
          },
        ]}>
        ThemeScreen demo
      </Text>
      <Switch
        value={isDarkMode}
        thumbColor={isDarkMode? "grey" :"blue"}
        trackColor={{false: 'grey', true: 'blue'}}
        onValueChange={toggleTheme}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default ThemeScreen;
