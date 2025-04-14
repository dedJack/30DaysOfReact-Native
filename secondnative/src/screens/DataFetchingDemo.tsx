import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface Post {
  id: string;
  name: string;
  version: number;
}
const DataFetchingDemo: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchApiFromPost = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://microsoftedge.github.io/Demos/json-dummy-data/64KB-min.json',
      );
      const data1:Post[] = await response.json();
      if (data1) {
        setData(data1);
        setLoading(false);
      } else {
        setData([]);
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  console.log(data);
  useEffect(() => {
    setTimeout(() => {
      fetchApiFromPost();
    }, 2000);
  }, []);

  const handleRenderItem = ({item}: {item: Post}) => (
    <View style={styles.renderContainer}>
      {/* <Text style={styles.renderText}></Text> */}
      <Text style={styles.renderText}>{item.name}</Text>
      <Text style={styles.renderText}>{item.version}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Fetching Data by using Fetch API</Text>
      {loading ? (
        <ActivityIndicator style={styles.footer} size="large" color="blue" />
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
    marginBottom: 30,
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
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default DataFetchingDemo;
