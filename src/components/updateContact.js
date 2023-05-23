import {faHeart} from '@fortawesome/free-solid-svg-icons/faHeart';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {IconButton} from '@react-native-material/core';
import {
  Box,
  Center,
  VStack,
  FormControl,
  Input,
  Button,
  Text,
} from 'native-base';
import {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import db from './db';
import UploadImage from './UploadImage';

const UpdateContact = ({route, navigation}) => {
  const {contactId} = route.params;

  const [contact, setContact] = useState({
    id: 0,
    name: '',
    mobileNumber: 0,
    landlineNumber: 0,
    imageUrl: '',
    fav: false,
  });

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM table_contact where id =?',
        [contactId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            setContact(results.rows.item(0));
          } else {
            console.log('No user found');
          }
        },
      );
    });
  }, [contactId]);

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

  const handleOnchange = (text, input) => {
    setContact(prevState => ({...prevState, [input]: text}));
  };

  const handleEditContact = () => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE table_contact set name=?, mobileNumber=? , landlineNumber=?, imageUrl=?, fav=? where id=?',
        [
          contact.name.charAt(0).toUpperCase() + contact.name.slice(1),
          contact.mobileNumber,
          contact.landlineNumber,
          contact.imageUrl,
          contact.fav,
          contactId,
        ],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            console.log('Update successful');
          } else console.log('Updation Failed');
        },
      );
    });

    navigation.goBack(null);
  };

  const handleToggleFav = () => {
    const prevFav = contact.fav;
    setContact(prevState => ({...prevState, fav: !prevFav}));
  };

  return (
    <ScrollView>
      <Center w="100%">
        <Box safeArea p="2" w="90%" maxW="290" py="8">
          <VStack space={3} mt="5">
            <View style={{alignItems: 'center'}}>
              <UploadImage
                imagePull={handleOnchange}
                imageSource={contact.imageUrl}
              />
            </View>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input
                value={contact.name}
                onChangeText={text => handleOnchange(text, 'name')}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Mobile Number</FormControl.Label>
              <Input
                type="num-pad"
                value={contact.mobileNumber.toString()}
                onChangeText={text => handleOnchange(text, 'mobileNumber')}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Landline Number</FormControl.Label>
              <Input
                type="number"
                value={contact.landlineNumber.toString()}
                onChangeText={text => handleOnchange(text, 'landlineNumber')}
              />
            </FormControl>
            <Button
              mt="2"
              backgroundColor={'#b3d9ff'}
              style={{color: 'black'}}
              onPress={() => handleEditContact()}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>Edit</Text>
            </Button>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
};

export default UpdateContact;
