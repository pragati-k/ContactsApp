import {Input} from 'native-base';
import {useEffect, useState} from 'react';
import {View} from 'react-native';
import db from './db';
import SwipeList from './SwipeListView';

const SearchFilter = ({pullSearch, navigation}) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM table_contact WHERE name LIKE '${input}%' ORDER BY name ASC`,
        [],
        (tx, results) => {
          const len = JSON.stringify(results.rows.length);
          const data = [];
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              data.push(results.rows.item(i));
            }
            setResult(data);
          } else {
            console.log('No such data');
            setResult([]);
          }
        },
      );
    });
    if (input == '') {
      pullSearch(false);
    } else pullSearch(true);
  }, [input]);

  return (
    <View>
      <Input
        placeholder="Search Here..."
        lightTheme
        onChangeText={text => setInput(text)}
        value={input}
        margin={3}
        borderRadius={10}
        borderWidth={2}
        borderColor={'#b3d9ff'}
      />
      {input == '' ? null : <SwipeList data={result} navigation={navigation} />}
    </View>
  );
};

export default SearchFilter;
