import React from 'react';
import RootNavigator from './src/RootNavigator';
import {NavigationContainer} from '@react-navigation/native';
import ThemeProvider from './src/context/ThemeProvider';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
