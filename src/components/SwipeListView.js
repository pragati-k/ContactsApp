import {Box, Text, Pressable, HStack, Avatar, VStack} from 'native-base';
import {SwipeListView} from 'react-native-swipe-list-view';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrashCan, faPencil} from '@fortawesome/free-solid-svg-icons';
import db from './db';

const SwipeList = ({data, navigation}) => {
  const handleDeleteContact = id => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM  table_contact where id=?',
        [id],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            console.log('Deleted successfully');
          } else {
            console.log('Deleted failed');
          }
        },
      );
    });
  };

  const renderItem = ({item}) => (
    <Box>
      <Pressable
        _dark={{
          bg: 'coolGray.800',
        }}
        _light={{
          bg: 'white',
        }}>
        <Box pl="4" pr="5" py="2">
          <HStack alignItems="center" space={3}>
            <Avatar
              size="55px"
              source={{
                uri: item.imageUrl,
              }}
            />
            <VStack>
              <Text
                fontSize={20}
                color="coolGray.800"
                _dark={{
                  color: 'warmGray.50',
                }}
                bold>
                {item.name}
              </Text>
            </VStack>
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );

  const renderHiddenItem = (data, rowMap) => (
    <HStack flex="1" pl="2">
      <Pressable
        w="70"
        ml="auto"
        cursor="pointer"
        bg="yellow.200"
        justifyContent="center"
        onPress={() => {
          navigation.navigate('UpdateContact', {contactId: data.item.id});
        }}
        _pressed={{
          opacity: 0.5,
        }}>
        <VStack alignItems="center" space={2}>
          <FontAwesomeIcon icon={faPencil} size={30} />
        </VStack>
      </Pressable>
      <Pressable
        w="70"
        cursor="pointer"
        bg="red.400"
        justifyContent="center"
        onPress={() => handleDeleteContact(data.item.id)}
        _pressed={{
          opacity: 0.5,
        }}>
        <VStack alignItems="center" space={2}>
          <FontAwesomeIcon icon={faTrashCan} size={30} />
        </VStack>
      </Pressable>
    </HStack>
  );

  return (
    <SwipeListView
      data={data}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      rightOpenValue={-130}
      previewRowKey={'0'}
      previewOpenValue={-40}
      previewOpenDelay={3000}
      disableRightSwipe
    />
  );
};

export default SwipeList;
