import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const PullToRefreshDemo: React.FC = () => {
  const INITIAL_data = Array.from({length: 20}, (_, index) => ({
    id: (index + 1).toString(),
    title: `item ${index + 1}`,
  }));

  const handleRenderItem = ({item}: {item: {id: String; title: String}}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.text}>{item.title}</Text>
    </View>
  );

  const loadMoreData = () => {
    {
      if (!loading) {
        setLoading(true);
        setTimeout(() => {
          const newItems = Array.from({length: 10}, (_, index) => ({
            id: (data.length + index + 1).toString(),
            title: `item ${data.length + index + 1}`,
          }));
          setData([...data, ...newItems]);
          setLoading(false);
        }, 1000);
      }
    }
  };

  const handleOnRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setData(INITIAL_data);
      setRefreshing(false);
    }, 1500);
  };

  const [data, setData] = useState(INITIAL_data);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>PullToRefreshDemo</Text>
      <FlatList
        keyExtractor={item => item.id}
        data={data}
        renderItem={handleRenderItem}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleOnRefresh} />
        }
        ListFooterComponent={
          loading ? <ActivityIndicator style={styles.footer} size="large" color="blue" /> : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemContainer: {
    marginVertical: 10,
    borderBottomWidth: 0.3,
    borderColor: 'black',
  },
  text: {
    fontSize: 18,
    paddingVertical: 5,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PullToRefreshDemo;
