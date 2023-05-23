import {faAdd} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Box, Fab} from 'native-base';
import {useState, useEffect} from 'react';

import db from './db';
import SearchFilter from './SearchFilter';
import SwipeList from './SwipeListView';

const ContactList = ({navigation}) => {
  const [data, setData] = useState([]);
  const [result, setResult] = useState(false);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM table_contact ORDER BY name ASC',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setData(temp);
        },
      );
    });
  }, [data]);

  return (
    <Box bg="white" safeArea flex="1">
      <SearchFilter
        pullSearch={searchResult => setResult(searchResult)}
        navigation={navigation}
      />

      <Fab
        direction="up"
        style={{backgroundColor: '#b3d9ff'}}
        icon={<FontAwesomeIcon icon={faAdd} />}
        onPress={() => navigation.navigate('AddContact')}
        renderInPortal={false}
      />
      {result ? null : <SwipeList data={data} navigation={navigation} />}
    </Box>
  );
};

export default ContactList;
