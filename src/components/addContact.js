import {
  Box,
  Center,
  VStack,
  FormControl,
  Input,
  Button,
  ScrollView,
} from 'native-base';
import {useEffect, useState} from 'react';
import uuid from 'react-native-uuid';
import UploadImage from './UploadImage';
import {IconButton} from '@react-native-material/core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons/faHeart';
import db from './db';
import {Text, View} from 'react-native';

const AddContact = ({navigation}) => {
  const [contact, setContact] = useState({
    id: uuid.v4(),
    name: '',
    mobileNumber: 0,
    landlineNumber: 0,
    imageUrl: '',
    fav: false,
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          onPress={() => handleToggleFav()}
          icon={
            <FontAwesomeIcon
              icon={faHeart}
              color={contact.fav ? 'red' : 'grey'}
              size={30}
            />
          }
        />
      ),
    });
  }, [contact]);

  const handleAddContact = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO table_contact (id, name, mobileNumber, landlineNumber, imageUrl, fav) VALUES (?,?,?,?,?,?)',
        [
          contact.id,
          contact.name.charAt(0).toUpperCase() + contact.name.slice(1),
          contact.mobileNumber,
          contact.landlineNumber,
          contact.imageUrl,
          contact.fav,
        ],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            console.log('Added');
          } else console.log('Failed');
        },
      );
    });
    navigation.goBack(null);
  };

  const handleOnchange = (text, input) => {
    setContact(prevState => ({...prevState, [input]: text}));
  };

  const handleToggleFav = () => {
    const prevFav = contact.fav;
    setContact(prevState => ({...prevState, fav: !prevFav}));
  };
  return (
    <ScrollView>
      <Center w="100%">
        <Box safeArea m="2" p="2" w="90%" maxW="290" py="8">
          <VStack space={3}>
            <View style={{alignItems: 'center'}}>
              <UploadImage imagePull={handleOnchange} />
            </View>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input onChangeText={text => handleOnchange(text, 'name')} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Mobile Number</FormControl.Label>
              <Input
                keyboardType="numeric"
                onChangeText={text => handleOnchange(text, 'mobileNumber')}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Landline Number</FormControl.Label>
              <Input
                keyboardType="numeric"
                onChangeText={text => handleOnchange(text, 'landlineNumber')}
              />
            </FormControl>
            <Button
              mt="2"
              backgroundColor={'#b3d9ff'}
              onPress={() => handleAddContact()}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>Add</Text>
            </Button>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
};

export default AddContact;
