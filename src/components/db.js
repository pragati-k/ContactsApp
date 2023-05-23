import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'ContactDatabase.db'});

export default db;
