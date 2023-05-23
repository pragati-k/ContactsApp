// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */
import 'react-native-gesture-handler';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import FavContact from './src/components/favContact';
import {NativeBaseProvider} from 'native-base';
import StackNavigator from './src/components/StackNavigator';
import db from './src/components/db';
import {StatusBar} from 'react-native';

const Drawer = createDrawerNavigator();

const App = () => {
  db.transaction(txn => {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='table_contact'",
      [],
      (tx, res) => {
        console.log('item:', res.rows.length);
        if (res.rows.length < 1) {
          txn.executeSql('DROP TABLE IF EXISTS table_contact', []);
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS table_contact(id VARCHAR(225) PRIMARY KEY, name VARCHAR(20), mobileNumber INT(10), landlineNumber INT(10), imageUrl VARCHAR(225), fav BIT)',
            [],
          );
        } else {
          console.log('ALREADY EXITS');
        }
      },
    );
  });

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <StatusBar backgroundColor={'#b3d9ff'} />
        <Drawer.Navigator>
          <Drawer.Screen
            name="Contact List"
            component={StackNavigator}
            options={{headerShown: false}}
          />
          <Drawer.Screen
            name="FavContact"
            component={FavContact}
            options={{
              title: 'Favorite Contact List',
              headerStyle: {
                backgroundColor: '#b3d9ff',
              },
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
