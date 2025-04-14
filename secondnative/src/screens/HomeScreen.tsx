import {StackNavigationProp} from '@react-navigation/stack';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Switch,
} from 'react-native';
import {StackScreenTypeProp} from '../types';
import {useTheme} from '../context/ThemeProvider';

//create a type of Prop for HomeScreen.
type HomeScreenNavigationprop = StackNavigationProp<
  StackScreenTypeProp,
  'Home'
>;

const subject = [
  {
    id: 1,
    name: 'FlatLst item',
    screen: 'FlatList',
  },
  {
    id: 2,
    name: 'SectionList item',
    screen: 'SectionList',
  },
  {
    id: 3,
    name: 'Touchable Demo',
    screen: 'TouchableScreen',
  },
  {
    id: 4,
    name: 'Model Demo',
    screen: 'ModelScreen',
  },
  {
    id: 5,
    name: 'Pull to refresh Demo',
    screen: 'PullToRefresh',
  },
  {
    id: 6,
    name: 'Axios Screen',
    screen: 'AxiosDemo',
  },
  {
    id: 7,
    name: 'Fetch Screen',
    screen: 'FetchDemo',
  },
  {
    id: 8,
    name: 'Theme Screen',
    screen: 'ThemeScreen',
  },
  {
    id: 9,
    name: 'Animations',
    screen: 'AnimationScreen',
  },
];
type Props = {
  navigation: HomeScreenNavigationprop;
};

const HomeScreen: React.FC<Props> = ({navigation}) => {
  //UseNavigation is used to navigate to another screen.
  // const navigation = useNavigation<HomeScreenNavigationprop>();

  const {theme, toggleTheme} = useTheme();
  const isDarkMode = theme === 'light';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode ? 'black' : 'white',
        },
      ]}>
      <View style={[
        styles.headerRow,
        {
          backgroundColor: isDarkMode ? 'black' : 'white',
        },
      ]}>
        <Text
          style={[
            styles.header,
            {
              color: isDarkMode ? 'white' : 'black',
            },
          ]}>
          {' '}
          Home Screen{' '}
        </Text>
        <Switch
          style={styles.switchDesign}
          value={isDarkMode}
          onValueChange={toggleTheme}
          thumbColor={isDarkMode ? 'grey' : 'blue'}
          trackColor={{false: 'grey', true: 'blue'}}
        />
      </View>
      <FlatList
        data={subject}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.btnConatiner,
              {
                backgroundColor: isDarkMode ? 'rgb(16, 5, 69)' : 'lightgrey',
              },
            ]}
            onPress={
              () =>
                navigation.navigate(item.screen as keyof StackScreenTypeProp) //this is use to pass the screen name from object
            }>
            <Text
              style={[
                styles.btnText,
                {
                  color: isDarkMode ? 'white' : 'black',
                },
              ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  btnConatiner: {
    margin: 10,
    paddingHorizontal: 15,
    backgroundColor: '#808873',
    paddingVertical: 15,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  switchDesign: {
    paddingBottom: 10,
    alignItems: 'center',
    position: 'relative',
  },
});

export default HomeScreen;
