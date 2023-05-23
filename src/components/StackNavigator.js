import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IconButton} from '@react-native-material/core';
import AddContact from './addContact';
import ContactList from './contactList';
import UpdateContact from './updateContact';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart} from '@fortawesome/free-regular-svg-icons/faHeart';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ContactList"
        component={ContactList}
        options={{
          title: 'Contact List',
          headerStyle: {
            backgroundColor: '#b3d9ff',
          },
        }}
      />

      <Stack.Screen
        name="UpdateContact"
        component={UpdateContact}
        options={{
          title: 'Update Contact',
          headerStyle: {
            backgroundColor: '#b3d9ff',
          },
        }}
      />
      <Stack.Screen
        name="AddContact"
        component={AddContact}
        options={({navigation, route}) => ({
          title: 'Add New Contact',
          headerStyle: {
            backgroundColor: '#b3d9ff',
          },
          headerRight: () => (
            <IconButton icon={<FontAwesomeIcon icon={faHeart} size={30} />} />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
