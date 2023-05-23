import {useState, useEffect} from 'react';
import db from './db';
import SwipeList from './SwipeListView';

const FavContact = ({navigation}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM table_contact ORDER BY name ASC',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            if (results.rows.item(i).fav) temp.push(results.rows.item(i));
          }
          setData(temp);
        },
      );
    });
  }, [data]);

  return <SwipeList data={data} navigation={navigation} />;
};

export default FavContact;
