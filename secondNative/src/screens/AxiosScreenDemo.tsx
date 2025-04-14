import axios from 'axios';
import React, {useEffect, useState} from 'react';

import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import {useTheme} from '../context/ThemeProvider';

interface Post {
  id: string;
  name: string;
  language: string;
}

//Services file -> import
//axios instance
const api = axios.create({
  baseURL: 'https://microsoftedge.github.io/Demos/json-dummy-data',
});

/*
//request
api.interceptors.request.use(config => {
  return config;
});

//response
api.interceptors.response.use(response => {
  return response;
});
*/

const AxiosScreenDemo: React.FC = () => {
  const {theme, toggleTheme} = useTheme();
  const isDarkMode = theme === 'light';

  const [data, setData] = useState<Post[]>();
  const [loading, setLoading] = useState(false);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await api.get<Post[]>(
        '/64KB-min.json',
      ); /*<Post[]> "it will describe the type of output i am getting"*/
      // console.log(response);
      if (response) {
        setData(response.data);
        setLoading(false);
      } else {
        setData([]);
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const handleRenderItem = ({item}: {item: Post}) => (
    <View style={styles.renderContainer}>
      <Text
        style={[
          styles.renderText,
          {
            color: !isDarkMode ? 'black' : 'white',
          },
        ]}>
        {item.name}
      </Text>
      <Text
        style={[
          styles.renderText,
          {
            color: !isDarkMode ? 'black' : 'white',
          },
        ]}>
        {item.language}
      </Text>
    </View>
  );

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: !isDarkMode ? 'lightgrey' : 'black',
        },
      ]}>
      <Text
        style={[
          styles.header,
          {
            color: !isDarkMode ? 'black' : 'white',
          },
        ]}>
        Fetching Data by using AXIOS
      </Text>
      <Switch
        value={isDarkMode}
        onValueChange={toggleTheme}
        thumbColor={isDarkMode ? 'grey' : 'blue'}
        trackColor={{false: 'grey', true: 'blue'}}
      />
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={data}
          renderItem={handleRenderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  renderContainer: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  renderText: {
    fontSize: 15,
    paddingVertical: 5,
  },
  listText: {
    color: 'black',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default AxiosScreenDemo;
